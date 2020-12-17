import * as glob from 'glob'
import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'
import * as  Parameter from 'parameter'

const router = new KoaRouter()

type RouteOptions = {
  prefix?:string;
  middlewares?:Array<Koa.Middleware>
}

const createMethod =(router:KoaRouter)=>(method:'get'|'post'|'delete'|'put')=> (path:string,options:RouteOptions={})=>{
  return (target,property)=>{

    process.nextTick(()=>{
      const middlewares = []

      if(target.middlewares){
        middlewares.push(...target.middlewares)
      }
  
      if(options.middlewares){
        middlewares.push(...options.middlewares)
      }
      middlewares.push(target[property])
      //注册
      router[method](path,...middlewares) 
    })
  }
}

const method = createMethod(router)
export const get = method('get')
export const post = method('post')

export function middlewares(middlewares:Koa.Middleware[]) {
  return function (target) {
    target.prototype.middlewares = middlewares
  }
}

export const load = (folder:string):KoaRouter=>{
  const extname = '.{js,ts}'
  glob.sync(require('path').join(folder,`./**/*${extname}`))
  .forEach(item=>require(item))
  return router 
}

const validateRule = paramPart => rule => {
  return function (target, name, descriptor) {
      const oldValue = descriptor.value
      descriptor.value = function () {
          const ctx = arguments[0]
          const p = new Parameter()
          const data = ctx[paramPart]
          const errors = p.validate(rule, data)
          console.log('error',errors)
          if (errors) throw new Error(JSON.stringify(errors))
          return oldValue.apply(null, arguments);
      }
      return descriptor;
  }
}

export const querystring = validateRule('query')

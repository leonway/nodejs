import * as glob from 'glob'
import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'

const router = new KoaRouter()

const createMethod =(router:KoaRouter)=>(method:'get'|'post'|'delete'|'put')=> (path:string)=>{
  return (target,property)=>{
    //注册
    router[method](path,target[property])
  }
}

const method = createMethod(router)
export const get = method('get')
export const post = method('post')

export const load = (folder:string):KoaRouter=>{
  const extname = '.{js,ts}'
  glob.sync(require('path').join(folder,`./**/*${extname}`))
  .forEach(item=>require(item))
  return router 
}

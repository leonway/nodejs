import * as Koa from 'koa';
import { get, post, middlewares, querystring } from '../utils/route-decors'
import model from '../model/user'
// const api = {
//   findByName(name) {
//       return new Promise((resolve, reject) => {
//           setTimeout(() => {
//               if (name === 'xia') {
//                   reject('用户已存在')
//               } else {
//                   resolve(null)
//               }
//           }, 500)
//       })
//   }
// }
const users = [{
  name:'tom'
}]


@middlewares([
  async function guard(ctx,next) {
    if(ctx.header.token){
      await next()
    }else{
      throw '请登录'
    }
  }
])
export default class User {
  
  @get('/users')
  @querystring({
      age: { type: 'int', required: false, max: 200, convertType: 'int' },
  })
  public async list(ctx){
    // ctx.body = {
    //   ok:1,
    //   users
    // }
    const users = await model.findAll()
    ctx.body = { ok: 1, data: users };
  }
  
  @post('/users',{
    // middlewares:[
    //   async function(ctx,next){
    //     //用户必须
    //     const name = ctx.request.body.name
    //     if(!name){
    //       throw '请输入用户名'
    //     }
    //     await next()
    //   }
    // ]
    middlewares: [
      async function validation(ctx: Koa.Context, next: () => Promise<any>) {
          // 用户名必填
          const name = ctx.request.body.name
          if (!name) {
              throw "请输入用户名";
          }
          // 用户名不能重复
          try {
            const ret = await model.findAll({where:{name}})
            if(ret&&!ret.length){
               // 校验通过
              await next(); 
            }else{
              throw new Error('用户名不能重复')
            }
              
          } catch (error) {
              throw error;
          }
      }
  ]
  })
  public async add(ctx){
    const {name,age} = ctx.request.body
      await model.create({name,age})
      ctx.body = {
        ok:1
      }
    // users.push(ctx.request.body)
    
  }
}

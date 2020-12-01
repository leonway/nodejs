const  Koa = require('koa')
const app = new Koa()

app.use(async(ctx,next)=>{
  const start = new Date().getTime()
  await next()
  const end = new Date().getTime()
  console.log(`请求${ctx.url} 耗时${parseInt(end-start)}ms`,);
})

app.use(require('koa-static')(__dirname+'/'))
// const router = new require('koa-router')()
// router.get('/string',async(ctx,next)=>{
//   ctx.body = 'koa2 string'
// })
// router.get('/json',async(ctx,next)=>{
//   ctx.body = {
//     title:'koa2 json'
//   }
// })
// app.use(router.routes())

app.listen(3000)

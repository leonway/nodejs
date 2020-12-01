// const http = require('http')
// const server = http.createServer((req,res)=>{
//   res.writeHead(200,{
//     "Content-Type":"text/plain"
//   })
//   res.end('reamey 666')
// })

// server.listen(3000,()=>{
//   console.log("server start 3000");
// })
const path = require('path')
const Kkb = require('./kkb')
// const Kkb = require('koa')
const app = new Kkb()


// app.use((req,res)=>{
//   res.writeHead(200,{
//     "Content-Type":"text/plain"
//   })
//   res.end('reamey 666')
// })

//以下是测试中间件
// const delay = ()=> new Promise(resolve=>setTimeout(() => {
//   resolve()
// }, 2000))
// app.use(async(ctx,next)=>{
//   ctx.body = "1"
//   await next()
//   ctx.body += "5"
// })
// app.use(async(ctx,next)=>{
//   ctx.body += "2"
//   await delay()
//   await next()
//   ctx.body +="4"
// })
// app.use(async(ctx,next)=>{
//   ctx.body +="3"
// })
// app.use(async(ctx,next)=>{
//   const start = Date.now()
//   await next()
//   const end = Date.now()
//   console.log(`请求${ctx.url} 耗时${end-start}ms`,);
// })
// app.use((ctx,next)=>{
//   // console.log(ctx);
//   ctx.body = {
//         title:'koa2 json'
//       }
// })

//以下是测试路由
const KoaRouter = require('./router')
const router = new KoaRouter()
router.get('/string',async(ctx,next)=>{
  ctx.body = 'koa2 string'
})
router.get('/json',async(ctx,next)=>{
  ctx.body = {
    title:'koa2 json'
  }
})
app.use(router.routes())

//以下是测试静态资源文件
// console.log(require('./static')(__dirname+'/sample'));
// app.use(require('./static')(path.resolve('../sample')))

app.listen(3000,()=>{
  console.log("server start 3000");
})

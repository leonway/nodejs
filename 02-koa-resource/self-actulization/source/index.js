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
const Kkb = require('./kkb')
const app = new Kkb()


// app.use((req,res)=>{
//   res.writeHead(200,{
//     "Content-Type":"text/plain"
//   })
//   res.end('reamey 666')
// })
app.use((ctx,next)=>{
  ctx.body="fdsafsa"
})

app.listen(3000,()=>{
  console.log("server start 3000");
})

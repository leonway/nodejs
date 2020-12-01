const http = require('http')
const server = http.createServer((req,res)=>{
  res.end("秀秀秀")
})
server.listen(3080)

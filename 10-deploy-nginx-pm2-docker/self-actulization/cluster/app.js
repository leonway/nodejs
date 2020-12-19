const http = require('http')

const server = http.createServer((req,res)=>{
  Math.random()>.5?abc():'2'
  res.end('hello10')
})

if(!module.parent){
  server.listen(3000,()=>{
    console.log('server listen at 3000');
  })
}else{ 
  module.exports = server
}

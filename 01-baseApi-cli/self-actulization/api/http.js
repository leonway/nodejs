const http = require('http');
const fs = require('fs')

const server = http.createServer((req,res)=>{
  // console.log('request',getPrototypeChain(req));
  // console.log('response',getPrototypeChain(res));
  // res.end('hello node')//这个end 来自原型链上的Stream
  const { url, method } = req
  if(url==='/'&&method==='GET'){
    //主页
    fs.readFile('indexd.html',(err,data)=>{
      if(err){
        res.writeHead(500,{
          'Content-Type':"text/plain;charset=utf-8;"
        })
        res.end('500 服务器挂了')
      }
      res.statusCode = 200
      res.setHeader('Content-Type','text/html')
      res.end(data)
    })
  }else{
    res.statusCode = 404
    res.setHeader('Content-Type','text/plain;charset=utf-8;')
    res.end('404')
  }
  
})

server.listen(3000)

function getPrototypeChain(obj) {
  const protoChain = []
  while(obj = Object.getPrototypeOf(obj)){//获取获取一个对象的原型 再获取改原型上的原型 直到获取不到为止
    protoChain.push(obj)
  }
  return protoChain
}
;

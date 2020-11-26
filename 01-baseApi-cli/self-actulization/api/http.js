const http = require('http');
const fs = require('fs')
const path = require('path')

const server = http.createServer((req,res)=>{
  // console.log('request',getPrototypeChain(req));
  // console.log('response',getPrototypeChain(res));
  // res.end('hello node')//这个end 来自原型链上的Stream
  const { url, method, headers } = req
  if(url==='/'&&method==='GET'){
    //主页
    fs.readFile('index.html',(err,data)=>{
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
  }else if(method==="GET"&&headers.accept.indexOf('image/*')!==-1){
    const filename = path.basename(url)
    const filePath = path.join(__dirname,filename)
    if(fs.existsSync(filePath)){
      fs.createReadStream(filePath).pipe(res)
    }else{
      res.statusCode = 404
      res.setHeader('Content-Type','text/plain;charset=utf-8;')
      res.end('404')
    }
  }else if(url==='/users'&&method==='GET'){
    res.writeHead(200,{
      'Content-Type':"application/json"
    })
    res.end(JSON.stringify({
      name:"reamey"
    }))
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

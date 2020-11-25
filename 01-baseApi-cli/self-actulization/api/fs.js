// const fs = require('fs')
//同步
// const data = fs.readFileSync("./conf.js")
// console.log(data.toString());
//异步调用
//错误优先
// fs.readFile('./conf.js',(err,data)=>{
//   if(err) throw err
//   console.log(data.toString());
// })


//promise风格接口
(async()=>{
  const fs = require('fs')
  // const { promisify } = require('util')
  const promisify = require('./promisify')//手写一个promisify
  const readFile = promisify(fs.readFile)
  const data = await readFile("conf.js")
  console.log(data.toString());
})()

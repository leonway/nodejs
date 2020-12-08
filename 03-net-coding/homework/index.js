const path = require('path')
const fs = require('fs')

//原始答案
// const parser = async (originPath)=>{
//   return new Promise((res,rej)=>{
//     let data = Buffer.from('')
//     const filePath = path.resolve(originPath)
//     try {
//       if(fs.existsSync(filePath)){
//         const stream = fs.createReadStream(filePath)
//         stream.on('data',chunk=>{
//           // console.log('data',data)
//           // console.log('chun');
          
//           data += chunk
//         })
//         stream.on('close',()=>{
//           // console.log('---data-------');
//           // console.log(data);
//           // console.log('----data.toString()-----');
//           // console.log(data.toString());
//           res(JSON.parse(data))          
//         })
//       }
//     } catch (e) {
//       console.log('parser error');
//       console.log(e);
//       rej(e)
//     }
//   })
// }

const parser = async (originPath)=>{
  let reqData = []
  let size = 0
  return new Promise((res,rej)=>{
    const filePath = path.resolve(originPath)
    try {
      if(fs.existsSync(filePath)){
        const stream = fs.createReadStream(filePath)
        stream.on('data',chunk=>{
          // console.log('chunk',chunk);
          
          reqData.push(chunk)
          size+=chunk.length
        })
        stream.on('close',()=>{
         const data = Buffer.concat(reqData,size)
          res(JSON.parse(data.toString()))          
        })
      }
    } catch (e) {
      console.log('parser error');
      console.log(e);
      rej(e)
    }
  })
}
module.exports = {
  parser
}

const path = require('path')
const fs = require('fs')

const parser = async (originPath)=>{
  return new Promise((res,rej)=>{
    let data = Buffer.from('')
    const filePath = path.resolve(originPath)
    try {
      if(fs.existsSync(filePath)){
        const stream = fs.createReadStream(filePath)
        stream.on('data',chunk=>{
          data += chunk
        })
        stream.on('close',()=>{
          // console.log('---data-------');
          // console.log(data);
          // console.log('----data.toString()-----');
          // console.log(data.toString());
          res(JSON.parse(data))          
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

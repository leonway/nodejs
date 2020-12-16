
const fs = require('fs')
const path = require('path')
function load(dir,cb) {
    //获取绝对路径
    const url = path.resolve(__dirname,dir)
    // console.log(url);
    const files = fs.readdirSync(url)
   
    files.forEach(filename=>{
      filename = filename.replace('.js','')
      const file = require(url+'/'+filename)
      // console.log(file);
      cb(filename,file)
    })
}

class Loader {
  constructor(config){
    this.config = config
  }
  initFunction(path){
    const func = {}
    load(path,(funcName,fn)=>{
        func[funcName] = fn(this.config)
    })
    return func
  }
}

const createLoader = config => new Loader(config)

module.exports = {
  createLoader
}

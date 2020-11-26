const fs = require('fs')
const handlebars = require('handlebars')
const chalk = require('chalk')

module.exports = async ()=>{
  //获取列表
  const list = fs.readdirSync('./src/views')
                  .filter(v=>v!=='Home.vue')
                  .map(v=>({
                    name: v.replace('.vue','').toLowerCase(),
                    file: v
                  }));

  compile({list},'./src/router.js','./template/router.js.hbs')
  compile({list},'./src/App.vue','./template/App.vue.hbs')
  /**
   * 编译模板
   * @param {*} meta 输出的文件列表 list
   * @param {*} filePath 写入到什么位置
   * @param {*} templatePath 使用的模板位置
   */ 
  function compile(meta,filePath,templatePath) {
    if(fs.existsSync(templatePath)){
      const content = fs.readFileSync(templatePath).toString()
      const result = handlebars.compile(content)(meta)
      fs.writeFileSync(filePath,result)
      console.log(`\u263A ${filePath} 创建成功`);
    }
  }
}

const fs = require("fs")
const path = require('path')

module.exports = (dirPath=path.resolve('./'))=>{
  // console.log(dirPath);
  let list = []
  if(fs.existsSync(dirPath)){
    list = fs.readdirSync(dirPath)
      .map(v=>{
      // console.log(path);
      const basename = v.replace('.vue','')
      return `
{
    path:'/${basename}',
    name:${basename},
    component:()=>import('./views/${v}')
}
`})
}
 
  return `
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
${list}
    ]
})`

}

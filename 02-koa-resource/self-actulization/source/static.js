const path = require('path')
const fs = require('fs')
const send = require('koa-send')

module.exports = (rootPath=path.resolve('./'))=>{
  console.log(rootPath);
  return async (ctx,next)=>{
    await next()
    // const { url, method } = ctx

    // const filePath = path.join(rootPath,url)
    // console.log('filePath');
    // console.log(filePath);
    // if(method==='get'&&fs.existsSync(filePath)){
    //   ctx.body = fs.createReadStream(filePath)
    // }
   
    if (ctx.method !== 'HEAD' && ctx.method !== 'GET') return
    // response is already handled
    if (ctx.body != null || ctx.status !== 404) return // eslint-disable-line
    console.log('static ctx.path');
    console.log(ctx.path);
    try {
      await send(ctx, ctx.path)
    } catch (err) {
      console.log('static err');
      console.log(err);
      if (err.status !== 404) {
        throw err
      }
    }
    
  }
}

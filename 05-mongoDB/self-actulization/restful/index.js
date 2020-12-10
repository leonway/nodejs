const Koa = require('koa')
const app = new Koa()

//加载模型
const config = require('./cong')
const { loadModel } = require('./framework/loader')

loadModel(config)(app)
//自动api /user/xxx crud
//注册路由 /user/cart
try {
  const bodyParser = require('koa-bodyparser')
app.use(bodyParser())
app.use(require("koa-static")(__dirname+'/'))
const restful = require('./framework/router')
app.use(restful)

} catch (error) {
  console.log(error);  
}
const port = 3000
app.listen(port,()=>{
  console.log(`app started at port ${port} ...`);
})

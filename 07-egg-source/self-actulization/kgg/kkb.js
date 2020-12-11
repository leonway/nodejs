const Koa = require('koa')
const { initRouter, initController, initService, loadConfig,initSchedule } = require('./kkb-loader')



class Kkb {
  constructor(conf){
    this.$app = new Koa()

    loadConfig(this)

    this.$service = initService(this)
    this.$ctrl = initController(this)

    this.$router = initRouter(this)
    this.$app.use(this.$router.routes())
    initSchedule()
  }
  start(port){
    this.$app.listen(port,()=>{
      console.log(`KKb 服务启动 端口 ${port}`);
    })
  }
}

module.exports = Kkb

const fs = require('fs')
const path = require('path')
const Router = require('koa-router')

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

function initRouter(app) {
  const router = new Router()
  load('routes',(filename,routes)=>{
    const prefix = filename ==='index' ?'':`/${filename}`

    //判断
    routes = typeof routes ==='function'?routes(app):routes
    // console.log(prefix);
    Object.entries(routes).forEach(([key,cb])=>{
      const [ method, path ] = key.split(' ') 
      console.log(`正在映射路由：${method.toLowerCase()} ${prefix}${path}`);
      router[method](prefix+path,async ctx=>{
        app.ctx = ctx
        await cb(app)
      })
    })
  })
  return router
}

function initController(app) {
  const controllers = {}
  load('controller',(filename,controller)=>{
    controllers[filename] = controller(app)
  })
  return controllers
}

function initService(app) {
  const services = {}
  load('service',(filename,service)=>{
    services[filename] = service(app)
  })
  return services
}

const Sequelize = require('sequelize')
function loadConfig(app) {
  load('config',(filename,conf)=>{
    if(conf.db){
      app.$db = new Sequelize(conf.db)
      //加载模型
      app.$model = {}
      load('model',(filename,{schema,options})=>{
        app.$model[filename] = app.$db.define(filename,schema,options)
      })
      app.$db.sync()
    }

    if(conf.middleware){
      conf.middleware.forEach(mid=>{
        const midPath = path.resolve(__dirname,'middleware',mid)
        app.$app.use(require(midPath))
      })
    }
  })
}

const schedule = require('node-schedule')
function initSchedule(app) {
  load('schedule',(filename,scheduleConfig)=>{
    schedule.scheduleJob(scheduleConfig.interval,scheduleConfig.handler)
  })
}

module.exports = {
  initRouter,
  initController,
  initService,
  loadConfig,
  initSchedule
}

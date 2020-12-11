module.exports = {
  // /user/
  'get /': async app => {
    // ctx.body = '用户首页'
    // const name = await app.$service.user.getName()
    // app.ctx.body = '用户：'+name
    app.ctx.body = await app.$model.user.findAll()
  },
  // /user/info
  'get /info': async app =>{
    // app.ctx.body = '用户详情页'
    app.ctx.body = '用户年龄：'+app.$service.user.getAge()
  }
}

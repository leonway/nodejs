module.exports = app =>({
  index:async ctx=>{
    // ctx.body = '首页Ctrl'
    const name = await app.$service.user.getName()
    app.ctx.body = name
  },
  detail:ctx=>{
    // ctx.body = "详细页面Ctrl"
    app.ctx.body = 'Ctrl detail'
  }
})

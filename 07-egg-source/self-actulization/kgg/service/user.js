const delay = (data,time)=>new Promise(res=>setTimeout(() => {
  res(data)
}, time))

//可复用的服务，一个同步一个异步

module.exports = app =>({
  getName(){
    // return delay('jerry',2000)
    return app.$model.user.findAll()
  },
  getAge(){
    return 20
  }
})

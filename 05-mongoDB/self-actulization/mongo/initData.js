const mongodb = require('./model/db')

//连接数据库是异步的 所以我们将插入数据的操作写进connect 事件的回调里面
mongodb.once('connect',async()=>{
  //插入数据
  const col = mongodb.col('fruits')

  await col.deleteMany()

  const data = new Array(100).fill().map((v,i)=>{
    return {
      name:'fruit'+i,
      price:i,
      category:Math.random()>0.5?'水果':'蔬菜'
    }
  })
  await col.insertMany(data)
  console.log('插入测试数据成功');
})


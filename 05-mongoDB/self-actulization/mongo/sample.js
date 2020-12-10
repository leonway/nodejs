(async()=>{
  const { MongoClient } = require('mongodb')
  
  //创建客户端
  const client = new MongoClient(
    `mongodb://localhost:27017`,
    {
      useNewUrlParser:true
    }
  )

  let ret 
  ret = await client.connect()

  const db = client.db('test')
  const fruits = db.collection('fruits')
  //插入数据 添加文档
  ret = await fruits.insertOne({
    name:'苹果',
    price:20.1
  })
  console.log('insert:',ret);

  //更新文档
  ret = await fruits.updateMany({
    name:'苹果'
  },
    {
      $set:{
        name:'苹果2',
        price:44.36
      }
    }
  )
  console.log('update',JSON.stringify(ret.result));
})()

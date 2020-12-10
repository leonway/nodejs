const conf = require('./conf')

// 数据库的连接 是一个异步的过程
// 异步的过程串行起来
// 连接 异步 => 插数据 异步

const { EventEmitter } = require('events')

//客户端
const { MongoClient } = require('mongodb')

class Mongodb {
  constructor(conf){
    //创建实例
    this.emmitter = new EventEmitter()
    this.conf = conf

    //创建连接
    this.client = new MongoClient(conf.url,{
      useNewUrlParser:true
    })

    this.client.connect(err=>{
      if(err)throw err
      console.log('连接成功');
      this.emmitter.emit('connect')
    })
  }

  //指定集合
  col(colName,dbName = conf.dbName){
    return this.client.db(dbName).collection(colName)
  }

  once(event,cb){
    this.emmitter.once(event,cb)
  }
}

module.exports = new Mongodb(conf)

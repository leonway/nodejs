const cluster = require('cluster')

const os = require('os')
const numCPUs = os.cpus().length

const process = require('process')

const workers = {}

if(cluster.isMaster){
  // 主进程
  for (let index = 0; index < numCPUs; index++) {
    const worker = cluster.fork()
    workers[worker.process.pid] = worker
    console.log('工作进程 启动',worker.process.pid);
  }
  
  cluster.on('exit',(worker,code,signal)=>{
    console.log('工作进程 关闭',worker.process.pid);
    delete workers[worker.process.pid]
    // console.log(worker);
    worker = cluster.fork()
    workers[worker.process.pid] = worker
  })
}else{
  // 子进程
  const app = require('./app')
  app.listen(3000)
}

process.on('SIGTERM',()=>{
  for(var pid in workers){
    process.kill(pid)
  }
  process.exit(0)
})

require('./test')

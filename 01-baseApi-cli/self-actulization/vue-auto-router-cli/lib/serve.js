const spawn = async(...args)=>{
  const {spawn} = require('child_process')
  const options = args[args.length - 1]
    if(process.platform === 'win32'){
        // 设置 shell 选项为 true 以隐式地调用 cmd 
        options.shell = true
    }else {
        // nothing
    }
  return new Promise(res=>{
    const proc = spawn(...args)
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    proc.on('close',()=>{
      res()
    })
  })
} 

module.exports = async () => {
    const watch = require('watch')
    let process
    let isRefresh = false
    watch.watchTree('./src', async (f) => {
        if (!isRefresh) {
            isRefresh = true
            process && process.kill()
            await require('./refresh')()
            setTimeout(() => { isRefresh = false }, 5000)
            process = await spawn('npm', ['run', 'serve'],{})
        }
    })
}

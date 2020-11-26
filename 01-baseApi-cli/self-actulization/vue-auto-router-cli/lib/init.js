const { promisify } = require('util')
const figlet = promisify(require('figlet'))//打印界面

const clear = require('clear')//清屏
const chalk = require('chalk')//彩色字
const log = content =>console.log(chalk.green(content));
const { clone } = require('./download')
const open = require('open')

//输出流可以引入主进程输出流
//promise api风格
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

module.exports = async name =>{
  //打印欢迎界面
  clear()
  const data = await figlet('Reamey Welcome')
  log(data);
  //下载
  log(`\u26A1创建项目${name}`)
  await clone('github:su37josephxia/vue-template',name)

  //安装依赖
  //npm i
  log(`安装依赖\u2615......`)
  await spawn('npm',['install'],{cwd:`./${name}`})
  log(chalk.green(`
  安装完成：
  To get Start:
  =========================
      cd ${name}
      npm run serve
  =========================
  `))

  //打开浏览器
  open('http://localhost:8080')
  await spawn('npm',['run','serve'],{cwd:`./${name}`}) 
  
}

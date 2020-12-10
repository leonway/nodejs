const http = require('http')
const session = {
}

http.createServer((req,res)=>{

  const cookie = req.headers.cookie
  console.log('cookie',cookie);
  const sessionKey = 'sid'
  if(cookie&&cookie.includes(sessionKey)){
    //非首次
    res.end('Come Back')
    // console.log('cookie',req.headers.cookie);
    console.log('url',req.url);
    // 简略写法未必具有通用性
    const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`)
    const sid = pattern.exec(cookie)[1]
    console.log('session:',sid,session[sid]);
    //
  }else{
    const sid = (Math.random()*99999).toFixed()
    res.setHeader('Set-Cookie',`${sessionKey}=${sid}`)
    session[sid] = {
      name:'reamey'
    }
    res.end('hello world')
  }
  
}).listen(5246)


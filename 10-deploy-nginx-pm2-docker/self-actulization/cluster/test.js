const request = require('request')
setInterval(() => {
  request('http://localhost:3000',(err,body)=>{
    console.log('body');
  })
}, 1000);

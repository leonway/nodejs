import * as Koa from 'koa'
import * as body from 'koa-body';
import * as serve from 'koa-static';
import * as timing from 'koa-xtime';

import { Sequelize } from 'sequelize-typescript';

const database = new Sequelize({
    port:3306,
    database:'kkb',
    username:'root',
    password:'zxc123456',
    dialect:'mysql',
    modelPaths: [`${__dirname}/model`],

});

database.sync({force: true})

const app = new Koa();
app.use(timing());
app.use(serve(`${__dirname}/public`));
app.use(
  body({
 multipart: true,
 // 使⽤⾮严格模式，解析 delete 请求的请求体
 strict: false,
 }),
);
// app.use((ctx: Koa.Context) => {
//  ctx.body = 'hello'
// })
import {load} from './utils/route-decors'
import {resolve} from 'path'
const router = load(resolve(__dirname,'./routes'))
app.use(async function(ctx, next) {
  try {
    await next();
  } catch (err) {
    console.log('xxxxxxxxxxxxxxxxx----------------err-------------------xxxxxxxxxxxxxxxxxxxxxx');
    console.log(err);
    // 所有的异常都在 app 上触发⼀个 error 事件，框架会记录⼀条错误⽇志
    // app.emit('error', err, this);
    const status = err.status || 500;
    // ⽣产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
    const error =  err.message;
    // 从 error 对象上读出各个属性，设置到响应中
    ctx.body = {
      code: status, // 服务端⾃身的处理逻辑错误(包含框架错误500 及 ⾃定义业务逻辑错误533开始) 客户端请求参数导致的错误(4 xx开始)， 设置不同的状态码
      error,
    };
    if (status === 422) { // 用户接口自定义错误
      ctx.body.detail = err.errors;
    }
    ctx.status = 200;
  }
})

app.use(router.routes())

app.listen(3000, () => {
 console.log('服务器启动成功');
});

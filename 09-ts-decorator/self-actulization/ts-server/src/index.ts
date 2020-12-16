import * as Koa from 'koa'
import * as body from 'koa-body';
import * as serve from 'koa-static';
import * as timing from 'koa-xtime';
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

app.use(router.routes())

app.listen(3000, () => {
 console.log('服务器启动成功');
});

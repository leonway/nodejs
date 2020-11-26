test("测试生成vue路由配置文件",()=>{
  const getRouter = require('../index')
  const { resolve } = require('path')
  const ret = getRouter(resolve(__dirname,'./data'))
  expect(ret).toBe(`
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [

{
    path:'/about',
    name:about,
    component:()=>import('./views/about.vue')
}
,
{
    path:'/index',
    name:index,
    component:()=>import('./views/index.vue')
}

    ]
})`)
})

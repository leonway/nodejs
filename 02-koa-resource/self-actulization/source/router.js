class Router {
  constructor(){
    this.table = new Map()
  }
  get(path,middleWare){
    this.setTable('get',path,middleWare)
  }
  post(path,middleWare){
    this.setTable('post',path,middleWare)
  }
  setTable(method,path,middleWare){
    this.table.set({
      method,
      path
    },
    middleWare
    )
  }
  routes(){
    return async(ctx,next)=>{
      const { url, method } = ctx
      let fn
      for (const [key,value] of this.table.entries()) {
        if(key.path===url&&key.method===method){
          fn = value
        }
      }
      console.log({
        path:url,method
      });
      console.log(this.table);
      console.log(fn);
      if(!fn){
        ctx.body='not fund'
      }else{
        fn(ctx,next)
      }
    }
  }
}

module.exports=Router

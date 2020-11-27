class Router {
  constructor(){
    this.table = new Map()
  }
  get(path,middleWare){
    setTable('get',path,middleWare)
  }
  post(path,middleWare){
    setTable('post',path,middleWare)
  }
  setTable(method,path,middleWare){
    this.table.set({
      method,
      path
    },
    middleWare
    )
  }
}

module.exports Router

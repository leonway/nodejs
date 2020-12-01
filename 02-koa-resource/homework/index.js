const compose = (fns) =>{
  return ()=>{
    return dispatch(0)
    function dispatch(i) {
      const fn = fns[i]
      if(!fn){
        return Promise.resolve()
      }
      return Promise.resolve(fn(()=>dispatch(i+1)))
    }
  }
} 

module.exports = {
  compose
}

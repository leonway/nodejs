module.exports = (fn)=>{
  return (...args)=>{
    return new Promise((res,rej)=>{
      args.push((err,...restData)=>{
        if(err){
          rej(err)
        }else{
          res(...restData)
        }
      })
      fn.apply(null,args)
    })
  }
}

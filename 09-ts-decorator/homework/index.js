const sender = (msg)=>(target,property)=>{
  const old = target.prototype[property]
  target.prototype[property] = (arg)=>old(`${msg} : ${arg}`)
}
const brackets = (target,property)=>{
  const old = target.prototype[property]
  target.prototype[property] = (arg)=>old(`[${arg}]`)
}

module.exports = { sender, brackets } 

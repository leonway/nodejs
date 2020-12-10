// const { EventEmitter } = require('events')
class EventEmitter {
  constructor(){
    this.eventNameToCbs = {}   
  }
  addListener(eventName,cb){
    if(!this.eventNameToCbs[eventName]){
      this.eventNameToCbs[eventName] = [cb]
    }else{
      this.eventNameToCbs[eventName] = [
        ...this.eventNameToCbs[eventName],
        cb
      ]
    }
  }
  emit(eventName,...args){
    if(!this.eventNameToCbs[eventName]||!this.eventNameToCbs[eventName].length){
     return
    }
    this.eventNameToCbs[eventName].forEach(cb=>cb(...args))
  }
}


class Connection {
  constructor(){
    this.emitter = new EventEmitter()
  }
  onConn(fn){
    this.emitter.addListener('connection',(msg)=>fn(msg))
  }
  connection(msg){
    this.emitter.emit('connection',msg)
  }
}

module.exports = Connection

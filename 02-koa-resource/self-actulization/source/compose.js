// const add = (x,y) => x+y
// const square = (z) => z*z
// const double = (x)=>{
//   const ret = x*2
//   console.log(ret);
//   return ret
// }

// const fn = (x,y) => square(add(x,y))

// const compose = (fn1,fn2)=>(...args)=>fn1(fn2(...args))

// const compose = (...fns)=>fns.reduce((fn1,fn2)=>(...args)=>fn1(fn2(...args)))

// const compose = (...[first,...other])=>(...args)=>{
//   let ret = first(...args)
//   other.forEach(fn=>{
//     ret = fn(ret)  
//   })
//   return ret
// }
// const fn = compose(add,square,double)
// console.log(fn(1,2));

// const delay =()=> new Promise((res)=>{
//   setTimeout(() => {
//     res()
//   }, 2000);
// })

// async function fn1(next) {
//   console.log('fn1');
//   await next()
//   console.log('end fn1');
// }

// // ()=>fn2(next)
// // ()=>fn3(next)
// fn3
// async function fn2(next) {
//   console.log('fn2');
//   await delay()
//   await next()
//   console.log('end fn2');
// }

// async function fn3(next) {
//   console.log('fn3');
// }

module.exports = function compose(middlewares) {
  return function (ctx) {
    return dispatch(0)
    function dispatch(i) {
      let fn = middlewares[i]
      if(!fn){
        return Promise.resolve()
      }
      return Promise.resolve(
        fn(ctx,function next(params) {
          return dispatch(i+1)
        })
      )
    }
  }
}

// const fn = compose([fn1,fn2,fn3])

// const next = ()=>new Promise((res)=>{
//   console.log('next');
//   res()
// })
// console.log(fn());

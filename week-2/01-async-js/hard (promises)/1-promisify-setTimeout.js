/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

function wait(n) {
  return new Promise((resolve,reason)=>{
    setTimeout(resolve,n*1000); // resolve, not resolve() -> don't call the function but pass it
  })  
}

module.exports = wait;

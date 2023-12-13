/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Return a promise chain which return the time in milliseconds it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function wait1(t) {
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      console.log('control');
      resolve();
    },t*1000);
  })
}

function wait2(t) {
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      console.log('control');
      resolve();
    },t*1000);
  })
}

function wait3(t) {
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      console.log('control');
      resolve();
    },t*1000);
  })
}

function calculateTime(t1, t2, t3) {
  return new Promise((resolve,reject)=>{
    const startTime = performance.now();
    wait1(t1)
    .then(()=>{return wait2(t2)})
    .then(()=>{return wait3(t3)})
    .then(()=>{
      resolve(performance.now()-startTime);
    })
    .catch(err=>console.error(err));
  
  })
}

calculateTime(1,1,1).then(value=>console.log(value));

/*
In chaining promises each .then() has to return a new promise for the next .then() to catch? and handle 
If not then the .then() gets executed synchronously and doesn't wait 
*/
module.exports = calculateTime;

const fs = require('fs')

const startRead = performance.now();

fs.readFile('lorem.txt', (err,data)=>{
  if(err) throw err;
  console.log(data.toString()); //Converts buffer to string data
  const endRead = performance.now();
  console.log((endRead-startRead)/1000);
})

const startTime = performance.now();
let sum=0;
for(let i=0;i<5000000000;i++){
  sum=sum+i;
}
const endTime = performance.now();

console.log((endTime-startTime)/1000);

//The readfile function's callback runs only after the callstack gets cleared
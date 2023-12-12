const fs = require('fs');

const data = 'test data'

fs.writeFile('writeFileTest.txt',data,(err)=>{
  if(err) throw err;
  console.log('Success');
})
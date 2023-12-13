const fs = require('fs');

fs.readFile('a.txt',(err,data)=>{
  if(err) throw err;
  let text = data.toString().trim();
  let newText = '';
  let lastChar = '';
  for(c of text){
    if(lastChar !==' ' || c !==' '){
      newText = newText + c;
      lastChar=c;
    }
  }
  console.log(newText);
  fs.writeFile('b.txt',newText,(err)=>{
    if(err) throw err;
  })
})
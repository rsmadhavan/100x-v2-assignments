function getTime(){
  const time = new Date();
  const hh = returnNormalizedTime(time.getHours());
  const mm = returnNormalizedTime(time.getMinutes());
  const ss = returnNormalizedTime(time.getSeconds());
  return {hh,mm,ss};
}
function returnNormalizedTime(time){
  return (time>9)?`${time}`:`0${time}`
}

// 24 HOUR CLOCK
setInterval(function(){
  const time = getTime();
  console.log(`${time.hh}:${time.mm}:${time.ss}`);
},1000);


//12 HOUR CLOCK
setInterval(function(){
  const time = getTime();
  console.log(`${returnNormalizedTime(time.hh%12)}:${time.mm}:${time.ss} ${(time.hh>12)?'PM':'AM'}`);
},1000);
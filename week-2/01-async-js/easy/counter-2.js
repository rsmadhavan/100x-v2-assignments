let count = 0;

const timer = () => setTimeout(function () {
  console.log(count);
  count = count + 1;
  timer();
}, 1000);

timer();
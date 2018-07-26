var counter = 1;
var pyramid = (counter) => {
  if(counter == 6) return;
  else {
    for(var a=0; a<counter; a++)
      console.log('*');
  }
  console.log('\n');
  pyramid(++counter);
}

pyramid(counter);

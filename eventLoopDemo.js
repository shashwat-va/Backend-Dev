console.log('start');

process.nextTick(() => {
  console.log('process.nextTick');
});

Promise.resolve().then(() => {
  console.log('promise.then');
});

setImmediate(() => {
  console.log('setImmediate');
});

setTimeout(() => {
  console.log('setTimeout');
}, 0);

console.log('end');

function Promise_all(promises) {
  return new Promise((resolve, reject) => {
    let results = [];
    let pending = promises.length;
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(result => {
        results[i] = result;
        pending--;
        if (pending == 0) resolve(results);
      }).catch(reject);
    }
    if (promises.length == 0) resolve(results);
  });
}
Promise_all([]).then(array => {
  console.log("This should be []:", array);
});
function soon(val) {
  return new Promise(resolve => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}
Promise_all([soon(1), soon(2), soon(3)]).then(array => {
  console.log("This should be [1, 2, 3]:", array);
});
Promise_all([soon(1), Promise.reject("X"), soon(3)])
  .then(array => {
    console.log("We should not get here");
  })
  .catch(error => {
    if (error != "X") {
      console.log("Unexpected failure:", error);
    }
  });

  //---------------------Excercise 1--------------------------

  // async function locateScalpel(nest) {
  //   let current = nest.name;
  //   for (;;) {
  //     let next = await anyStorage(nest, current, "scalpel");
  //     if (next == current) return current;
  //     current = next;
  //   }
  // }
  
  // function locateScalpel2(nest) {
  //   function loop(current) {
  //     return anyStorage(nest, current, "scalpel").then(next => {
  //       if (next == current) return current;
  //       else return loop(next);
  //     });
  //   }
  //   return loop(nest.name);
  // }
  
  // locateScalpel(bigOak).then(console.log);
  // locateScalpel2(bigOak).then(console.log);
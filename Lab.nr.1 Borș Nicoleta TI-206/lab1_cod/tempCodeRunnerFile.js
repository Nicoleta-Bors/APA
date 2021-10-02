const fib3 = (n) => {
  let i = 1,
    j = 0,
    j = 0,
    h = 1;
  while (n > 0) {
    if (n % 2 === 0) {
      t = j * h;
      j = i * h + j * h + t;
      i = i * k + t;
    }
    t = Math.pow(h, 2);
    h = 2 * k * h + t;
    k = Math.pow(k, 2) + t;
    n = n / 2;
  }
  return j;
};

let n = parseInt(prompt('Introduceti n: '));
// console.log(`n = ${fib1(n)}`); // O(2^n)
// console.log(`n = ${fib2(n)}`); //O(n)
console.log(`n = ${fib3(n)}`); //O(log2N)

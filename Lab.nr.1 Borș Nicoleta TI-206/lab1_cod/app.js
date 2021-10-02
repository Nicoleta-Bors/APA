const fib1 = (n) => (n < 2n ? n : fib1(n - 1n) + fib1(n - 2n));

const fib2 = (n) => {
  let i = 1n,
    j = 0n;
  for (let k = 1n; k <= n; k++) {
    j = i + j;
    i = j - i;
  }
  return j;
};

const fib3 = (n) => {
  let i = 1n,
    j = 0n,
    k = 0n,
    h = 1n,
    t = 1n;
  while (n > 0n) {
    if (n % 2n != 0) {
      t = j * h;
      j = i * h + j * k + t;
      i = i * k + t;
    }
    t = h * h;
    h = 2n * k * h + t;
    k = k * k + t;
    n = n / 2n;
  }
  return j;
};

let numar = prompt('Introduceti n: ');
let n = BigInt(numar.toString());

//fib1------------------------------------------------------------------------
// const startfib1 = window.performance.now();
// console.log(`Pentru functia fib1: f${numar} = ${fib1(n)}`); // O(2^n)
// const endfib1 = window.performance.now();
// console.log(`Se ruleaza in ${endfib1 - startfib1} ms`);

//fib2------------------------------------------------------------------------
// const startfib2 = window.performance.now();
// console.log(`Pentru functia fib2: f${numar} = ${fib2(n)}`); //O(n)
// const endfib2 = window.performance.now();
// console.log(`Se ruleaza in ${endfib2 - startfib2} ms`);

//fib3------------------------------------------------------------------------
const startfib3 = window.performance.now();
console.log(`Pentru functia fib3: f${numar} = ${fib3(n)}`); //O(log2N)
const endfib3 = window.performance.now();
console.log(`Se ruleaza in ${endfib3 - startfib3} ms`);

let graf = [];
let n; //nr varfuri

const unGraf = () => {
  n = 7;
  // graf = [
  //   [0, 0, 0, 0, 12, 10, 7],
  //   [0, 0, 0, 0, 0, 0, 0, 8],
  //   [0, 0, 0, 5, 0, 15, 0],
  //   [0, 0, 5, 0, 18, 20, 0],
  //   [12, 0, 0, 18, 0, 0, 5],
  //   [10, 0, 15, 20, 0, 0, 0],
  //   [7, 8, 0, 0, 5, 0, 0],
  // ];

  graf = [
    [0, Infinity, Infinity, Infinity, 12, 10, 7],
    [Infinity, 0, Infinity, Infinity, Infinity, Infinity, Infinity, 8],
    [Infinity, Infinity, 0, 5, Infinity, 15, Infinity],
    [Infinity, Infinity, 5, 0, 18, 20, Infinity],
    [12, Infinity, Infinity, 18, 0, Infinity, 5],
    [10, Infinity, 15, 20, Infinity, 0, Infinity],
    [7, 8, Infinity, Infinity, 5, Infinity, 0],
  ];
};

const initiereMatrice = (n, complete) => {
  for (let i = 0; i < n; i++) {
    graf[i] = [];
    for (let j = 0; j < n; j++) {
      graf[i][j] = complete;
    }
  }
};

const citireGraf = () => {
  n = parseInt(prompt('Introduceti numarul de varfuri al grafului: '));
  initiereMatrice(n, -1); //ca sa nu introducem de multe ori 0 unde nu avem muchie.

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) {
        graf[i][j] = 0;
      } else {
        if (graf[i][j] === -1) {
          graf[i][j] = graf[j][i] = parseInt(
            prompt(`Introduceti ponderea muchiei [${i}] - [${j}]:`),
          );
        }
      }
    }
  }
};

const grafRar = () => {
  let random1, random2;
  // n = 10;
  initiereMatrice(n, Infinity); //sa completez cu infinity

  for (let i = 0; i < n - 1; i++) {
    //graf[i][i] = 0
    graf[i][i + 1] = graf[i + 1][i] = Math.floor(Math.random() * n) + 1;

    random1 = Math.floor(Math.random() * (n - 1));
    random2 = Math.floor(Math.random() * (n - 1));

    // verific sa nu fie pe diagonala
    if (random1 !== random2) {
      graf[random1][random2] = graf[random2][random1] = Math.floor(Math.random() * n) + 1;
    }
  }
};

const grafDens = () => {
  // n = 10;
  initiereMatrice(n, Infinity);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) {
        graf[i][j] = 0;
      } else {
        if (graf[i][j] === Infinity) {
          graf[i][j] = graf[j][i] = Math.floor(Math.random() * n) + 1;
        }
      }
    }
  }
};

// ---------------------------------------------------------------- Kruskal
const find = (i, parent) => {
  // Gaseste seturile varfului i
  while (parent[i] != i) i = parent[i];
  return i;
};

const union = (i, j, parent) => {
  let a = find(i, parent);
  let b = find(j, parent);
  parent[a] = b;
};

const kruskal = (graf) => {
  console.log(`%cAlgoritmul lui Kruskal`, 'color: #E05297');

  let parent = Array(n).fill(0);
  let mincost = 0;
  let nrMuchii = 0;

  for (let i = 0; i < n; i++) parent[i] = i; //salvam toate varfurile in parent, necesar ca sa vedem daca muchia pe care dorim sa o adaugam formeaza un ciclu.

  while (nrMuchii < n - 1) {
    let min = Infinity,
      a = -1,
      b = -1;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (find(i, parent) != find(j, parent) && graf[i][j] < min) {
          min = graf[i][j];
          a = i;
          b = j;
        }
      }
    }

    union(a, b, parent);
    console.log(`Muchia ${nrMuchii} : (${a},${b}) cost: ${min}`);
    mincost += min;
    nrMuchii++;
  }
  console.log(`Minimum cost = ${mincost}`);
};
// ----------------------------------------------------------------

// ---------------------------------------------------------------- Prim

const isValidEdge = (i, j, varfuriParcurse) => {
  if (i == j) return false;
  if (varfuriParcurse[i] == false && varfuriParcurse[j] == false) return false;
  else if (varfuriParcurse[i] == true && varfuriParcurse[j] == true) return false;
  return true;
}; //verifica daca muchia e buna

const prim = (graf) => {
  console.log(`%cAlgoritmul lui Prim`, 'color: #E05297');
  let varfuriParcurse = Array(n).fill(false);
  varfuriParcurse[0] = true; //incepem cu primul varf
  let nrMuchii = 0,
    mincost = 0;

  while (nrMuchii < n - 1) {
    let min = Infinity,
      a = -1,
      b = -1;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (graf[i][j] < min) {
          if (isValidEdge(i, j, varfuriParcurse)) {
            min = graf[i][j];
            a = i;
            b = j;
          }
        }
      }
    }

    if (a != -1 && b != -1) {
      console.log(`Muchia ${nrMuchii} : ( ${a}, ${b} )  cost: ${min} `);
      mincost += min;
      varfuriParcurse[b] = varfuriParcurse[a] = true;
      nrMuchii++;
    }
  }

  console.log('Minimum cost = ' + mincost);
};
// ----------------------------------------------------------------

// unGraf();
// citireGraf();

n = 10;
// grafDens();
grafRar();
// console.log(graf);

const startTime = window.performance.now();
kruskal(graf);
// prim(graf);
const endTime = window.performance.now();

console.log(
  `%cTimpul de rulare: ${endTime - startTime} ms = ${(endTime - startTime) / 1000} s`,
  'color: #E05297',
);

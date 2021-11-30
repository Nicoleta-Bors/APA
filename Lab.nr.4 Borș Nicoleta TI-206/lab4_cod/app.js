let graf = [];
let n;

const unGraf = () => {
  graf = [
    [0, 2, 3, Infinity],
    [3, 0, 4, Infinity],
    [Infinity, 2, 0, 4],
    [Infinity, Infinity, 4, 0],
  ];

  n = graf.length;
};

const initiereMatrice = (n, complete) => {
  for (let i = 0; i < n; i++) {
    graf[i] = [];
    for (let j = 0; j < n; j++) {
      graf[i][j] = complete;
    }
  }
};

const grafRar = () => {
  let random1, random2;
  initiereMatrice(n, Infinity); //sa completez cu infinity

  for (let i = 0; i < n; i++) {
    graf[i][i] = 0;
  }
  for (let i = 0; i < n - 1; i++) {
    graf[i][i + 1] = Math.floor(Math.random() * n) + 1;
    graf[i + 1][i] = Math.floor(Math.random() * n) + 1;

    random1 = Math.floor(Math.random() * (n - 1));
    random2 = Math.floor(Math.random() * (n - 1));

    // verific sa nu fie pe diagonala
    if (random1 !== random2) {
      graf[random1][random2] = Math.floor(Math.random() * n) + 1;
    }
  }
};

const grafDens = () => {
  initiereMatrice(n, Infinity);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) {
        graf[i][j] = 0;
      } else {
        graf[i][j] = Math.floor(Math.random() * n) + 1;
      }
    }
  }
};

// ---------------------------------------------------------------- Dijkstra
const minDistance = (distante, varfuriVizitate) => {
  let min = Infinity;
  let minIndex = -1;

  for (let i = 0; i < n; i++) {
    if (varfuriVizitate[i] == false && distante[i] <= min) {
      min = distante[i];
      minIndex = i;
    }
  }
  return minIndex;
};

const dijkstra = (graf, src) => {
  // console.log('Distantele din nodul ' + src);
  let distante = new Array(n);
  let varfuriVizitate = new Array(n); //varfurile vizitate (care sunt in drumul minim)

  for (let i = 0; i < n; i++) {
    distante[i] = Infinity;
    varfuriVizitate[i] = false;
  }
  distante[src] = 0; // distanta de la varful sursa la el e 0

  let count = 0;
  while (count < n - 1) {
    let i = minDistance(distante, varfuriVizitate); // Alegem varful care are distanta minima si nu este vizitat.
    varfuriVizitate[i] = true;

    // Update distante
    for (let j = 0; j < n; j++) {
      if (
        !varfuriVizitate[j] &&
        graf[i][j] != Infinity &&
        graf[i][j] != 0 &&
        distante[i] != Infinity
      ) {
        //distanta de la care incepem nu poate fi infinity
        if (distante[i] + graf[i][j] < distante[j]) {
          distante[j] = distante[i] + graf[i][j];
        }
      }
    }

    count++;
  }

  // afisare;
  // for (let i = 0; i < n; i++) {
  //   console.log(`[${src}][${i}] = ${distante[i]}`);
  // }
};

// ----------------------------------------------------------------
// ---------------------------------------------------------------- Floyd

const floyd = (graf) => {
  let distante = [...graf]; //initial distante = graf
  let i, j, k; //k - sursa, i - linia, j - coloana

  for (k = 0; k < n; k++) {
    for (i = 0; i < n; i++) {
      for (j = 0; j < n; j++) {
        if (distante[i][j] > distante[i][k] + distante[k][j]) {
          distante[i][j] = distante[i][k] + distante[k][j];
        }
      }
    }
  }

  //afisare
  // for (let i = 0; i < n; i++) {
  //   console.log('Distantele din nodul ' + i);
  //   for (let j = 0; j < n; j++) {
  //     console.log(`[${i}][${j}] = ${distante[i][j]}`);
  //   }
  // }
};
// ----------------------------------------------------------------

// unGraf();
//----------
n = 10;
// grafDens();
grafRar();
// console.log(graf);

const startTime = window.performance.now();
///////////////////////////////DIJKSTRA
//dijkstra din toate nodurile
for (let i = 0; i < n; i++) {
  dijkstra(graf, i);
}
//dijkstra din un nod
// dijkstra(graf, 0);
/////////////////////////////////////////

//---------------------------------FLOYD
// floyd(graf);
//--------------------------------------
const endTime = window.performance.now();
//prettier-ignore
console.log(`%cTimpul de rulare: ${endTime - startTime} ms = ${(endTime - startTime) / 1000} s`,'color: #E05297');

//prettier-ignore
let apelRecursie = 0, comparatii = 0, interschimbari = 0, alipiri = 0, mutari = 0, counturi=0, apelCount=0;
//--------------------------------ARRAY GENERATOR-------------------------//
const getN = () => {
  let choice = parseInt(
    prompt(
      'Alegeti nr de elementele a tabloului:\n1 - 10\n2 - 100\n3 - 1000\n4 - 10000\n5 - 100000\n6 - 1000000\n7 - alta varianta',
    ),
  );
  let n;
  switch (choice) {
    case 1:
      n = 10;
      break;
    case 2:
      n = 100;
      break;
    case 3:
      n = 1000;
      break;
    case 4:
      n = 10000;
      break;
    case 5:
      n = 100000;
      break;
    case 6:
      n = 1000000;
      break;
    case 7:
      n = parseInt(prompt('Introduceti numarul de elemente a tabloului:'));
      break;
    default:
      console.log('Nu exista asa optiune');
      n = 0;
  }
  return n;
};
//-------------------------------------------------------------------------------//
const randomArray = (n, maxValue) => {
  let arr = [];
  for (let i = 0; i < n; i++) arr[i] = Math.floor(Math.random() * maxValue);
  return arr;
};
const ascendingArray = (n) => {
  let arr = [];
  for (let i = 0; i < n; i++) arr[i] = i;
  return arr;
};
const descendingArray = (n) => {
  let arr = [];
  for (let i = 0; i < n; i++) arr[i] = n - i;
  return arr;
};
const almostSorted = (n, maxValue) => {
  let arr = [];
  for (let i = 0; i < n - 1; i++) arr[i] = i;
  arr[n - 1] = Math.floor(Math.random() * maxValue);
  return arr;
};
//-------------------------------------------------------------------------------//
const makeArr = () => {
  const choice = parseInt(
    prompt(
      'Alegeti tipul tabloului:\n1 - Random\n2 - Sortat crescator\n3 - Sortat descrescator\n4 - Aproape sortat\n5 - Introdus in cod',
    ),
  );
  let arr = [];
  let n;
  switch (choice) {
    case 1:
      {
        n = getN();
        const maxValue = parseInt(
          prompt('Introduceti numarul maxim cu care sa fie completat tabloului:'),
        );
        arr = randomArray(n, maxValue);
      }
      break;
    case 2:
      n = getN();
      arr = ascendingArray(n);
      break;
    case 3:
      n = getN();
      arr = descendingArray(n);
      break;
    case 4:
      {
        n = getN();
        const maxValue = parseInt(
          prompt('Introduceti numarul maxim cu care sa fie completat tabloului:'),
        );
        arr = almostSorted(n, maxValue);
      }
      break;
    case 5:
      arr = [3, 432212];
      n = arr.length;
      break;
    default:
      console.log('Nu exista asa optiune');
  }
  console.group(`%cTabloul initial (n = ${n}):`, 'color: #D789D7');
  console.log(arr.join(', '));
  console.groupEnd();

  return arr;
};
//-------------------------------------------------------------------------------//
//-------------------------------------QUICK SORT--------------------------------//
const quickSort = (arr, start, end) => {
  let pivIndex;
  if (start < end) {
    pivIndex = partition(arr, start, end);
    quickSort(arr, start, pivIndex - 1); //stanga
    quickSort(arr, pivIndex + 1, end); //dreapta
  }
  apelRecursie++; // contur apel quickSort
};

const partition = (arr, start, end) => {
  let pivot = arr[end];
  let partIndex = start;
  for (i = start; i <= end - 1; i++) {
    if (arr[i] <= pivot) swap(arr, i, partIndex++);
    comparatii++; //contor comparatii
  }
  swap(arr, end, partIndex);
  return partIndex;
};

const swap = (arr, start, end) => {
  let temp = arr[start];
  arr[start] = arr[end];
  arr[end] = temp;
  interschimbari++; //contor interschimbari
};
//-------------------------------------------------------------------------------//
//------------------------------------Merge Sort---------------------------------//
const mergeSort = (arr, start, end) => {
  if (start < end) {
    let middle = parseInt((start + end) / 2);
    mergeSort(arr, start, middle);
    mergeSort(arr, middle + 1, end);
    merge(arr, start, middle, end);
  }
  apelRecursie++;
};

const merge = (arr, start, middle, end) => {
  let nLeft = middle - start + 1; //pana la mijloc inlcusiv
  let nRight = end - middle; //dupa mijloc
  //prettier-ignore
  let leftArr = [], rightArr = [];
  for (let i = 0; i < nLeft; i++) leftArr[i] = arr[start + i];
  for (let j = 0; j < nRight; j++) rightArr[j] = arr[middle + 1 + j];
  //prettier-ignore
  let i = 0, j = 0, k = start;
  while (i < nLeft && j < nRight) {
    if (leftArr[i] <= rightArr[j]) arr[k++] = leftArr[i++];
    else arr[k++] = rightArr[j++];
    comparatii++;
  }
  //daca mai avem elem. ramase
  while (i < nLeft) arr[k++] = leftArr[i++];
  while (j < nRight) arr[k++] = rightArr[j++];

  alipiri++;
};
//-------------------------------------------------------------------------------//
//------------------------------------Radix Sort---------------------------------//
const radixSort = (arr, n) => {
  let exp = 1,
    maxNumber = getMax(arr, n);
  while (Math.floor(maxNumber / exp)) {
    apelCount++;
    countSort(arr, n, exp);
    exp *= 10;
  }
};

const getMax = (arr, n) => {
  let maxNumber = arr[0];
  for (let i = 1; i < n; i++) if (arr[i] > maxNumber) maxNumber = arr[i];
  return maxNumber;
};

const countSort = (arr, n, exp) => {
  let output = [],
    count = new Array(10).fill(0),
    i;
  for (i = 0; i < n; i++) {
    count[Math.floor(arr[i] / exp) % 10]++;
    counturi++;
  } //sum of each element
  for (i = 1; i < 10; i++) {
    count[i] += count[i - 1];
    counturi++;
  } //sum of previous counts
  for (i = n - 1; i >= 0; i--) {
    output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i]; //nr din arr va fi inexul pt output = nr din arr
    count[Math.floor(arr[i] / exp) % 10]--;
    mutari++;
  }
  for (i = 0; i < n; i++) arr[i] = output[i]; // sorted arr
};
//-------------------------------------------------------------------------------//
const chooseAlgorithm = () => {
  let myArr = makeArr();
  //prettier-ignore
  let choice = parseInt(prompt('Alegeti algoritmul cu care doriti sa sortati tabelul:\n1 - Quick Sort\n2 - Merge Sort\n3 - Radix Sort'));
  if (myArr == 0) choice = 0;
  switch (choice) {
    case 1:
      {
        const startTime = window.performance.now();
        quickSort(myArr, 0, myArr.length - 1);
        const endTime = window.performance.now();
        console.group('%cTabloul sortat (Quick Sort):', 'color: #D789D7');
        console.log(myArr.join(', '));
        console.groupEnd();
        //CONTORURI
        console.group('%cContoruri: ', 'color: #D789D7');
        console.log(`%cNr. de apelare a recursiei: ${apelRecursie}`, 'color: #FADBEB');
        console.log(`%cNr. de comparatii: ${comparatii}`, 'color: #F3BAD6');
        console.log(`%cNr. de interschimbari: ${interschimbari}`, 'color: #EA86B6');
        //prettier-ignore
        console.log(`%cTimpul de rulare: ${endTime - startTime} ms = ${(endTime - startTime) / 1000} s`, 'color: #E05297');
        console.groupEnd();
      }
      break;
    case 2:
      {
        const startTime = window.performance.now();
        mergeSort(myArr, 0, myArr.length - 1);
        const endTime = window.performance.now();
        console.group('%cTabloul sortat (Merge Sort):', 'color: #D789D7');
        console.log(myArr.join(', '));
        console.groupEnd();
        //CONTORURI
        console.group('%cContoruri: ', 'color: #D789D7');
        console.log(`%cNr. de apelare a recursiei: ${apelRecursie}`, 'color: #FADBEB');
        console.log(`%cNr. de comparatii: ${comparatii}`, 'color: #F3BAD6');
        console.log(`%cNr. de alipiri: ${alipiri}`, 'color: #EA86B6');
        console.log(
          `%cTimpul de rulare: ${endTime - startTime} ms = ${(endTime - startTime) / 1000} s`,
          'color: #E05297',
        );
        console.groupEnd();
      }
      break;
    case 3:
      {
        const startTime = window.performance.now();
        radixSort(myArr, myArr.length);
        const endTime = window.performance.now();
        console.group('%cTabloul sortat (Radix Sort):', 'color: #D789D7');
        console.log(myArr.join(', '));
        console.groupEnd();
        //CONTORURI
        console.group('%cContoruri: ', 'color: #D789D7');
        console.log(`%cNr. de mutari: ${mutari}`, 'color: #FADBEB');
        console.log(`%cNr. de counturi: ${counturi}`, 'color: #F3BAD6');
        console.log(`%cNr. de apelare a functiei countSort: ${apelCount}`, 'color: #EA86B6');
        console.log(
          `%cTimpul de rulare: ${endTime - startTime} ms = ${(endTime - startTime) / 1000} s`,
          'color: #E05297',
        );
        console.groupEnd();
      }
      break;
    default:
      console.log('Nu exista asa optiune');
  }
};
//-------------------------------------------------------------------------------//
chooseAlgorithm();

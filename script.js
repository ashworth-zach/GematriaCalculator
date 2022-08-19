let values = {
  Reverse: undefined,
  English: undefined,
  Full: undefined
};
let EnglishOrdinalDefinitions = {
  " ": 0,
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26
};
let ReverseEnglishOrdinalDefinitions = {
  " ": 0,
  a: 26,
  b: 25,
  c: 24,
  d: 23,
  e: 22,
  f: 21,
  g: 20,
  h: 19,
  i: 18,
  j: 17,
  k: 17,
  l: 15,
  m: 14,
  n: 13,
  o: 12,
  p: 11,
  q: 10,
  r: 9,
  s: 8,
  t: 7,
  u: 6,
  v: 5,
  w: 4,
  x: 3,
  y: 2,
  z: 1
};
let FullReductionDefinitions = {
  " ": 0,
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 1,
  k: 2,
  l: 3,
  m: 4,
  n: 5,
  o: 6,
  p: 7,
  q: 8,
  r: 9,
  s: 1,
  t: 2,
  u: 3,
  v: 4,
  w: 5,
  x: 6,
  y: 7,
  z: 8
};
let EnglishOrdinal = [];
let ReverseEnglishOrdinal = [];
let FullReduction = [];

function submit() {
  let inputText = document.getElementById("text");
  let value = copyObject(inputText.value);
  inputText.value = "";
  
  EnglishOrdinal = [];
  ReverseEnglishOrdinal = [];
  FullReduction = [];

  values = {
    Reverse: undefined,
    English: undefined,
    Full: undefined
  };

  for (let i = 0; i < value.length; i++) {
    pushValueToArrays(value[i].toLowerCase());
  }
  for (let i = 2; i > -1; i--) {
    switch (i) {
      case 0:
        values["English"] = combineValues(EnglishOrdinal);
        createOrUpdateGrids(EnglishOrdinal, value, i, "(EO)");
        break;
      case 1:
        values["Reverse"] = combineValues(ReverseEnglishOrdinal);
        createOrUpdateGrids(ReverseEnglishOrdinal, value, i, "(REO)");
        break;
      case 2:
        values["Full"] = combineValues(FullReduction);
        createOrUpdateGrids(FullReduction, value, i, "(FR)");
        break;
    }
  }
  updateResults();
}

function createOrUpdateGrids(gridData, value, type, finalHeading) {
  let master = document.getElementById("master-container");

  switch (type) {
    case 0:
      createGridElements(
        gridData,
        value,
        "English Ordinal",
        master,
        finalHeading
      );
      break;
    case 1:
      createGridElements(
        gridData,
        value,
        "Reverse English Ordinal",
        master,
        finalHeading
      );
      break;
    case 2:
      createGridElements(
        gridData,
        value,
        "Full Reduction",
        master,
        finalHeading
      );
      break;
  }
}

function createGridElements(
  data,
  value,
  gridTitle,
  parentElement,
  finalHeading
) {
  let newTable = document.createElement("table");
  
  //shorthand description for creating class for each item
  let key = gridTitle.split(" ")[0];

  generateTableRows(newTable, key, data, value, finalHeading);
  
  //add grid title
  let gridTitleElement = document.createElement("label");
  gridTitleElement.classList.add("grid-title");
  gridTitleElement.classList.add("grid-title-"+key);
  gridTitleElement.innerHTML = gridTitle
  
  parentElement.prepend(newTable);
  parentElement.prepend(gridTitleElement);
}

function generateTableRows(newTable, key, data, value, finalHeading){
  for (let i = 0; i < 2; i++) {
    let newRow = document.createElement("tr");
    if (i == 0) {
      for (let j = 0; j < value.length; j++) {
        let newColHeader = document.createElement("th");
        newColHeader.innerHTML = value[j];
        newRow.appendChild(newColHeader);
        if (j == value.length - 1) {
          let lastHeader = document.createElement("th");
          lastHeader.innerHTML = finalHeading;
          lastHeader.classList.add("lastHeader");
          lastHeader.classList.add("lastHeader-" + key);
          newRow.appendChild(lastHeader);
        }
      }
    } else {
      for (let j = 0; j < data.length; j++) {
        let newColData = document.createElement("td");
        newColData.innerHTML = data[j];
        newRow.appendChild(newColData);
        if (j == data.length - 1) {
          let finalVal = values[key];
          let finalResultData = document.createElement("td");
          finalResultData.style.color = "limegreen";
          finalResultData.innerHTML = finalVal;
          newRow.appendChild(finalResultData);
        }
      }
    }
    newTable.appendChild(newRow);
  }
}

function addGridDescription() {}

function updateResults() {
  engOrdElement = document.getElementById("EnglishOrdinal");
  revEngOrdElement = document.getElementById("ReverseEnglishOrdinal");
  fullReductionElement = document.getElementById("FullReduction");
  engOrdElement.innerHTML = values["English"];
  revEngOrdElement.innerHTML = values["Reverse"];
  fullReductionElement.innerHTML = values["Full"];
}

function pushValueToArrays(value) {
  EnglishOrdinal.push(EnglishOrdinalDefinitions[value]);
  ReverseEnglishOrdinal.push(ReverseEnglishOrdinalDefinitions[value]);
  FullReduction.push(FullReductionDefinitions[value]);
}

function combineValues(arr) {
  let finalResult = 0;
  for (let i = 0; i < arr.length; i++) {
    finalResult += arr[i];
  }
  return finalResult;
}

function copyObject(value){
  return JSON.parse(JSON.stringify(value));
}

let element = document.getElementById("submit");
element.addEventListener("click", submit);
$(document).on("keypress", function (e) {
  if (e.which == 13) {
    submit();
  }
});

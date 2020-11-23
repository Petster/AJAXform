"use strict";

let form = document.getElementById("questionForm");
let btn = document.getElementById("subbtn");
let resbtn = document.getElementById("resbtn");
let prog = document.getElementById("progbar");
let charCount = document.getElementById("char-count");
let keypresses = 0;
let numValid = 0; //progress amount
let data = {}; //json data
let validInput = {
  flower: false,
  domain: false,
  quantity: false,
  colors: false,
  story: false
};
let inputList = [
  document.getElementById("flower"),
  document.getElementById("domain"),
  document.getElementById("quantity"),
  document.getElementById("colors"),
  document.getElementById("story")
];
let colSel = inputList[3].selectedOptions;
let colArr = [];

//VALIDATION
form.addEventListener("change", formChangeCheck);

//WORD COUNT
document.getElementById("story").addEventListener("input", storyCount);

//SUBMISSION
btn.addEventListener("click", submit);

//RESET BUTTON
resbtn.addEventListener("click", reset);

function formChangeCheck(e) {
  let a = e.target;
  switch (a.tagName) {
    case "INPUT":
      let inputValid;
      let inputTemp;
      if (!a.checkValidity()) {
        inputValid = false;
      } else {
        inputValid = true;
      }
      inputTemp = validInput[a.id];
      validInput[a.id] = inputValid;
      if (inputTemp === validInput[a.id]) {
        break;
      } else if (validInput[a.id] === true) {
        if (a.id === "domain") {
          document.getElementById(a.id + "Error").classList.add("hidden");
          break;
        }
        document.getElementById(a.id + "Error").classList.add("hidden");
        numValid++;
        prog.value = numValid;
      } else {
        if (a.id === "domain") {
          document.getElementById(a.id + "Error").classList.remove("hidden");
          break;
        }
        document.getElementById(a.id + "Error").classList.remove("hidden");
        numValid--;
        prog.value = numValid;

      }
      break;
      //END INPUT CASE

    case "SELECT":
      let selectValid;
      let selectTemp;
      if (!a.checkValidity()) {
        selectValid = false;
      } else {
        selectValid = true;
      }
      selectTemp = validInput[a.id];
      validInput[a.id] = selectValid;
      if (selectTemp === validInput[a.id]) {
        for (let j = 0; j < colSel.length; j++) {
          colArr[j] = colSel.item(j).label;
        }
        break;
      } else if (validInput[a.id] === true) {
        document.getElementById(a.id + "Error").classList.add("hidden");
        numValid++;
        prog.value = numValid;
        for (let j = 0; j < colSel.length; j++) {
          colArr[j] = colSel.item(j).label;
        }
      } else {
        document.getElementById(a.id + "Error").classList.add("hidden");
        numValid--;
        prog.value = numValid;
      }
      break;
      //END SELECT CASE

    case "TEXTAREA":
      let taValid;
      let taTemp;
      if (e.target.value.length < 5 || a.value.length > 100) {
        taValid = false;
      } else {
        taValid = true;
      }
      taTemp = validInput[a.id];
      validInput[a.id] = taValid;
      if (taTemp === validInput[a.id]) {
        break;
      } else if (validInput[a.id] === true) {
        document.getElementById(a.id + "Error").classList.add("hidden");
        numValid++;
        prog.value = numValid;
      } else {
        document.getElementById(a.id + "Error").classList.remove("hidden");
        numValid--;
        prog.value = numValid;
      }
      //END TEXTAREA CASE
  } //END SWITCH
}

function storyCount() {
  charCount.textContent = this.value.length;
  if (this.value.length > 100) {
    this.classList.remove("storyAccept");
    this.classList.add("storyDeny");
  } else {
    this.classList.remove("storyDeny");
    this.classList.add("storyAccept");
  }
}

function submit() {
  let xmlhttp;
  xmlhttp = new XMLHttpRequest();
  xmlhttp.addEventListener("load", done, false);
  xmlhttp.open("POST", "https://www.nashuaweb.net/submit-json.php", true);
  xmlhttp.setRequestHeader("Content-Type", "application/json");

  let formElements = document.querySelectorAll("input, select, textarea");
  for (let a of formElements) {
    if (a.id === "colors") {
      data[a.id] = colArr;
    } else {
      data[a.id] = a.value;
    }
  }
  xmlhttp.send(JSON.stringify(data));
}

function reset() {
  numValid = 0;
  charCount.textContent = 0;
  prog.value = 0;
  validInput = {
    flower: false,
    domain: false,
    quantity: false,
    colors: false,
    story: false
  };
}

function done() {
  document.getElementById("status").textContent = this.status;
  let jResponse = JSON.parse(this.response);
  if (jResponse.success) {
    document.getElementById("questionForm").classList.add("hidden");
    document.getElementById("formSuccess").classList.remove("hidden");
    document.getElementById("formFail").classList.add("hidden");
    document.getElementById("subFlower").textContent = data.flower;
    document.getElementById("subDomain").textContent = data.domain;
    document.getElementById("subNumber").textContent = data.quantity;
    document.getElementById("subColors").textContent = data.colors;
    document.getElementById("subStory").textContent = data.story;
  } else if (jResponse.error) {
    document.getElementById("formFail").classList.remove("hidden");
    if (jResponse.data.flower === "invalid") {
      document.getElementById("flowerError").classList.remove("hidden");
    }
    if (jResponse.data.quantity === "invalid") {
      document.getElementById("quantityError").classList.remove("hidden");
    }
    if (jResponse.data.colors === "invalid") {
      document.getElementById("colorsError").classList.remove("hidden");
    }
    if (jResponse.data.story === "invalid") {
      document.getElementById("storyError").classList.remove("hidden");
    }

  }
}

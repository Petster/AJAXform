"use strict";

let form = document.getElementById("questionForm");
let btn = document.getElementById("subbtn");
let resbtn = document.getElementById("resbtn");
let prog = document.getElementById("progbar");
let charCount = document.getElementById("char-count");
let keypresses = 0;
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
inputList[4].addEventListener("input", storyCount);

//SUBMISSION submit the form
btn.addEventListener("click", submit);

//RESET BUTTON reset the form
resbtn.addEventListener("click", reset);

//MODAL CLOSE to reset the form and reshow it
$("#modalClose").on("click", returnForm);


//Validate The Inputs, Selects, and Textarea's
function formChangeCheck(e) {
  let a = e.target;
  switch (a.tagName) {
    case "INPUT":
      let inputValid;
      if (!a.checkValidity()) {
        inputValid = false;
      } else {
        inputValid = true;
      }
      validInput[a.id] = inputValid;
      if (validInput[a.id] === true) {
        if (a.id === "domain") {
          document.getElementById(a.id + "Error").classList.add("hidden");
          break;
        }
        document.getElementById(a.id + "Error").classList.add("hidden");
      } else {
        if (a.id === "domain") {
          document.getElementById(a.id + "Error").classList.remove("hidden");
          break;
        }
        document.getElementById(a.id + "Error").classList.remove("hidden");
      }
      break;
      //END INPUT CASE

    case "SELECT":
      let selectValid;
      if (!a.checkValidity()) {
        selectValid = false;
      } else {
        selectValid = true;
      }
      validInput[a.id] = selectValid;
      if (validInput[a.id] === true) {
        document.getElementById(a.id + "Error").classList.add("hidden");
        for (let j = 0; j < colSel.length; j++) {
          colArr[j] = colSel.item(j).label;
        }
      } else {
        document.getElementById(a.id + "Error").classList.add("hidden");
      }
      break;
      //END SELECT CASE

    case "TEXTAREA":
      let taValid;
      if (e.target.value.length < 5 || a.value.length > 100) {
        taValid = false;
      } else {
        taValid = true;
      }
      validInput[a.id] = taValid;
      if (validInput[a.id] === true) {
        document.getElementById(a.id + "Error").classList.add("hidden");
      } else {
        document.getElementById(a.id + "Error").classList.remove("hidden");
      }
      //END TEXTAREA CASE
  } //END SWITCH

  //Set Progress Bar Value
  prog.value = Object.values(validInput).filter(v => v === true).length;
}

//Check Textarea wordcount
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

//AJAX submission, puts the data into JSON
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

//resets the form progression, character count, and valid inputs
function reset() {
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

//on modal close reset and reshow the form
function returnForm() {
  $("#exampleModal").modal('hide');
  fullpage_api.setAllowScrolling(true);
  document.getElementById("questionForm").classList.remove("hidden");
  document.getElementById("questionForm").reset();
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

//if AJAX submit success: display data, if error show what needs to be fixed
function done() {
  document.getElementById("status").textContent = this.status;
  let jResponse = JSON.parse(this.response);
  if (jResponse.success) {
    document.getElementById("questionForm").classList.add("hidden");
    $("#exampleModal").modal('show');
    fullpage_api.setAllowScrolling(false);
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

"use strict";
let btn = document.getElementById("subbtn");
let resbtn = document.getElementById("resbtn");
let prog = document.getElementById("progbar");
let charCount = document.getElementById("char-count");
let keypresses = 0;
let numValid = 0;
let data = {};

let inputList = [
    document.getElementById("flower"),
    document.getElementById("domain"),
    document.getElementById("quantity"),
    document.getElementById("colors"),
    document.getElementById("story")
];
let errorList = [
    document.getElementById("flowerError"),
    document.getElementById("domainError"),
    document.getElementById("numberError"),
    document.getElementById("colorsError"),
    document.getElementById("storyError")
];
let progValidity = [
    false,
    false,
    false,
    false,
    false,
    false
];
let colSel = inputList[3].selectedOptions;
let colArr = [];


//FLOWER
inputList[0].addEventListener("change", () => {
   if(!inputList[0].checkValidity()) {
       errorList[0].classList.remove("hidden");
       if(progValidity[0] === false) {

       } else if (progValidity[0] === true) {
           progValidity[0] = false;
           numValid--;
           prog.value = numValid;
           data[inputList[0].id] = "";
       }
   } else {
       errorList[0].classList.add("hidden");
       if(progValidity[0] === true) {

       } else if (progValidity[0] === false) {
           progValidity[0] = true;
           numValid++;
           prog.value = numValid;
           data[inputList[0].id] = inputList[0].value;
       }
   }
});
//DOMAIN
inputList[1].addEventListener("change", () => {
   if(!inputList[1].checkValidity()) {
       errorList[1].classList.remove("hidden");
       if(progValidity[1] === false) {

       } else if (progValidity[1] === true) {
           progValidity[1] = false;
           numValid--;
           prog.value = numValid;
           data[inputList[1].id] = "";
       }
   } else {
       errorList[1].classList.add("hidden");
       if(progValidity[1] === true) {

       } else if (progValidity[1] === false) {
           progValidity[1] = true;
           numValid++;
           prog.value = numValid;
           data[inputList[1].id] = inputList[1].value;
       }
   }
});
//QUANTITY
inputList[2].addEventListener("change", () => {
   if(!inputList[2].checkValidity()) {
       errorList[2].classList.remove("hidden");
       if(progValidity[2] === false) {

       } else if (progValidity[2] === true) {
           progValidity[2] = false;
           numValid--;
           prog.value = numValid;
           data[inputList[2].id] = "";
       }
   } else {
       errorList[2].classList.add("hidden");
       if(progValidity[2] === true) {

       } else if (progValidity[2] === false) {
           progValidity[2] = true;
           numValid++;
           prog.value = numValid;
           data[inputList[2].id] = inputList[2].value;
       }
   }
});
//COLORS
inputList[3].addEventListener("click", () => {
   if(inputList[3].checkValidity() === false) {
       errorList[3].classList.remove("hidden");
       if(progValidity[3] === false) {

       } else if (progValidity[3] === true) {
           progValidity[3] = false;
           numValid--;
           prog.value = numValid;
       }
   } else {
       errorList[3].classList.add("hidden");
       if(progValidity[3] === true) {

       } else if (progValidity[3] === false) {
           progValidity[3] = true;
           numValid++;
           prog.value = numValid;
           for(let j = 0; j < colSel.length; j++) {
           colArr[j] = colSel.item(j).label;
            }
            data[inputList[3].id] = colArr;
       }
   }
});
//STORY
inputList[4].addEventListener("change", () => {
   if(inputList[4].value.length < 5 || inputList[4].value.length > 100) {
       errorList[4].classList.remove("hidden");
       if(progValidity[4] === false) {

       } else if (progValidity[4] === true) {
           progValidity[4] = false;
           numValid--;
           prog.value = numValid;
           document.getElementById("storyCount").classList.remove("storyCountAccept");
           document.getElementById("storyCount").classList.add("storyCountDeny");
           data[inputList[4].id] = "";
       }
   } else if(inputList[4].value.length >= 5) {
       errorList[4].classList.add("hidden");
       if(progValidity[4] === true) {

       } else if (progValidity[4] === false) {
           progValidity[4] = true;
           numValid++;
           prog.value = numValid;
           document.getElementById("storyCount").classList.remove("storyCountDeny");
           document.getElementById("storyCount").classList.add("storyCountAccept");
           data[inputList[4].id] = inputList[4].value;
       }
   }
});

//WORD COUNT
document.getElementById("story").addEventListener("input", storyCount);

//SUBMISSION
btn.addEventListener("click", submit);

//RESET BUTTON
resbtn.addEventListener("click", reset);

//FUNCTIONS
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
    xmlhttp.send(JSON.stringify(data));
}
function reset() {
    document.getElementById("questionForm").reset();
    numValid = 0;
    charCount.textContent = 0;
    prog.value = 0;
}
function done() {
    document.getElementById("status").textContent = this.status;
    let jResponse = JSON.parse(this.response);
    if(jResponse.success) {
        document.getElementById("questionForm").classList.add("hidden");
        document.getElementById("formSuccess").classList.remove("hidden");
        document.getElementById("formFail").classList.add("hidden");
        document.getElementById("subFlower").textContent = data.flower;
        document.getElementById("subDomain").textContent = data.domain;
        document.getElementById("subNumber").textContent = data.quantity;
        document.getElementById("subColors").textContent = data.colors;
        document.getElementById("subStory").textContent = data.story;
    } else if(jResponse.error) {
        document.getElementById("formFail").classList.remove("hidden");
        if(jResponse.data.flower === "invalid"){
                   errorList[0].classList.remove("hidden");
        }
        if(jResponse.data.quantity === "invalid"){
                   errorList[2].classList.remove("hidden");
        }
        if(jResponse.data.colors === "invalid"){
                   errorList[3].classList.remove("hidden");
        }
        if(jResponse.data.story === "invalid"){
                   errorList[4].classList.remove("hidden");
        }

    }
}

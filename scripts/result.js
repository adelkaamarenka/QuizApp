import { getFinalAnswer } from "./load-quiz.js";
import { translateText } from "./translate.js";
import langExport from "./translate.js";
import { resultContent } from "./result-content.js";

let elementsArr = ["title", "img", "description"];

let resultElements = {
    title: "",
    img: "",
    description: "",
}

let lang = langExport;

let answer = getFinalAnswer();

document.addEventListener("DOMContentLoaded", init);

function init() {
    elementsArr.forEach(element => {
        resultElements[element] = document.querySelector(`.${element}`);
        console.log(resultElements[element]);
    })

    loadContent();
}

function loadContent() {
    elementsArr.forEach(element => {
        resultElements[element].textContent = translateText(resultContent[answer][element], lang);
    })
}
import { translateText } from "./translate.js";
import langExport from "./translate.js";
import quizContent from "./quiz-contents.js";


const lang = langExport;

const gameElements = ["question", "a", "b", "c", "d"];

let gameState = {
  question: "",
  a: "",
  b: "",
  c: "",
  d: "",
}

let currQuestion;

document.addEventListener("DOMContentLoaded", init);

function init() {
  gameElements.forEach(element => {
    gameState[element] = document.querySelector(`.${element}`);
    console.log(element);
  })

  console.log(gameState);
  currQuestion = 0;

  loadQuestion();

  let button = document.querySelector(".next");
  button.addEventListener("click", changeQuestion);
}

function changeQuestion() {
  currQuestion++;
  if (currQuestion < quizContent.length) {
    loadQuestion();
    //un-check the radio

    //save the answer somewhere
  }
  else {
    //save the answer

    //calculate the results

    //export the results to result.html
    document.location = "../result.html"
  }

}

function loadQuestion() {
  gameElements.forEach(element => {
    gameState[element].textContent = translateText(quizContent[currQuestion][element], lang);
  })
}
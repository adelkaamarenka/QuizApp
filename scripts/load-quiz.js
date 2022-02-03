import { translateText } from "./translate.js";
import langExport from "./translate.js";
import quizContent from "./quiz-contents.js";


const lang = langExport;

const gameElements = ["a", "b", "c", "d"];

let gameState = {
  a: "",
  b: "",
  c: "",
  d: "",
}

let answersCounter = {
  a: 0,
  b: 0,
  c: 0,
  d: 0,
}

let currQuestion;
let question;

document.addEventListener("DOMContentLoaded", init);

function init() {

  question = document.querySelector(".question");

  gameElements.forEach(element => {
    gameState[element] = document.querySelector(`.${element}`);
    gameState[element].addEventListener("click", event => gameState[element].classList.add("active"));
  })

  currQuestion = 0;

  loadQuestion();

  let nextButtons = document.querySelectorAll(".next");
  nextButtons.forEach(element => element.addEventListener("click", nextQuestion));

  let backButtons = document.querySelectorAll(".back");
  backButtons.forEach(element => element.addEventListener("click", previousQuestion));
}

function nextQuestion() {
  /*   gameElements.forEach(element => findAnswer(element)); */

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

function dupa() {
  console.log();
}

function previousQuestion() {
  if (currQuestion > 0) {
    currQuestion--;
    loadQuestion();
    //un-check the radio

    //delete the current answer
  }

}

function loadQuestion() {
  question.textContent = translateText(quizContent[currQuestion].question, lang);
  gameElements.forEach(element => {
    gameState[element].textContent = translateText(quizContent[currQuestion][element], lang);
  })
}
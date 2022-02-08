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

let answers = {
  a: "",
  b: "",
  c: "",
  d: "",
}

let currQuestion;
let question;

document.addEventListener("DOMContentLoaded", init);

function init() {

  question = document.querySelector(".question");

  //assign the answer js variables to the html elements
  gameElements.forEach(element => {
    gameState[element] = document.querySelector(`.${element}`);
    answers[element] = document.querySelector(`#${element}`);
  })

  currQuestion = 0;

  //load the first question
  loadQuestion();

  //assign functionality to buttons
  let nextButtons = document.querySelectorAll(".next");
  nextButtons.forEach(element => element.addEventListener("click", nextQuestion));

  let backButtons = document.querySelectorAll(".back");
  backButtons.forEach(element => element.addEventListener("click", previousQuestion));
}

function nextQuestion() {
  //log the answer
  gameElements.forEach(element => {
    answers[element].checked ? saveAnswer(element) : "";
  });

  currQuestion++;

  //load the next question
  if (currQuestion < quizContent.length) {
    loadQuestion();
    gameElements.forEach(element => { answers[element].checked = false });

    //save the answer somewhere
  }

  //load the results
  else {
    //save the answer

    //calculate the results

    //export the results to result.html
    document.location = "../result.html"
  }

}

function saveAnswer(element) {
  answersCounter[element]++;
  console.log(answersCounter);
}

function previousQuestion() {
  if (currQuestion > 0) {
    currQuestion--;
    loadQuestion();
    gameElements.forEach(element => { answers[element].checked = false });

    //delete the current answer
  }

}

function loadQuestion() {
  question.textContent = translateText(quizContent[currQuestion].question, lang);
  gameElements.forEach(element => {
    gameState[element].textContent = translateText(quizContent[currQuestion][element], lang);
  })
}
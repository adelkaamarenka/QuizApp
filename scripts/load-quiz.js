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

//needed to be able to go back to the previous questions
let answersStates = []

let answers = {
  a: "",
  b: "",
  c: "",
  d: "",
}

let currQuestion;
let question;
let promptField;
let counter;

let finalAnswer;

document.addEventListener("DOMContentLoaded", init);

function init() {

  question = document.querySelector(".question");

  //assign the answer js variables to the html elements
  gameElements.forEach(element => {
    gameState[element] = document.querySelector(`.${element}`);
    answers[element] = document.querySelector(`#${element}`);
  })

  promptField = document.querySelector(".prompt");
  lang != null ? promptField.textContent = translateText("Choose an answer!", lang) : promptField.textContent = "Choose an answer!";

  counter = document.querySelector(".counter");

  currQuestion = 0;

  let n = Object.assign({}, answersCounter);
  answersStates.push(n);

  //load the first question
  loadQuestion();

  //assign functionality to buttons
  let nextButtons = document.querySelectorAll(".next");
  nextButtons.forEach(element => element.addEventListener("click", nextQuestion));

  let backButtons = document.querySelectorAll(".back");
  backButtons.forEach(element => element.addEventListener("click", previousQuestion));
}


function nextQuestion() {
  let count = 0;

  //log the answer
  gameElements.forEach(element => {
    answers[element].checked ? answersCounter[element]++ : count++;
  });

  const temp = Object.assign({}, answersCounter);
  answersStates.push(temp);

  if (count < 4) {
    currQuestion++;

    //if not the last question - load the next question and uncheck radio
    if (currQuestion < quizContent.length) {
      loadQuestion();
      gameElements.forEach(element => { answers[element].checked = false });
    }

    //if last question - load the results
    else {
      calculateResult();
      lang == "null" ? window.location.replace("./result.html") : window.location.replace(`./result.html?lang=${lang}`);
    }
  }

  else {
    promptField.style.display = 'inline';
  }
}

function deleteAnswer() {
  answersStates.pop();
  answersCounter = answersStates[answersStates.length - 1];
}

function calculateResult() {
  //find the most chosen answer
  let answers = answersStates[answersStates.length - 1];

  finalAnswer = findHighest(answers);
  localStorage.setItem('answerExport', finalAnswer);
}


function findHighest(answers) {
  let highest = 0;
  for (let answer in answers) {
    if (answers[answer] > highest) {
      highest = answers[answer];
    }
  }

  for (let answer in answers) {
    if (answers[answer] == highest) {
      return answer;
    }
  }
}

export function getFinalAnswer() {
  return localStorage.getItem('answerExport');
}

function previousQuestion() {
  if (currQuestion > 0) {
    currQuestion--;
    loadQuestion();
    gameElements.forEach(element => { answers[element].checked = false });

    deleteAnswer();
  }
}


function loadQuestion() {
  counter.textContent = `${currQuestion + 1}/${quizContent.length}`;

  promptField.style.display = 'none';

  lang != null ? question.textContent = translateText(quizContent[currQuestion].question, lang) : question.textContent = quizContent[currQuestion].question;
  gameElements.forEach(element => {
    lang != null ? gameState[element].textContent = translateText(quizContent[currQuestion][element], lang) : gameState[element].textContent = quizContent[currQuestion][element];
  })
}


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
  promptField.textContent = translateText("Choose an answer!", lang);

  counter = document.querySelector(".counter");

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

  let count = 0;

  //log the answer
  gameElements.forEach(element => {
    answers[element].checked ? saveAnswer(element) : count++;
  });

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

function saveAnswer(element) {
  answersCounter[element]++;
  answersStates.push(answersCounter);
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

    //TO DO: delete the current answer
  }
}


function loadQuestion() {

  counter.textContent = `${currQuestion + 1}/${quizContent.length}`;

  promptField.style.display = 'none';

  question.textContent = translateText(quizContent[currQuestion].question, lang);
  gameElements.forEach(element => {
    gameState[element].textContent = translateText(quizContent[currQuestion][element], lang);
  })
}


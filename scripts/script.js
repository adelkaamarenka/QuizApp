import { translateText } from "./translate.js";
import langExport from "./translate.js";

const lang = langExport;

const quizContent = [
  {
    question: "Question 1",
    a: "answer",
    b: "answer",
    c: "answer",
    d: "answer",
  },
  {
    question: "Question 2",
    a: "answer",
    b: "answer",
    c: "answer",
    d: "answer",
  },
  {
    question: "Question 3",
    a: "answer",
    b: "answer",
    c: "answer",
    d: "answer",
  },
];

let question;
let answerA;
let answerB;
let answerC;
let answerD;

let currQuestion;

document.addEventListener("DOMContentLoaded", init);

function init() {
  question = document.querySelector(".question");
  answerA = document.querySelector(`label[for="a"]`);
  answerB = document.querySelector(`label[for="b"]`);
  answerC = document.querySelector(`label[for="c"]`);
  answerD = document.querySelector(`label[for="d"]`);

  currQuestion = 0;

  loadQuestion()

  let button = document.querySelector(".next");
  button.addEventListener("click", changeQuestion);
}

function changeQuestion() {
  currQuestion++;
  loadQuestion();
}

function loadQuestion() {
  question.textContent = translateText(quizContent[currQuestion].question, lang);
  answerA.textContent = translateText(quizContent[currQuestion].a, lang);
  answerB.textContent = translateText(quizContent[currQuestion].b, lang);
  answerC.textContent = translateText(quizContent[currQuestion].c, lang);
  answerD.textContent = translateText(quizContent[currQuestion].d, lang);
}


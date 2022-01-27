import { translateText } from "./translate.js";
import langExport from "./translate.js";
import quizContent from "./quiz-contents.js";


const lang = langExport;

/* const gameState = {
  question: "",
  answerA: "",
  answerB: "",
  answerC: "",
  answerD: "",
} */

//new code
const gameElements = ["question", "a", "b", "c", "d"];

/* const gameState = [
  { question: "" },
  { a: "" },
  { b: "" },
  { c: "" },
  { d: "" },
]; */

const gameState = {
  question: "",
  a: "",
  b: "",
  c: "",
  d: "",
}

let currQuestion;

document.addEventListener("DOMContentLoaded", init);

function init() {
  /*   gameState.question = document.querySelector(".question");
    gameState.answerA = document.querySelector(`label[for="a"]`);
    gameState.answerB = document.querySelector(`label[for="b"]`);
    gameState.answerC = document.querySelector(`label[for="c"]`);
    gameState.answerD = document.querySelector(`label[for="d"]`); */

  //new code
  gameElements.forEach(element => {
    gameState.element = document.querySelector("." + element);
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
    loadQuestion(currQuestion);
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

/* function loadQuestion() {
  gameState.question.textContent = translateText(quizContent[currQuestion].question, lang);
  gameState.answerA.textContent = translateText(quizContent[currQuestion].a, lang);
  gameState.answerB.textContent = translateText(quizContent[currQuestion].b, lang);
  gameState.answerC.textContent = translateText(quizContent[currQuestion].c, lang);
  gameState.answerD.textContent = translateText(quizContent[currQuestion].d, lang);
} */

//new code
function loadQuestion() {
  gameElements.forEach(element => {
    console.log(gameState.element);
    gameState.element.textContent = translateText(quizContent[currQuestion].element, lang);
  })
  /*      gameState.element.textContent = translateText(quizContent[currQuestion].element, lang); */
}



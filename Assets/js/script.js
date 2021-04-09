var startButton = document.querySelector("#start-button");
var timerElement = document.querySelector("#timer-count");
var quizTitle = document.querySelector("#quiz-title");
var quizContent = document.querySelector("#quiz-content");
var quizContentClass = document.querySelector(".quiz-content");
var quizAnswers = document.querySelector("#quiz-answers");
var answer1 = document.querySelector("#answer1");
var answer2 = document.querySelector("#answer2");
var answer3 = document.querySelector("#answer3");
var answer4 = document.querySelector("#answer4");
var button = document.querySelectorAll(".button");
var quizResult = document.querySelector(".quiz-result");
var userInitials = document.querySelector("#user-initials");
var submitButton = document.querySelector("#submit-button");
var form = document.querySelector("form");

var question1 = new Object();
question1.question = "Which of the following options is NOT a primitive type";
question1.answer1 = "String";
question1.answer2 = "Number";
question1.answer3 = "Boolean";
question1.answer4 = "Int";
question1.correctAnswer = 4;

var question2 = new Object();
question2.question = "Which of the following options is known as the logical OR operator";
question2.answer1 = "||";
question2.answer2 = "//";
question2.answer3 = "&&";
question2.answer4 = "!";
question2.correctAnswer = 1;

var question3 = new Object();
question3.question = "The ______ operator is often used as a shortcut for the if statement";
question3.answer1 = "While";
question3.answer2 = "Ternary";
question3.answer3 = "Switch";
question3.answer4 = "Array";
question3.correctAnswer = 2;

var question4 = new Object();
question4.question = "Multi-dimensional arrays are known as";
question4.answer1 = "Multi-variables";
question4.answer2 = "Objects";
question4.answer3 = "Matrix";
question4.answer4 = "Float";
question4.correctAnswer = 3;

var question5 = new Object();
question5.question = "The character used to access an array value is the following __";
question5.answer1 = '""';
question5.answer2 = "{}";
question5.answer3 = "[]";
question5.answer4 = "()";
question5.correctAnswer = 3;

var question6 = new Object();
question6.question = "______ is a third party library that is used to simplify javascript coding";
question6.answer1 = "Bootstrap";
question6.answer2 = "JQuery";
question6.answer3 = "Bulma";
question6.answer4 = "Foundation";
question6.correctAnswer = 2;


var timerCount = 0;
var isOver = false;
var timer;
var currentQuestion = 0;
var currentObject;
var amountofQuestions = 6;
var clickedID;
var currentAnswer;
var resultTimer;
var showResult;

function timerConditions (){
  timerCount--;
  if (timerCount < 0){
    timerCount = 0;
  }
  timerElement.textContent = "Time: " + timerCount;

  if (showResult === true){
    resultTimer++;
    if(resultTimer >= 2){
      showResult = false;
      resultTimer = 0;
      quizResult.textContent="";
    }
  }

  if(isOver || timerCount<=0){
    clearInterval(timer);
    displayScore();
  }
}

function displayScore(){
  quizTitle.textContent = "All done";
  quizContent.textContent ="Your final score is " + timerCount;
  quizAnswers.setAttribute("style", "display: none");
  quizContentClass.setAttribute("style", "display: block");
  form.setAttribute("style", "display: inline-block");
  
}

function storeScore(event){
  event.preventDefault();
  console.log(userInitials.value);
  console.log(timerCount);
}

function startTimer (){
  timer = setInterval (timerConditions,1000);
}

function displayCorrect(){
  quizResult.textContent="Correct!";
}

function displayIncorrect(){
  quizResult.textContent="Incorrect!";
 }


function renderQuestions(event){
  var chosenAnswer;
  if (clickedID == ""){
    clickedID = "0";
  }else{
    clickedID=event.target.id;
  }

  if(timerCount<60 && clickedID != null && clickedID != "quiz-answers"){
    chosenAnswer = clickedID.match(/(\d+)/);
    correctAnswer = eval(currentObject)['correctAnswer'];

    if (correctAnswer == chosenAnswer[0])
    {
      showResult = true;
      displayCorrect();
    }else{
      showResult = true;
      timerCount = timerCount - 10;
      displayIncorrect();
    }
  }

  if(currentQuestion < amountofQuestions && clickedID != "quiz-answers" && clickedID != "0"){
    currentQuestion++;
  }else if(currentQuestion >= amountofQuestions || timerCount <= 0){
    isOver=true;

  }

  currentObject = "question" + currentQuestion;
  quizTitle.textContent = eval(currentObject)['question'];
  for (var i = 1; i<=4; i++){
    currentAnswer = "answer" + i;
    eval(currentAnswer).textContent = eval(currentObject)[currentAnswer];
  }
}

function startQuiz() {
  startButton.disabled = true;
  startButton.setAttribute("style" , "display: none");
  for (var i = 0; i < button.length; i++){
    button[i].setAttribute("style" , "display: block");
  }
  quizContent.textContent = ("");

  currentQuestion = 1;
  timerCount = 60;
  isOver = false;
  clickedID = "";
  currentObject = "question" + currentQuestion;
  currentAnswer = "answer1";
  resultTimer = 0;
  showResult = false;

  startTimer();
  renderQuestions();
}


startButton.addEventListener("click", startQuiz);

quizAnswers.addEventListener("click", renderQuestions)

submitButton.addEventListener("click", storeScore);
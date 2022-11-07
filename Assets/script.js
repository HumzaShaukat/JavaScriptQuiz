var questionPrompt = document.querySelector("#question");
var answerList = document.querySelector("#answers");
var startquiz = document.querySelector("#startquiz");
var scoreBoard = document.querySelector("#score");
var clock = document.querySelector("#timer");
var highScoreForm = document.querySelector("#highscore-form");
var subBtn = document.querySelector("#submit-btn");
var hsInput = document.querySelector("#hs-input");
var backBtn = document.querySelector("#back-btn");
var clearBtn = document.querySelector("#clear-btn")
var printhsList = document.querySelector("#hslist");
var quiz = document.querySelector(".quiz");
var hsTitle = document.querySelector("#hstitle");
var sideBar = document.querySelector("#sidebar");
var viewHS = document.querySelector("#viewHS");
var answer = document.querySelector("#correct");
var savedScore = 0;
var storedHS = [];

// These are declarations of the questions that will be displayed.  In the future I could use Node.js to create a list that a user can input question, answers and the correct answer

var question1 = {
    question: "What functionality does JavaScript bring to a webpage?",
    answers: ["It stylizes the webpage.", "It adds interactivity to the webpage", "It creates the skeleton for the webpage", "It handles queries to different databases"],
    correctAns: 1
    };

var question2 = {
    question: "What is the syntax used to create a timer?",
    answers: [".setTimer()", "var x = setInterval(function(){},interval)", "setInterval(seconds,function)", "setTimer(function,time)"],
    correctAns: 1
    };

var question3 = {
    question: "Commonly used data types DO NOT include:",
    answers: ["Strings", "Booleans", "Alerts", "Numbers"],
    correctAns: 2
    };

var question4 = {
    question: "What kind of declaration can store multiple variables that can be called individually?",
    answers: ["String", "Array", "Matrix", "Object"],
    correctAns: 3
    };

var question5 = {
    question: "Which of the following is used to access a DOM?",
    answers: ["document.querySelector()", "document.getItem()", "getItem()", "fromHTML()"],
    correctAns: 0
    };

var questionList = [question1, question2, question3, question4, question5];
var timer = 60;

//The following function is called when the Start Game button is pressed. It includes the timer interval and what to do if an question is answered right/wrong

function startGame() {
    var count = 0;
    var currentQ = 0;
    var score = 0;
    sideBar.setAttribute("style", "display: flex");
    startquiz.remove();
    printQuestion(questionList[count]);
    answerList.addEventListener("click", function (event) {
        var userAnswer = event.target;
        if (userAnswer.matches("button") === true && userAnswer.getAttribute("class") == questionList[count].correctAns) {
            score += 1;
            scoreBoard.textContent = score;
            answerList.innerHTML ="";
            count++;
            answer.textContent = "Correct!"
            printQuestion(questionList[count]);
        } else {
            timer -= 10;
            answerList.innerHTML = "";
            count++;
            answer.textContent = "Incorrect!"
            printQuestion(questionList[count]);
        } 
    })
    while ((currentQ != count) && (currentQ < questionList.length)) {
        currentQ++;
        playGame(count);
    }
    var timedGame = setInterval(function(){
        timer--;
        clock.textContent = timer;
        if (timer <= 0 || count == questionList.length) {
            clearInterval(timedGame);
            questionPrompt.textContent = "Game Over! You scored " + score + " points";
            clock.textContent = "";
            scoreBoard.textContent = "";
            answerList.innerHTML = "";
            answer.textContent = "";
            highScoreForm.setAttribute("style", "display: flex");
            sideBar.setAttribute("style", "display: none");

            savedScore = score;
        }
    }, 1000, count, questionList)
}

//This function is actually a recursive function of the one included in the startGame() function that exists so that the game can properly loop through the question list
//The first instance starts the loop that allows it to complete until it runs out of questions to ask or time runs out

function playGame(count) {
    printQuestion(questionList[count]);
    answerList.addEventListener("click", function (event) {
        var userAnswer = event.target;
        if (userAnswer.matches("button") === true && userAnswer.getAttribute("class") == questionList[count].correctAns) {
            score += 1;
            scoreBoard.textContent = score;
            answerList.innerHTML ="";
            count++;
            answer.textContent = "Correct!"
            printQuestion(questionList[count]);
        } else {
            timer -= 10;
            answerList.innerHTML = "";
            count++;
            answer.textContent = "Incorrect!"
            printQuestion(questionList[count]);
        } 
        if (count == questionList.length) {
            clearInterval(timedGame);
        }
    })
}

//This function prints the question and answers

function printQuestion(questionFeed) {
    questionPrompt.textContent = questionFeed.question;
    for (var i = 0; i < questionFeed.answers.length; i++) {
        var btn = document.createElement("button");
        var answer = questionFeed.answers[i];
        btn.setAttribute("class", i);
        answerList.appendChild(btn).textContent = answer;
    }
}

//prints the list of saved highscores

function printHighScore() {
    for (var i = 0; i < storedHS.length; i++) {
        var hslist = storedHS[i];
        var item = document.createElement("li");
        item.textContent = hslist;
        printhsList.appendChild(item);
    }
}


startquiz.addEventListener("click", startGame); //start the game

subBtn.addEventListener("click", function(event){ //This triggers when the submit high score button is pressed after the quiz ends.  It prints the list of highscores
    event.preventDefault();                       //It also saves the high score input to local storage.  In the future I can use "indexOf" to create an object that sorts highscores by numeric order
    var storedList = JSON.parse(localStorage.getItem("storedList"));
    if (storedList !== null) {
        storedHS = storedList
    }
    if (hsInput.value != "") {
        var hsName = hsInput.value + " " + savedScore;
        storedHS.push(hsName);
    }
    hsInput.value = "";
    localStorage.setItem("storedList", JSON.stringify(storedHS));
    printHighScore();
    subBtn.remove();
    hsInput.remove();
    quiz.setAttribute("style", "display: none");
    hsTitle.setAttribute("style", "display: flex");

});

//This clears the local storage for saved highscores on clear button click

clearBtn.addEventListener("click", function(event){
    event.preventDefault();
    storedHS = JSON.parse(localStorage.getItem("storedList"));
    storedHS = [];
    localStorage.setItem("storedList", JSON.stringify(storedHS));
    printhsList.innerHTML = "";
    printHighScore();
});

//This reloads the quiz

backBtn.addEventListener("click", function(event){
    event.preventDefault();
    location.reload();
})

//When this button is pressed it takes the user directly to the highscores page

viewHS.addEventListener("click", function(){
    var storedList = JSON.parse(localStorage.getItem("storedList"));
    if (storedList !== null) {
        storedHS = storedList
    }
    if (hsInput.value != "") {
        var hsName = hsInput.value + " " + savedScore;
        storedHS.push(hsName);
    }
    hsInput.value = "";
    localStorage.setItem("storedList", JSON.stringify(storedHS));
    printHighScore();
    quiz.setAttribute("style", "display: none");
    highScoreForm.setAttribute("style", "display: flex");
    hsInput.remove();
    subBtn.remove();

})
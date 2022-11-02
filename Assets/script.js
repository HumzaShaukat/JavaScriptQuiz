var questionPrompt = document.querySelector("#question");
var answerList = document.querySelector("#answers");
var startquiz = document.querySelector("#startquiz");
var scoreBoard = document.querySelector("#score");
var clock = document.querySelector("#timer");

var question1 = {
    question: "What functionality does JavaScript bring to a webpage?",
    answers: ["It stylizes the webpage.", "place holder", "placeholder", "placeholder"],
    correctAns: 3
    };

var question2 = {
    question: "What is this question?",
    answers: ["who knows.", "place holder", "placeholder", "placeholder"],
    correctAns: 2
    };

var question3 = {
    question: "What functionality does JavaScript bring to a webpage?",
    answers: ["It stylizes the webpage.", "place holder", "placeholder", "placeholder"],
    correctAns: 1
    };

var question4 = {
    question: "What functionality does JavaScript bring to a webpage?",
    answers: ["It stylizes the webpage.", "place holder", "placeholder", "placeholder"],
    correctAns: 1
    };

var questionList = [question1, question2, question3, question4];

function startGame() {
    var count = 0;
    var currentQ = 0;
    var score = 0;
    var timer = 60;
    startquiz.remove();
    printQuestion(questionList[count]);
    answerList.addEventListener("click", function (event) {
        var userAnswer = event.target;
        if (userAnswer.matches("button") === true && userAnswer.getAttribute("class") == questionList[count].correctAns) {
            score += 1;
            scoreBoard.textContent = score;
            answerList.innerHTML ="";
            count++;
            printQuestion(questionList[count]);
        } else {
            timer -= 10;
            count++;
        } 
    })
    while ((currentQ != count) && (currentQ < questionList.length)) {
        currentQ++;
        playGame(count);
    }
    if (currentQ === questionList.length) {
        timer = 0;
        questionPrompt.textContent = "Game Over! You scored" + score + "points";

    }
    var timedGame = setInterval(function(){
        timer--;
        clock.textContent = timer;
        if (timer <= 0) {
            clearInterval(timedGame);
            questionPrompt.textContent = "Game Over! You scored " + score + " points";
        }
    }, 1000)
}

function playGame(count) {
    printQuestion(questionList[count]);
    answerList.addEventListener("click", function (event) {
        var userAnswer = event.target;
        if (userAnswer.matches("button") === true && userAnswer.getAttribute("class") == questionList[count].correctAns) {
            score += 1;
            scoreBoard.textContent = score;
            answerList.innerHTML ="";
            count++;
            printQuestion(questionList[count]);
        } else {
            timer -= 10;
            count++;
        } 
        if (count >= questionList.length) {
            clearInterval(timedGame);
        }
    })
}
function printQuestion(questionFeed) {
    questionPrompt.textContent = questionFeed.question;
    for (var i = 0; i < questionFeed.answers.length; i++) {
        var btn = document.createElement("button");
        var answer = questionFeed.answers[i];
        btn.setAttribute("class", i);
        answerList.appendChild(btn).textContent = answer;
    }
}



startquiz.addEventListener("click", startGame);

var game = document.querySelector(".game")
var timer = document.querySelector("#timer");
var time = 90;
var answerStart = document.querySelector(".answerStart");
var viewHighscore = document.querySelector(".viewHighscore");
var starter = document.querySelector(".starter");
var show = document.querySelector(".show");
var btnHide = document.querySelector(".btnHide")
var question = document.querySelector(".question")
var answer1 = document.querySelector(".answer1");
var answer2 = document.querySelector(".answer2");
var answer3 = document.querySelector(".answer3");
var answer4 = document.querySelector(".answer4");
var newQs = document.querySelectorAll(".newQ")
var correct = document.querySelector(".correct");
var incorrect = document.querySelector(".incorrect");
var endGame = document.querySelector(".endGame");
var hiScor = document.querySelector(".hiScor")
var finalScore = document.querySelector(".finalScore");
var clearHigh = document.getElementById("clearHigh")
var score = document.querySelector(".score")
var highScores = document.querySelector(".highScores")
var initialInput = document.querySelector(".initialInput");
var submit = document.querySelector(".submit");
var inputValue = initialInput.nodeValue;
var playButton = document.querySelector(".playButton");
var questionSet = [
    ["Q1","A1","A2","A3","A4"],
    ["Q2","A1","A2","correctAnswer","A4"],     //<-------need to add in q's and answers
    ["Q3","A1","A2","A3","A4"],
    ["Q4","A1","A2","A3","A4"],
    ["Q5","A1","A2","A3","A4"],
    ["Q6","A1","A2","A3","A4"],
];
var correctAnswerSet = ["correctAnswer", "A1"] //<--------need to enter actual answers

//  Code for Game==================================================================================

//  Gets scores from local storage, doesn't work as a function
var scoreArr = JSON.parse(localStorage.getItem("permScore"));
if(scoreArr === null){
    scoreArr = [];
}
answerStart.addEventListener("click", function startQuiz(){
    topRightTimer();
    glitchHide();
    qGenerator();
});
for(const newQ of newQs){
    newQ.addEventListener("click", function quiz(event){
        var target = event.target.textContent;
        if(questionSet.length == 0){
            if(correct.style.display ==="block" || incorrect.style.display ==="block"){
                correct.style.display = "none";
                incorrect.style.display = "none";
            }
            if(correctAnswerSet.includes(target)){
                correctAction();
            }   
            else{
                incorrectAction();
            }
            endgamePause();
        }
        else{
            if(correct.style.display ==="block" || incorrect.style.display ==="block"){
                correct.style.display = "none";
                incorrect.style.display = "none";
            }
            if(correctAnswerSet.includes(target)){
                correctAction();
            }   
            else{
               incorrectAction();
            }
            qGenerator();
        }
    }); 
};
submit.addEventListener("click", function(){
    addScore();
    generateHighscores();
    game.style.display = "none";
    hiScor.style.display = "block";
    highScores.style.display = "block"     
 });
viewHighscore.addEventListener("click",function(){
    generateHighscores();
    game.style.display = "none";
    hiScor.style.display = "block";
});
playButton.addEventListener("click", function(){
    resetVars();
    var ol = document.querySelector(".list");
    if(scoreArr.length>0){
        ol.remove();
    }
    game.style.display= "block";
    hiScor.style.display = "none";
    if(endGame.style.display = "block"){
        endGame.style.display = "none"
        starter.style.display = "block"
    } 
});
clearHigh.addEventListener("click",function(){
    if(scoreArr.length > 0){
        clearScores();
    }
});

// FUNCTIONS====================================================

//  Implements timer in the top right
function topRightTimer(){
    var interval = setInterval(function(){
        time--;
        timer.textContent = "Score/Time: "+time.toString()
        if(time === 0 || endGame.style.display==="block"){
            clearInterval(interval);
        }
    }, 1000);
};

//  hides button that causes issues
function glitchHide(){
    viewHighscore.style.display = "none"
    show.style.display = "block"
    starter.style.display = "none"
};

//  generates new question and answers
function qGenerator(){
    var i = Math.floor(Math.random()*questionSet.length);
    question.textContent = questionSet[i][0];
    answer1.textContent = questionSet[i][1];
    answer2.textContent = questionSet[i][2];
    answer3.textContent = questionSet[i][3];
    answer4.textContent = questionSet[i][4];
    questionSet.splice(i,1);
};

//  notifies if your answer was incorrect
function incorrectAction(){
    incorrect.style.display = "block";
    time = time-5;
    function response(){
        correct.style.display = "none";
        incorrect.style.display = "none";
    }
    setTimeout(response,500);  
};

//  notifies if your answer was correct
function correctAction(){
    correct.style.display = "block"; 
    function response(){
        correct.style.display = "none";
        incorrect.style.display = "none";
    }
    setTimeout(response,500);
};

//  allows for a pause between answering last question and seeing the submit screen
function endgamePause(){
    var timeOut = function(){
        btnHide.style.display = "none";
        correct.style.display = "none";
        incorrect.style.display = "none";
        endGame.style.display = "block"; 
        finalScore.textContent = "Score: " + (time-1).toString();
    }
    setTimeout(timeOut,500);  
};

//  adds score to scoreboard and local storage
function addScore(){
    scoreArr.push({name: initialInput.value, value: (time)});
    scoreArr.sort(function(a, b){
        return b.value - a.value; 
    });
    localStorage.setItem("permScore", JSON.stringify(scoreArr));
};

//  dynamically adds list of scores to html
function generateHighscores(){
    var ol = document.createElement("ol");
    ol.className = "list";
    for(var i = 0 ; i < scoreArr.length; i++){
        var li = document.createElement("li")
        li.className = scoreArr.length + i
        ol.appendChild(li);
        li.textContent = scoreArr[i].name + ", Score: " + (scoreArr[i].value)
        highScores.appendChild(ol);
    }
};

//  resets variables that get changed while playing
function resetVars(){
    time = 90
    viewHighscore.style.display = "block"
    timer.textContent = "Score/Time: "+time.toString()
    initialInput.value = ""
    questionSet = [
        ["Q1","A1","A2","A3","A4"],
    ["Q2","A1","A2","correctAnswer","A4"],
    ["Q3","A1","A2","A3","A4"],
    ["Q4","A1","A2","A3","A4"],
    ["Q5","A1","A2","A3","A4"],
    ["Q6","A1","A2","A3","A4"],
    ];
};

//  clears highscores
function clearScores(){
    if (confirm("Are you sure you want to clear all high scores?")===true){
       var ol = document.querySelector(".list")
        scoreArr = [];
        highScores.style.display = "none";
        ol.remove();
        localStorage.clear()
        
    }
};
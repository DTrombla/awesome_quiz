
var game = document.querySelector(".game")
var timer = document.querySelector("#timer");
var time = 5;
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
    ["If para1 is the DOM object for a paragraph, what is the correct syntax to change the text within the paragraph?", "'New Text'?", "para1.value='New Text';", "para1.firstChild.nodeValue= 'New Text';", "para1.nodeValue='New Text';"],
    ["JavaScript entities start with _______ and end with _________.", "Semicolon, colon", "Semicolon, Ampersand", "Ampersand, colon", "Ampersand, semicolon"],     
    ["Which of the following best describes JavaScript?", "a low-level programming language.", "a scripting language precompiled in the browser.", "a compiled scripting language.", "an object-oriented scripting language."],
    ["JavaScript is interpreted by _________", "Client", "Server", "Object", "None of the above"],
    ["Using _______ statement is how you test for a specific condition.", "Select", "If", "Switch", "For"],
    ["Which of the following are capabilities of functions in JavaScript?", "Return a value", "Accept parameters and Return a value", "Accept parameters", "None of the above"],
    ["Which of the following is not a valid JavaScript variable name?", "2names", "_first_and_last_neames", "FirstAndLast", "None of the above"],
    [" ______ tag is an extension to HTML that can enclose any number of JavaScript statements.", "<script>", "<body>", "<head>", "<title>"],
    ["Why do JavaScript and Java have similar names?", "JavaScript is a stripped-down version of Java", "JavaScript's syntax is loosely based on Java's", "They both originated on the island of Java", "None of the above"],
];
var correctAnswerSet = ["para1.value='New Text';", "Ampersand, semicolon", "an object-oriented scripting language.", "Client", "If", "Accept parameters and Return a value", "2names", "<script>", "JavaScript's syntax is loosely based on Java's"] //<--------need to enter actual answers

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
    timer.style.display = "block";
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
        if(time <= 0 || endGame.style.display==="block"){
            endgamePause();
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
    time = time-5
    timer.textContent = "Score/Time: "+(time).toString()
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
        timer.style.display = "none";
        btnHide.style.display = "none";
        correct.style.display = "none";
        incorrect.style.display = "none";
        endGame.style.display = "block"; 
        finalScore.textContent = "Score: " + (time).toString();
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
        ["If para1 is the DOM object for a paragraph, what is the correct syntax to change the text within the paragraph? (That we know of)","'New Text'?","para1.value='New Text';" ,"para1.firstChild.nodeValue= 'New Text';","para1.nodeValue='New Text';"],
        ["JavaScript entities start with _______ and end with _________.","Semicolon, colon","Semicolon, Ampersand","Ampersand, colon"," Ampersand, semicolon"],     
        ["Which of the following best describes JavaScript?","a low-level programming language.","a scripting language precompiled in the browser.","a compiled scripting language.","an object-oriented scripting language."],
        ["JavaScript is interpreted by _________","Client","Server","Object","None of the above"],
        ["Using _______ statement is how you test for a specific condition.","Select","If","Switch","For"],
        ["Which of the following are capabilities of functions in JavaScript?","Return a value","Accept parameters and Return a value","Accept parameters","None of the above"],
        ["HWhich of the following is not a valid JavaScript variable name?","2names","_first_and_last_neames","FirstAndLast","None of the above"],
        [" ______ tag is an extension to HTML that can enclose any number of JavaScript statements.","<script>","<body>","<head>","<title>"],
        ["Why do JavaScript and Java have similar names?","JavaScript is a stripped-down version of Java","JavaScript's syntax is loosely based on Java's","They both originated on the island of Java","None of the above"],
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
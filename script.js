// on quiz page we want timer in the top right and link to highschore page on the top left.
// link will be easy
// highscore page should be a seperate html page that is permanantly updated by the same java script page.
// timer can be set up using a header in html and editing text content through a interval function.
// we can make and style the various quiz elements in the middle using html and css then hide them using a siwtch event.
// when any answer is clicked we want to change the center content to a new question.
// one answer should call a function to display correct on the screen, the rest should call a function to display wrong.
// when a question in answered wrong the timer should lose 10 seconds or So
// once all questions are answered the timer shall stop and the remainder of time will be your Score
// then you can input your initials and once submit is pressed you will be taken to the highscore page where your score should be stored.
// play again button on bottom of page after qui is finished
// if timer hits 0 before quiz is over you lose.\
//random questions:
//we want when clicked we want to set the h1 of button blocj and button textContents to new questions.
//we can set up an array of question sets with the first item in each array being the question and the rest being the answers
//then use eventListener(click) to change values to a random question set.
var game = document.querySelector(".game")
var timer = document.querySelector("#timer");
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
var questionSet = [
    ["Q1","A1","A2","A3","A4"],
    ["Q2","A1","A2","correctAnswer","A4"],     //<-------need to add in q's and answers
    ["Q3","A1","A2","A3","A4"],
    ["Q4","A1","A2","A3","A4"],
    ["Q5","A1","A2","A3","A4"],
    ["Q6","A1","A2","A3","A4"],
];
var correctAnswerSet = ["correctAnswer", "A1"] //<--------need to enter actual answers
var scoreArr = JSON.parse(localStorage.getItem("permScore"));
if(scoreArr === null){
    var scoreArr = [];
}
hiScor.style.display = "none"
//Code for Starting Game
var time = 90
answerStart.addEventListener("click", function startQuiz(){
//timer
    var interval = setInterval(function(){
        time--;
        timer.textContent = "Score/Time: "+time.toString()
        if(time === 0 || endGame.style.display==="block"){
            clearInterval(interval);
       }
     }, 1000);
//hide glitch
    viewHighscore.style.display = "none"
    show.style.display = "block"
    starter.style.display = "none"
    var i = Math.floor(Math.random()*questionSet.length);
    question.textContent = questionSet[i][0];
    answer1.textContent = questionSet[i][1];
    answer2.textContent = questionSet[i][2];
    answer3.textContent = questionSet[i][3];
    answer4.textContent = questionSet[i][4];
    questionSet.splice(i,1);
    console.log(questionSet);
});

//Code for During Game==========================================================================
for(const newQ of newQs){
    newQ.addEventListener("click", function quiz(event){
        var i = Math.floor(Math.random()*questionSet.length);
        var target = event.target.textContent;
// INDICATES ENDING==================================================================================
        if(questionSet.length == 0){
            if(correct.style.display ==="block" || incorrect.style.display ==="block"){
                correct.style.display = "none";
                incorrect.style.display = "none";
            }
            if(correctAnswerSet.includes(target)){
                correct.style.display = "block";
                var response = function(){
                    correct.style.display = "none";
                    incorrect.style.display = "none";
                }
                setTimeout(response,500);  
            }   
            else{
                incorrect.style.display = "block";
                time = time-20;
                var response = function(){
                    correct.style.display = "none";
                    incorrect.style.display = "none";
                }
                setTimeout(response,500);  
            }


             var timeOut = function(){
                btnHide.style.display = "none";
                correct.style.display = "none";
                incorrect.style.display = "none";
                endGame.style.display = "block"; 
                finalScore.textContent = "Score: " + (time-1).toString();
            }
            setTimeout(timeOut,500);  
        }

// indicates game is still going==============================================================================
        else{
            if(correct.style.display ==="block" || incorrect.style.display ==="block"){
                correct.style.display = "none";
                incorrect.style.display = "none";
            }
            if(correctAnswerSet.includes(target)){
                correct.style.display = "block"; 
                var response = function(){
                    correct.style.display = "none";
                    incorrect.style.display = "none";
                }
                setTimeout(response,500);   
            }   
            else{
                incorrect.style.display = "block";
                time = time-20;
                var response = function(){
                    correct.style.display = "none";
                    incorrect.style.display = "none";
                }
                setTimeout(response,500);  
            }
            question.textContent = questionSet[i][0];
            answer1.textContent = questionSet[i][1];
            answer2.textContent = questionSet[i][2];
            answer3.textContent = questionSet[i][3];
            answer4.textContent = questionSet[i][4];
            questionSet.splice(i,1);
        }
    }); 
}
//highscore page=======================================================================================================
var score = document.querySelector(".score")
var highScores = document.querySelector(".highScores")
var initialInput = document.querySelector(".initialInput");
var submit = document.querySelector(".submit");
var inputValue = initialInput.nodeValue;
var playButton = document.querySelector(".playButton");
// view highscore button
viewHighscore.addEventListener("click",function(){
    var ol = document.createElement("ol");
    ol.className = "list";
    for(var i = 0 ; i < scoreArr.length; i++){
        var li = document.createElement("li")
        li.className = scoreArr.length + i
        ol.appendChild(li);
        li.textContent = scoreArr[i].name + ', Score: ' + (scoreArr[i].value)
        highScores.appendChild(ol)
    }
    game.style.display = "none";
    hiScor.style.display = "block";
});
// submit button

submit.addEventListener("click", function(){
    highScores.style.display = "block"
    var ol = document.createElement("ol");
    ol.className = "list"
    game.style.display = "none";
    hiScor.style.display = "block";
    scoreArr.push({name: initialInput.value, value: (time)});
    scoreArr.sort(function(a, b){
        return b.value - a.value 
    });
    localStorage.setItem("permScore", JSON.stringify(scoreArr));

    for(var i = 0 ; i < scoreArr.length; i++){
        var li = document.createElement("li")
        li.className = scoreArr.length + i
        ol.appendChild(li);
        li.textContent = scoreArr[i].name + ", Score: " + (scoreArr[i].value)
        highScores.appendChild(ol);
    }
        
 });
//  play button on endgame screen
playButton.addEventListener("click", function(){
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
//clear highscore button
clearHigh.addEventListener("click",function(){
    var ol = document.querySelector(".list")
    if(scoreArr.length > 0){
        if (confirm("Are you sure you want to clear all high scores?")===true){
            scoreArr = [];
            highScores.style.display = "none";
            ol.remove();
            localStorage.clear()
            console.log (scoreArr)
        }
    }
});


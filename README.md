# awesome_quiz

This application is a quiz. 

When the start button is pressed a random question is chosen from an array and displayed on the screen. That question is also spliced out of the array. Additionally a timer of 90 seconds begins counting down in the upper right. The remaining time will be the user's score.

When the user choses an answer a container will be displayed containing text stating if they were correct or incorrect. This text is determined by checking to see if the text content of the answer they clicked on is included in the correct answer array. 

If the user happens to select an incorrect answer, they lose 5 off their time/score. 

When the question array is empty and the user choses an answer an incorrect or correct response from the web page will be triggered and after a short delay the current content on the page will be hidden and the submit content will be shown. 

The submit content includes a header stating their score, a second header prompting them to enter their initials below, a form to enter their initials, and finally a submit button.

When the submit button is pressed the user's score is added into the score array which is then sorted by descending order and saved to local storage. Using a for loop, list elements are given the score content and appended to a div. Pressing submit also deletes this list if it exists in the doc already, this is to avoid counting scores twice. Finally submit content is hidden and the highscore content is shown. 

The highscore content includes a header saying highscores, a "clear" button to the right of the header. A list of highscores and a play button that restarts the variables and takes you to the start quiz page. pressing the clear button first triggers a confirm asking if you're sure you want to clear the highscores. if confirmed the score array is set to an empty set and the local storage is cleared.

When the play button is pressed the starter content is shown. This page includes a view highscores button that, when pressed, does the same thing as the submit button besides pushing a new value to the score array or local storage.


have fun with the quiz. https://dtrombla.github.io/awesome_quiz/


![Starting Gameplay](https://github.com/DTrombla/images/blob/main/Starter.PNG)
![During Gameplay](https://github.com/DTrombla/images/blob/main/During.PNG)
![Submit Screen](https://github.com/DTrombla/images/blob/main/Submit.PNG)
![Highscore Screen](https://github.com/DTrombla/images/blob/main/Highscore.PNG)

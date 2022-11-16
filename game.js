// create an array with color 
let buttonColors = ["red", "blue", "green", "yellow"];
// empty array that will get populated with a color sequence
let gamePattern = [];

// bind sounds to variables 
const audioRed = new Audio("sounds/red.mp3");
const audioBlue = new Audio("sounds/blue.mp3");
const audioGreen = new Audio("sounds/green.mp3");
const audioYellow = new Audio("sounds/yellow.mp3");
const wrongAnswerSound = new Audio("sounds/wrong.mp3");

// array of the user click sequence 
let userClickedPattern = [];

let isGameOn = false;
let level = 0;
// listen to the key press and launch nextSequence if it is the first key press
$(document).keydown(function () {
    if (isGameOn === false) {
        nextSequence();
        isGameOn = true;

    }
});


// create a function that chooses a random color and adds it to the color sequence 
function nextSequence() {
    userClickedPattern = []
    // increment the level by 1
    level++;
    // display the level
    $("#level-title").text(`Level ${level}`);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    // show the randomChosenColor to the user 
    // flash the button
    setTimeout(function () {
        $(`#${randomChosenColor}`).fadeOut(130).fadeIn(130);
        // play the sound 
        playSound(randomChosenColor);
    }, 300)
}

// detect when any of the buttons is clicked, play the sound and animate the click
$(".btn").click(function (event) {
    let userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    // check that the answer is correct but we only check if there there is at least something in the gamePattern 
    if (gamePattern.length > 0) {
        checkAnswer(userClickedPattern.length - 1);
    }
})

// play the sound - eval() turns a string into a variable 
function playSound(name) {
    eval(`audio${name.charAt(0).toUpperCase() + name.slice(1)}`).play();
}

// animate buttons when the user presses them 
function animatePress(currentColor) {
    // add the pressed class
    $(`#${currentColor}`).addClass("pressed");
    // remove the class after 0.15 s
    setTimeout(function () {
        $(`#${currentColor}`).removeClass("pressed");
    }, 150);
}


// function that checks the correct sequence - currentLevel is a current index 
function checkAnswer(currentLevel) {
    // check whether the element at index X in userClickedPattern is the same as element as index X in gamePattern
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        //now check if the user clicked the same amount of buttons as there are elements in the gamePattern array, if so, launch the nextSequence after a 1s. delay
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence()
            }, 1000);
        }
    } else {
        wrongAnswerSound.play();
        $("body").addClass("game-over");
        // remove the class after 0.2 s
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
        $("#level-title").text("Game Over, Press Any Key to Restart");
    }
}

function startOver() {
    gamePattern = []
    isGameOn = false;
    level = 0;
}


// ADD THE RECORD COUNTER 
// PLAY WITH CSS AND DESIGN IN GENERAL 

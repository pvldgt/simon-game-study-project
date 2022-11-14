// create an array with color 
let buttonColors = ["red", "blue", "green", "yellow"];
// empty array that will get populated with a color sequence
let gamePattern = [];

// bind sounds to variables 
const audioRed = new Audio("sounds/red.mp3");
const audioBlue = new Audio("sounds/blue.mp3");
const audioGreen = new Audio("sounds/green.mp3");
const audioYellow = new Audio("sounds/yellow.mp3");

// array of the user click sequence 
let userClickedPattern = []

// create a function that chooses a random color and adds it to the color sequence 
function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    // show the randomChosenColor to the user 
    // flash the button
    $(`#${randomChosenColor}`).fadeOut(130).fadeIn(130);
    playSound(randomChosenColor);

}

// detect when any of the buttons is clicked, play the sound and animate the click
$(".btn").click(function (event) {
    let userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
})

// play the sound - eval() turns a string into a variable 
function playSound(name) {
    eval(`audio${name.charAt(0).toUpperCase() + name.slice(1)}`).play();
}

// animate buttons when the user presses them 
function animatePress(currentColor) {
    // add the pressed class
    $(`#${currentColor}`).addClass("pressed");
    // remove the class after 0.1 s
    setTimeout(function () {
        $(`#${currentColor}`).removeClass("pressed");
    }, 150);
}
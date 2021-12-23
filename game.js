// set up the button colors
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = []; // initialize game pattern
var userClickedPattern = []; // initialize user click pattern

var started = false; // initialize game started to be false
var level = 0; // initialize the level to be zero

// when the button is pressed, set "started" to true,
//display level 0 and run nextSequence once.
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// when an user click the button, get the user chosen color.
// add that color to the array of user clicked pattern
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour); // play sound for the chosen color
  animatePress(userChosenColour); //play animation for the chosen animation

  checkAnswer(userClickedPattern.length - 1); // check if the answer is right
  // console.log(userClickedPattern);
});


// function for checking answer
function checkAnswer(currentLevel) {
  // if the game pattern matches user clicked pattern
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // console.log("success");

    // double check the length that the series of pattern matches
    if (userClickedPattern.length === gamePattern.length) {
      // run nextSequence after 1000 milliseconds.
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else { // if the answer is wrong,
    // console.log("wrong");
    playSound("wrong"); // play wrong sound
    $("body").addClass("game-over"); //add "game-over" class to body
    //remove game-over class after 200 milliseconds delay
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    // change the title
    $("#level-title").text("Game over, Press Any Key to Restart");
    startOver();
  }
}

// function for sequence to be generated by computer
function nextSequence() {
  // reset the user click pattern
  userClickedPattern = [];

  level++; // increment 1 to level for every run
  // update the level under level title
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4); // generate random number 0-3

  var randomChosenColour = buttonColours[randomNumber]; // select random color

  gamePattern.push(randomChosenColour); // add the color to the array

  // animate the flash
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour); // play sound for the chosen color

}

// function for playing sound
function playSound(name) {
  var audioName = "sounds/" + name + ".mp3"; // file name including path
  var audio = new Audio(audioName); // create audio object
  audio.play(); // play the audio object
}

// function for animation
function animatePress(currentColour) {
  // add pressed class to the current color
  $("#" + currentColour).addClass("pressed");
  // remove the current color after 100 milliseconds
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// function for start over
function startOver() {
  level = 0; // reset level to zero
  gamePattern = []; // reset game pattern array to empty
  started = false; // reset 'started' variable to false
}


// var audio = new Audio ("sounds/" + randomChosenColour + ".mp3");
// audio.play();

// switch (randomChosenColour) {
//   case "green":
//     $("#green").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
//     var greenSound = new Audio("sounds/green.mp3");
//     greenSound.play();
//     break;
//   case "blue":
//     $("#blue").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
//     var blueSound = new Audio("sounds/blue.mp3");
//     blueSound.play();
//     break;
//   case "yellow":
//     $("#yellow").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
//     var yellowSound = new Audio("sounds/yellow.mp3");
//     yellowSound.play();
//     break;
//   case "red":
//     $("#red").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
//     var redSound = new Audio("sounds/red.mp3");
//     redSound.play();
//     break;
//
//   default:
//   }

// Array and variables
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var started = false;
var level = 0;

// Start the Game
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});

// Check Which Button is Pressed
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// check answer
function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}



//  random square
function nextSequence() {
  var userClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // Show the Sequence to the User with Animations and Sounds
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

// Add Sounds to Button Clicks

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Add Animations to User Clicks
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// startover
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
  userClickedPattern=[];
}

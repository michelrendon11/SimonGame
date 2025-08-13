

var buttonsColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        gamePattern = [];
        document.querySelector("p").innerHTML = "";
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () { nextSequence(); }, 1000);
        }
      } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () { $("body").removeClass("game-over"); }, 200);
        startOver();
      }
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("level " + level);
    var randomChosenColour =  buttonsColours[Math.floor(Math.random() * 4)];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").click(function(event){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatedPress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatedPress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){ $("#" + currentColor).removeClass("pressed"); }, 100);
}

function startOver() {
    document.querySelector("p").innerHTML = gamePattern;
    level = 0;
    started = false;
  }

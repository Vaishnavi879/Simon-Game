var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;
// $("input").keypress(nextSequence);
// $("#level-title").on("keypress","level "+level);
$(document).keypress(function(){
  if(!started) {
    $("#level-title").text("level "+level);
    nextSequence();
    started=true;
  }
});

function nextSequence(){
  userClickedPattern=[];
  level=level+1;
  $("#level-title").text("level "+level);
  var randomNumber=Math.floor(Math.random()*3);
  //console.log(randomNumber);
  var randomChosenColour=buttonColours[randomNumber];
  //console.log(randomChosenColour);
  gamePattern.push(randomChosenColour);
  //console.log(gamePattern);
  //console.log($("#"+randomChosenColour));
  $("#"+randomChosenColour).animate({opacity: 0},"fast");
  setTimeout( function(){
    $("#"+randomChosenColour).animate({opacity: 1},"fast");
  },25);

  playSound(randomChosenColour);
}


$(".btn").click(function(event) {
  var userChosenColour=event.target.id;
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  var lastIndex=userClickedPattern.lastIndexOf(userChosenColour);
  checkAnswer(lastIndex);

});


// function playSound(name) {
//   switch(name) {
//     case "green": var green=new Audio("sounds/green.mp3");
//                   green.play();
//                   break;
//     case "red": var red=new Audio("sounds/red.mp3");
//                   red.play();
//                   break;
//     case "blue": var blue=new Audio("sounds/blue.mp3");
//                   blue.play();
//                   break;
//     case "yellow": var yellow=new Audio("sounds/yellow.mp3");
//                   yellow.play();
//                   break;
//     default: var wrong=new Audio("sounds/wrong.mp3");
//                   wrong.play();
//                   break;
//   }
// }

function playSound(name) {
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");
  setTimeout(function () {
    $("#"+currentColour).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel]==gamePattern[currentLevel]) {
    if(userClickedPattern.length==gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      },1000);
  }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
}

function startOver() {
  level=0;
  gamePattern=[];
  started=false;
}

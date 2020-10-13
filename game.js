// alert("hello")

var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").html("Level "+level);

    var randNum = Math.random() * 3;
    // alert(randNum);
    randNum = Math.round(randNum);

    var randomChosenColor = buttonColors[randNum];

    setTimeout(function(){

        animatePress(randomChosenColor);
        playSound(randomChosenColor);
    
        gamePattern.push(randomChosenColor);
        console.log("Comp: "+ gamePattern);

    }, 1500);

}

$(".btn").click(function(event){

    if(userClickedPattern == null){
        userClickedPattern = [];
    }

    var userChosenColor = event.target.id;

    userClickedPattern.push(userChosenColor);

    console.log("user: "+ userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    // console.log(userClickedPattern+" beforeif "+ gamePattern);

    if(userClickedPattern.length === gamePattern.length){

    var len = gamePattern.length;
        
    var count = 0;
    var choice = true;

    while((count < len))
    {
        console.log(userClickedPattern[count]+" and "+ gamePattern[count]);

        if (userClickedPattern[count] != gamePattern[count]){
            choice = false;
            $("body").css("background-color", "red");
            // $("h1").html("Game Over<br>Please Refresh the Page");

            setTimeout(function(){
                $("body").css("background-color", "#011F3F"); 
            }, 250); 

            playSound("wrong");
            startOver();
                
        }

        count++;
    }

    if(choice === true){
        nextSequence();
    }
    // else{
    //     alert("ERRROR");
    // }
        

    }

});

$(document).keydown(function(){
    if (!started){
        nextSequence();

        started = true;
    }
});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){ $("#"+currentColor).removeClass("pressed"); }, 250);
}

function startOver(){
    gamePattern=[];
    level = 0;
    userClickedPattern = [];
    started = false;
    $("h1").html("Press A Key to Start")

}

let key = null;

const rightBtn = document.getElementById("right");
const leftBtn = document.getElementById("left");
const upBtn = document.getElementById("up");
const downBtn = document.getElementById("down");
const mute_unmute_btn = document.getElementById("mute-unmute-btn");


function moveR() {
  if(key !== "LEFT" && key !== "RIGHT") {
    key = "RIGHT";
    turnSound.play();
    if(game.state === "STOP") {
      snake.setPosition(-10, 0);
      game.start();
    }
  }
}
function moveL() {
  if(key !== "LEFT" && key !== "RIGHT") {
    key = "LEFT";
    turnSound.play();
    if(game.state === "STOP") {
      snake.setPosition(-10, 0);
      game.start();
    }
  }
}
function moveU() {
  if(key !== "UP" && key !== "DOWN") {
    key = "UP";
    turnSound.play();
    if(game.state === "STOP") {
      snake.setPosition(0, -10);
      game.start();
    }
  }
}
function moveD() {
  if(key !== "UP" && key !== "DOWN") {
    key = "DOWN";
    turnSound.play();
    if(game.state === "STOP") {
      snake.setPosition(0, -10);
      game.start();
    }
  }
}

function keyboardInput(event) {
  if(event.keyCode === 37)
    moveL();
  else if(event.keyCode === 38)
    moveU();
  else if(event.keyCode === 39)
    moveR();
  else if(event.keyCode === 40)
    moveD();
  else if(event.keyCode === 32)
    mute_unmute();
}


if(snake.length <= 0)
	console.error("length cannot be less than 1");
else {
	
	// Event listeners
	rightBtn.addEventListener("touchstart", moveR);
	leftBtn.addEventListener("touchstart", moveL);
	upBtn.addEventListener("touchstart", moveU);
	downBtn.addEventListener("touchstart", moveD);
  
	// for keyboard
	document.addEventListener("keydown", keyboardInput);
  
	// Sound events
	mute_unmute_btn.addEventListener("touchstart", () => {
  	if(game.sound.state === "MUTE")
    	game.sound.unmute();
  	else
    	game.sound.mute();
	});
}


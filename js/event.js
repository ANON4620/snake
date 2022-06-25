let key = null;

const rightBtn = document.getElementById("right");
const leftBtn = document.getElementById("left");
const upBtn = document.getElementById("up");
const downBtn = document.getElementById("down");
const mute_unmute_btn = document.getElementById("mute-unmute-btn");

function mute_unmute() {
  if(game.sound.state === "MUTE") {
    game.sound.unmute();
  }
  else {
    game.sound.mute();
  }
}

function keyboardInput(event) {
  if(event.keyCode === 37 && (key !== "LEFT" && key !== "RIGHT")) {
    key = "LEFT";
  }
  else if(event.keyCode === 38 && (key !== "UP" && key !== "DOWN")) {
    key = "UP";
  }
  else if(event.keyCode === 39 && (key !== "LEFT" && key !== "RIGHT")) {
    key = "RIGHT";
  }
  else if(event.keyCode === 40 && (key !== "UP" && key !== "DOWN")) {
    key = "DOWN";
  }
  else if(event.keyCode === 32) {
    mute_unmute();
  }

  turnSound.play();
  if(game.state === "STOP") {
    game.start();
  }
}

function touchInput() {
  if(this.id === "right" && (key !== "LEFT" && key !== "RIGHT")) {
    key = "RIGHT";
  }
  else if(this.id === "left" && (key !== "LEFT" && key !== "RIGHT")) {
    key = "LEFT";
  }
  else if(this.id === "up" && (key !== "UP" && key !== "DOWN")) {
    key = "UP";
  }
  else if(this.id === "down" && (key !== "UP" && key !== "DOWN")) {
    key = "DOWN";
  }

  turnSound.play();
  if(game.state === "STOP") {
    game.start();
  }
}

if(snake.length <= 0) {
	console.error("length cannot be less than 1");
}
else {
  // Keyboard listener
  document.addEventListener("keydown", keyboardInput);

	// Touch listeners
	rightBtn.addEventListener("touchstart", touchInput);
	leftBtn.addEventListener("touchstart", touchInput);
	upBtn.addEventListener("touchstart", touchInput);
	downBtn.addEventListener("touchstart", touchInput);
	mute_unmute_btn.addEventListener("touchstart", mute_unmute);
}


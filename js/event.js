let key = null;
let keyBuffer = [];

const rightBtn = document.getElementById("right");
const leftBtn = document.getElementById("left");
const upBtn = document.getElementById("up");
const downBtn = document.getElementById("down");

function mute_unmute() {
  if(game.sound.state === "MUTE") {
    game.sound.unmute();
  }
  else {
    game.sound.mute();
  }
}

function touchInput() {
  const temp = (this.id).toUpperCase();
  const lastKey = keyBuffer[keyBuffer.length - 1];
  
  if((temp !== lastKey) && ((temp === "RIGHT" && key !== "LEFT") || (temp === "LEFT" && key !== "RIGHT") || (temp === "UP" && key !== "DOWN") || (temp === "DOWN" && key !== "UP"))) {
      keyBuffer.push(temp);
  }
  
  turnSound.pause();
  turnSound.currentTime = 0;
  turnSound.play();
  if(game.state === "STOP") {
    game.start();
  }
}

if(snake.length <= 0) {
	console.error("length cannot be less than 1");
}
else {
  // Touch listeners
  rightBtn.addEventListener("touchstart", touchInput);
  leftBtn.addEventListener("touchstart", touchInput);
  upBtn.addEventListener("touchstart", touchInput);
  downBtn.addEventListener("touchstart", touchInput);
  mute_btn.addEventListener("touchstart", mute_unmute);
  unmute_btn.addEventListener("touchstart", mute_unmute);
	
  // Unmute sound
  game.sound.unmute();
}


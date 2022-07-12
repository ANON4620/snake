let key = null
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

function keyboardInput(event) {
  const lastKey = keyBuffer[keyBuffer.length - 1];
  
  if(event.keyCode === 37 && lastKey !== "RIGHT" && lastKey !== "LEFT") {
    keyBuffer.push("LEFT");
    if(game.state === "STOP") {
      game.start();
    }
  }
  else if(event.keyCode === 38 && lastKey !== "DOWN" && lastKey !== "UP") {
    keyBuffer.push("UP");
    if(game.state === "STOP") {
      game.start();
    }
  }
  else if(event.keyCode === 39 && lastKey !== "LEFT" && lastKey !== "RIGHT") {
    keyBuffer.push("RIGHT");
    if(game.state === "STOP") {
      game.start();
    }
  }
  else if(event.keyCode === 40 && lastKey !== "UP" && lastKey !== "DOWN") {
    keyBuffer.push("DOWN");
    if(game.state === "STOP") {
      game.start();
    }
  }
  else if(event.keyCode === 32) {
    mute_unmute();
  }
  
  turnSound.pause();
  turnSound.currentTime = 0;
  turnSound.play();
}

function touchInput() {
  const temp = (this.id).toUpperCase();
  const lastKey = keyBuffer[keyBuffer.length - 1];
  
  if((temp !== lastKey) && ((temp === "RIGHT" && lastKey !== "LEFT") || (temp === "LEFT" && lastKey !== "RIGHT") || (temp === "UP" && lastKey !== "DOWN") || (temp === "DOWN" && lastKey !== "UP"))) {
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
  // Keyboard listener
  //document.addEventListener("keydown", keyboardInput);
  
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



let key = null;
let keyBuffer = [];
let canTouch = true;

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
  if(canTouch === false)
    return;
  canTouch = false;

  const temp = this.id; // id of the button that is touched
  const lastkey = keyBuffer[keyBuffer.length - 1];
  
  if((temp !== lastkey && temp !== key) && ((temp === "right" && lastkey !== "left" && key !== "left") || (temp === "left" && lastkey !== "right" && key !== "right") || (temp === "up" && lastkey !== "down" && key !== "down") || (temp === "down" && lastkey !== "up" && key !== "up"))) {
    keyBuffer.push(temp);
    
    turnSound.pause();
    turnSound.currentTime = 0;
    turnSound.play();
  }
  
  if(game.state === "STOP") {
    game.start();
  }
}

if((init_len < 2) || (snake.length < 2)) {
  console.error("snake length cannot be less than 2");
}
else if(snake.box < 1) {
  console.error("snake.box cannot be less than 1");
}
else {
  canvas.width = game.screen.setWidth() - (snake.box * 2);
  canvas.height = game.screen.setHeight();

  // Touch listeners
  rightBtn.addEventListener("touchstart", touchInput);
  leftBtn.addEventListener("touchstart", touchInput);
  upBtn.addEventListener("touchstart", touchInput);
  downBtn.addEventListener("touchstart", touchInput);
  mute_btn.addEventListener("touchstart", mute_unmute);
  unmute_btn.addEventListener("touchstart", mute_unmute);

  rightBtn.addEventListener("touchend", () => {canTouch = true;});
  leftBtn.addEventListener("touchend", () => {canTouch = true;});
  upBtn.addEventListener("touchend", () => {canTouch = true;});
  downBtn.addEventListener("touchend", () => {canTouch = true;});

  // Unmute sound
  game.sound.unmute();
}


let key = null;
let x = null, y = null; // For snake object

const rightBtn = document.getElementById('right');
const leftBtn = document.getElementById('left');
const upBtn = document.getElementById('up');
const downBtn = document.getElementById('down');

const mute_unmute_btn = document.getElementById('mute_unmute_btn');

// Functions
function moveR() {
  if(key !== 'LEFT' && key !== 'RIGHT') {
    key = 'RIGHT';
    turnSound.play();
    if(Game.state === 'START') {
      x = 0;
      y = 0;
      createObjects();
      Game.state = 'RUNNING';
      snake.setPosition();
      snake.move();
    }
  }
}
function moveL() {
  if(key !== 'LEFT' && key !== 'RIGHT') {
    key = 'LEFT';
    turnSound.play();
    if(Game.state === 'START') {
      x = canvas.width - 10;
      y = 0;
      createObjects();
      Game.state = 'RUNNING';
      snake.setPosition();
      snake.move();
    }
  }
}
function moveU() {
  if(key !== 'UP' && key !== 'DOWN') {
    key = 'UP';
    turnSound.play();
    if(Game.state === 'START') {
      x = canvas.width - 10;
      y = canvas.height - 10;
      createObjects();
      Game.state = 'RUNNING';
      snake.setPosition();
      snake.move();
    }
  }
}
function moveD() {
  if(key !== 'UP' && key !== 'DOWN') {
    key = 'DOWN';
    turnSound.play();
    if(Game.state === 'START') {
      x = 0;
      y = 0;
      createObjects();
      Game.state = 'RUNNING';
      snake.setPosition();
      snake.move();
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

// Event listeners
function addAllEventListeners() {
  rightBtn.addEventListener('tap', moveR);
  leftBtn.addEventListener('tap', moveL);
  upBtn.addEventListener('tap', moveU);
  downBtn.addEventListener('tap', moveD);
  
  // for keyboard
  document.addEventListener('keydown', keyboardInput);
}

function removeAllEventListeners() {
  rightBtn.removeEventListener('tap', moveR);
  leftBtn.removeEventListener('tap', moveL);
  upBtn.removeEventListener('tap', moveU);
  downBtn.removeEventListener('tap', moveD);
  
  // for keyboard
  document.removeEventListener('keydown', keyboardInput);
}


// Sound events
function mute_unmute() {
  if(Game.sound.state === 'MUTE')
    Game.sound.unmute();
  else
    Game.sound.mute();
}

mute_unmute_btn.addEventListener('click', mute_unmute);

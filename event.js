let state = 'START';
let key = null;

const rightBtn = document.getElementById('right');
const leftBtn = document.getElementById('left');
const upBtn = document.getElementById('up');
const downBtn = document.getElementById('down');

// Functions
function moveR() {
  if(key !== 'LEFT' && key !== 'RIGHT') {
    key = 'RIGHT';
    turnSound.play();
    if(state === 'START') {
      state = 'RUNNING';
      snake.setInitialPositions();
      snake.move();
    }
  }
}
function moveL() {
  if(key !== 'LEFT' && key !== 'RIGHT' && state !== 'START') {
    key = 'LEFT';
    turnSound.play();
  }
}
function moveU() {
  if(key !== 'UP' && key !== 'DOWN' && state !== 'START') {
    key = 'UP';
    turnSound.play();
  }
}
function moveD() {
  if(key !== 'UP' && key !== 'DOWN') {
    key = 'DOWN';
    turnSound.play();
    if(state === 'START') {
      state = 'RUNNING';
      snake.setInitialPositions();
      snake.move();
    }
  }
}

function direction(event) {
  if(event.keyCode === 37)
    moveL();
  else if(event.keyCode === 38)
    moveU();
  else if(event.keyCode === 39)
    moveR();
  else if(event.keyCode === 40)
    moveD();
}

// Event listeners
function addAllEventListeners() {
  rightBtn.addEventListener('tap', moveR);
  leftBtn.addEventListener('tap', moveL);
  upBtn.addEventListener('tap', moveU);
  downBtn.addEventListener('tap', moveD);
  
  // for keyboard
  document.addEventListener('keydown', direction);
}

function removeAllEventListeners() {
  rightBtn.removeEventListener('tap', moveR);
  leftBtn.removeEventListener('tap', moveL);
  upBtn.removeEventListener('tap', moveU);
  downBtn.removeEventListener('tap', moveD);
  
  // for keyboard
  document.removeEventListener('keydown', direction);
}

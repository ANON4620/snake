let key = null;
let snake, food;

// for snake object
let x = null, y = null;
const box = 10, length = 3;

const rightBtn = document.getElementById('right');
const leftBtn = document.getElementById('left');
const upBtn = document.getElementById('up');
const downBtn = document.getElementById('down');
const mute_unmute_btn = document.getElementById('mute_unmute_btn');

// Functions

function createObjects() {
	snake = new Snake(x, y, box, length);
	food = new Food();
}

function moveR() {
  if(key !== 'LEFT' && key !== 'RIGHT') {
    key = 'RIGHT';
    turnSound.play();
    if(game.state === 'START') {
      x = 0;
      y = 0;
      createObjects();
      game.state = 'RUNNING';
    }
  }
}
function moveL() {
  if(key !== 'LEFT' && key !== 'RIGHT') {
    key = 'LEFT';
    turnSound.play();
    if(game.state === 'START') {
      x = canvas.width - box;
      y = 0;
      createObjects();
      game.state = 'RUNNING';
    }
  }
}
function moveU() {
  if(key !== 'UP' && key !== 'DOWN') {
    key = 'UP';
    turnSound.play();
    if(game.state === 'START') {
      x = canvas.width - box;
      y = canvas.height - box;
      createObjects();
      game.state = 'RUNNING';
    }
  }
}
function moveD() {
  if(key !== 'UP' && key !== 'DOWN') {
    key = 'DOWN';
    turnSound.play();
    if(game.state === 'START') {
      x = 0;
      y = 0;
      createObjects();
      game.state = 'RUNNING';
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
rightBtn.addEventListener('click', moveR);
leftBtn.addEventListener('click', moveL);
upBtn.addEventListener('click', moveU);
downBtn.addEventListener('click', moveD);
  
// for keyboard
document.addEventListener('keydown', keyboardInput);
  
// Sound events
mute_unmute_btn.addEventListener('click', () => {
  if(game.sound.state === 'MUTE')
    game.sound.unmute();
  else
    game.sound.mute();
});

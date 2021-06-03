/*
LIBRARIES:
Tap.js - https://github.com/pukhalski/tap

SOUNDS:
https://mixkit.co/free-sound-effects/game/

*/

// Loading body
document.querySelector('center').innerHTML = 
`<div class="container">
  <canvas id="canvas" width="200" height="200" style="border: 1px solid black"></canvas>
  <p id="score">SCORE: 0</p>
  <h1>SNAKE</h1>
  
  <button id="up">Up</button><br>
  <button id="left">Left</button>
  <button id="down">Down</button>
  <button id="right">Right</button>
    
  <h6>Press Right or Down to Start</h6>
    
  <b>CREDITS:</b><br>
  <b>Swarnadeep Sarkar</b>
  <b>(ANON4620)</b>
</div>`;

// Variables
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const rightBtn = document.getElementById('right');
const leftBtn = document.getElementById('left');
const upBtn = document.getElementById('up');
const downBtn = document.getElementById('down');
const score = document.getElementById('score');

const delayPerFrame = 150;
let state = 'START';
let key = null;

let snake, food;

// Functions
function createObjects() {
  snake = new Snake(0, 0, 10, 1);
  food = new Food();
}

function moveR() {
  if(key !== 'LEFT' && key !== 'RIGHT') {
    key = 'RIGHT';
    turnSound.play();
    if(state === 'START') {
      state = 'RUNNING';
      snake.setPositionsIntially();
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
      snake.setPositionsIntially();
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


// Classes and Objects
const Game = {
  score: 0,
  
  updateScore() {
    this.score++;
    score.innerText = `SCORE: ${this.score}`;
  },
  
  over() {
    gameOverSound.play();
    setTimeout(() => {
      alert('Game Over!');
      removeAllEventListeners();
      state = 'STOP';
      const tryAgain = confirm('Would you like to try again?');
      if(tryAgain)
        Game.reset();
        
    }, 2000);
  },
    
  reset() {
    this.clearCanvas();
    state = 'START';
    key = null;
    this.score = 0;
    score.innerText = `SCORE: ${this.score}`;
    createObjects();
    addAllEventListeners();
  },
  
  clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

class Snake {
  constructor(x, y, box, length) {
    this.box = box;
    this.snake = [{ x: x, y: y }];
    this.length = length;
    this.step = 10;
    
  }
  
  draw() {
    for(let i = 0; i < this.length; i++) {
      ctx.fillStyle = (i === 0) ? 'Purple' : 'Black';
      ctx.fillRect(this.snake[i].x, this.snake[i].y, this.box, this.box);
    }
  }
  
  setPositions() {
    for(let i = this.length - 1; i > 0; i--) {
      this.snake[i].x = this.snake[i - 1].x;
      this.snake[i].y = this.snake[i - 1].y;
    }
  }
  
  setPositionsIntially() {
    for(let i = 1; i < this.length; i++) {
      this.snake.push({
        x: snake.snake[i - 1].x - 10,
        y: snake.snake[i - 1].y
      });
    }
  }
  
  touchedBorder() {
    if(this.snake[0].x > canvas.width - 10 ||
      this.snake[0].y > canvas.height - 10 ||
      this.snake[0].x < 0 ||
      this.snake[0].y < 0) {
      return true;
    }
    else
      return false;
  }
  
  hasCollided() {
    for(let i = 1; i < this.length; i++) {
      if(this.snake[0].x === this.snake[i].x && this.snake[0].y === this.snake[i].y)
        return true;
    }
  }
  
  move() {
    const move = setInterval(() => {
      Game.clearCanvas();
      food.draw();
      
      this.draw();
      
      if(food.hasEaten()) {
        eatingSound.play();
        food.changePosition();
        this.length++;
        for(let i = this.length - 1; i > 0; i--) {
          this.snake.push({
            x: snake.snake[i - 1].x,
            y: snake.snake[i - 1].y
          });
        }
        Game.updateScore();
      }
      
      this.setPositions();
      
      switch(key) {
        case 'RIGHT':
          this.snake[0].x += this.step;
          break;
          
        case 'LEFT':
          this.snake[0].x -= this.step;
          break;
          
        case 'UP':
          this.snake[0].y -= this.step;
          break;
          
        case 'DOWN':
          this.snake[0].y += this.step;
          break;
      }
      
      if(this.touchedBorder()) {
        if(this.snake[0].x < 0)
          this.snake[0].x = canvas.width - 10;
        else if(this.snake[0].y < 0)
          this.snake[0].y = canvas.height - 10;
        else if(this.snake[0].x > canvas.width - 10)
          this.snake[0].x = 0;
        else if(this.snake[0].y > canvas.height - 10)
          this.snake[0].y = 0;
      }
      
      if(this.hasCollided()) {
        clearInterval(move);
        Game.over();
      }
      
    }, delayPerFrame); // setInterval
  } // draw()
} // Class

class Food {
  constructor() {
    this.box = snake.box;
    this.x;
    this.y;
    this.changePosition();
  }
  
  draw() {
    ctx.fillStyle = 'Red';
    ctx.fillRect(this.x, this.y, this.box, this.box);
  }
  
  changePosition() {
    this.x = parseInt(((Math.random() * (canvas.width - 10)) + 1) / 10) * 10;
    this.y = parseInt(((Math.random() * (canvas.height - 10)) + 1) / 10) * 10;
  }
  
  hasEaten() {
    if(snake.snake[0].x === food.x && snake.snake[0].y === food.y) 
      return true; 
    else 
      return false;
  }
  
}


createObjects();
addAllEventListeners();

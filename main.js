/*
LIBRARIES:
Tap.js - https://github.com/pukhalski/tap

SOUNDS:
https://mixkit.co/free-sound-effects/game/

*/

// importing assets
const gameOverSound = new Audio('./Assets/game-over.wav');
const turnSound = new Audio('./Assets/turn.wav');
const eatingSound = new Audio('./Assets/eating.wav');

// Variables
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const rightBtn = document.getElementById('right');
const leftBtn = document.getElementById('left');
const upBtn = document.getElementById('up');
const downBtn = document.getElementById('down');
const score = document.getElementById('score');

const intervalPerFrame = 150;
let state = 'START';
let key = null;

let snake, food;

// Functions
function createObjects() {
  snake = new Snake(0, 0, 10, 10);
  food = new Food(10, 10);
}

function moveR() {
  if(key !== 'LEFT' && key !== 'RIGHT') {
    key = 'RIGHT';
    turnSound.play();
    if(state === 'START') {
      state = 'RUNNING';
      snake.draw();
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
      snake.draw();
    }
  }
}

function direction() {
  (event) => {
    if(event.keyCode === 37)
      moveL();
    else if(event.keyCode === 38)
      moveU();
    else if(event.keyCode === 39)
      moveR();
    else if(event.keyCode === 40)
      moveD();
  }
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
  
  reset() {
    state = 'START';
    key = null;
    createObjects();
    addAllEventListeners();
    this.score = 0;
    score.innerText = 'SCORE: 0';
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
    
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 2000);
  }
}

class Snake {
  constructor(x, y, width, height) {
    this.width = width;
    this.height = height;
    this.snake = [{ x: x, y: y }];
    this.length = 1;
    this.differenceBetweenEachMove = 10;
    
  }
  
  touchedBorder() {
    if(this.snake[0].x >= canvas.width + 10 ||
      this.snake[0].y >= canvas.height + 10 ||
      this.snake[0].x <= -20 ||
      this.snake[0].y <= -20) {
      return true;
    }
    else
      return false;
  }
  
  touchedTail() {
    for(let i = 2; i < this.length; i++) {
      if(this.snake[1].x === this.snake[i].x && this.snake[1].y === this.snake[i].y)
        return true;
    }
  }
  
  draw() {
    const move = setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      food.draw();
      for(let i = 0; i < this.length; i++) {
      ctx.fillStyle = (i === 0) ? 'Purple': 'Black';
      ctx.fillRect(this.snake[i].x, this.snake[i].y, this.width, this.height);
      }
      
      if(food.hasEaten()) {
        eatingSound.play();
        food.changePosition();
        this.length++;
        for(let i = this.length - 1; i >= 1; i--) {
          this.snake.push({
            x: snake.snake[i - 1].x,
            y: snake.snake[i - 1].y
          });
        }
        Game.updateScore();
      }
      
      for(let i = this.length - 1; i >= 1; i--) {
        this.snake[i].x = this.snake[i - 1].x;
        this.snake[i].y = this.snake[i - 1].y;
      }
      
      switch(key) {
        case 'RIGHT':
          this.snake[0].x += this.differenceBetweenEachMove;
          break;
          
        case 'LEFT':
          this.snake[0].x -= this.differenceBetweenEachMove;
          break;
          
        case 'UP':
          this.snake[0].y -= this.differenceBetweenEachMove;
          break;
          
        case 'DOWN':
          this.snake[0].y += this.differenceBetweenEachMove;
          break;
      }
      
      if(this.touchedBorder() || this.touchedTail()) {
        clearInterval(move);
        Game.over();
      }
      
    }, intervalPerFrame); // setInterval
  } // draw()
} // Class

class Food {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.x;
    this.y;
    this.changePosition();
  }
  
  draw() {
    ctx.fillStyle = 'Red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  
  changePosition() {
    this.x = parseInt(((Math.random() * 190) + 1) / 10) * 10;
    this.y = parseInt(((Math.random() * 190) + 1) / 10) * 10;
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

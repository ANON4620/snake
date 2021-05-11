/*
LIBRARIES:
Tap.js - https://github.com/pukhalski/tap
*/

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const rightBtn = document.getElementById('right');
const leftBtn = document.getElementById('left');
const upBtn = document.getElementById('up');
const downBtn = document.getElementById('down');

const intervalPerFrame = 150;
let state = 'START';
let key;


function removeAllEventListeners() {
  rightBtn.removeEventListener('tap', moveR);
  leftBtn.removeEventListener('tap', moveL);
  upBtn.removeEventListener('tap', moveU);
  downBtn.removeEventListener('tap', moveD);
}

class Snake {
  constructor(x, y, width, height) {
    this.width = width;
    this.height = height;
    this.snake = [{ x: x, y: y }];
    this.length = 1;
    this.differenceBetweenEachMove = 10;
    
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
        food.changePosition();
        this.length++;
        for(let i = this.length - 1; i >= 1; i--) {
          this.snake.push({
            x: snake.snake[i - 1].x,
            y: snake.snake[i - 1].y
          });
        }
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
      
      if(this.snake[0].x >= canvas.width + 10 ||
         this.snake[0].y >= canvas.height + 10 ||
         this.snake[0].x <= -20 ||
         this.snake[0].y <= -20) {
        clearInterval(move);
        alert('Game Over!');
        removeAllEventListeners();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }, intervalPerFrame);
  }
}

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
    this.x = parseInt(((Math.random() * 200) + 1) / 10) * 10;
    this.y = parseInt(((Math.random() * 200) + 1) / 10) * 10;
  }
  
  hasEaten() {
    if(snake.snake[0].x === food.x && snake.snake[0].y === food.y) 
      return true; 
    else 
      return false;
  }
}

const snake = new Snake(0, 0, 10, 10);
const food = new Food(10, 10);

function moveR() {
  if(key !== 'LEFT' && key !== 'RIGHT') {
    key = 'RIGHT';
    if(state === 'START') {
      state = 'STOP';
      snake.draw();
    }
  }
}
function moveL() {
  if(key !== 'LEFT' && key !== 'RIGHT') {
    key = 'LEFT';
  }
}
function moveU() {
  if(key !== 'UP' && key !== 'DOWN') {
    key = 'UP';
  }
}
function moveD() {
  if(key !== 'UP' && key !== 'DOWN') {
    key = 'DOWN';
    if(state === 'START') {
      state = 'STOP';
      snake.draw();
    }
  }
}

rightBtn.addEventListener('tap', moveR);
leftBtn.addEventListener('tap', moveL);
upBtn.addEventListener('tap', moveU);
downBtn.addEventListener('tap', moveD);



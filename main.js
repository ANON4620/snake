const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const rightBtn = document.getElementById('right');
const leftBtn = document.getElementById('left');
const upBtn = document.getElementById('up');
const downBtn = document.getElementById('down');

const intervalPerFrame = 300;
let state = 'START';
let key;


function removeAllEventListeners() {
  rightBtn.removeEventListener('click', moveR);
  leftBtn.removeEventListener('click', moveL);
  upBtn.removeEventListener('click', moveU);
  downBtn.removeEventListener('click', moveD);
}

class Snake {
  constructor(x, y, width, height) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.differenceBetweenEachMove = 10;
  }
  
  draw() {
    const move = setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      food.draw();
      ctx.fillStyle = 'Black';
      ctx.fillRect(this.x, this.y, this.width, this.height);
      
      switch(key) {
        case 'RIGHT':
          this.x += this.differenceBetweenEachMove;
          break;
          
        case 'LEFT':
          this.x -= this.differenceBetweenEachMove;
          break;
          
        case 'UP':
          this.y -= this.differenceBetweenEachMove;
          break;
          
        case 'DOWN':
          this.y += this.differenceBetweenEachMove;
          break;
      }
      
      if(food.hasEaten())
        food.changePosition();
      
      if(this.x >= canvas.width + 10 ||
         this.y >= canvas.height + 10 ||
         this.x <= -20 ||
         this.y <= -20) {
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
    if(snake.x === food.x && snake.y === food.y) {
      return true;
    }
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

rightBtn.addEventListener('click', moveR);
leftBtn.addEventListener('click', moveL);
upBtn.addEventListener('click', moveU);
downBtn.addEventListener('click', moveD);



const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

const rightBtn = document.getElementById('right');
const leftBtn = document.getElementById('left');
const upBtn = document.getElementById('up');
const downBtn = document.getElementById('down');

let key;

function removeAllEventListeners() {
  rightBtn.removeEventListener('click', moveR);
  leftBtn.removeEventListener('click', moveL);
  upBtn.removeEventListener('click', moveU);
  downBtn.removeEventListener('click', moveD);
}

class Snake {
  constructor() {
    this.height = 10;
    this.width = 10;
    this.x = 0;
    this.y = 0;
  }
  
  moveR() {
    key = 'Right';
    const move = setInterval(() => {
      ctx.fillRect(this.x, this.y, snake.width, snake.height);
      ctx.fillRect(this.x + 10, this.y, snake.width, snake.height);
      ctx.clearRect(this.x - 10, this.y, snake.width, snake.height);
      
      this.x += 10;
      
      if(this.x >= canvas.width) {
        clearInterval(move);
        alert('Game Over!');
        removeAllEventListeners();
      }
      if(key !== 'Right') {
        clearInterval(move);
        ctx.clearRect(this.x - 10, this.y, snake.width, snake.height);
      }
    }, 100);
  }
  
  moveL() {
    key = 'Left';
    const move = setInterval(() => {
      ctx.fillRect(this.x, this.y, snake.width, snake.height);
      ctx.fillRect(this.x - 10, this.y, snake.width, snake.height);
      ctx.clearRect(this.x + 10, this.y, snake.width, snake.height);
    
      this.x -= 10;
      
      if(this.x <= -10) {
        clearInterval(move);
        alert('Game Over!');
        removeAllEventListeners();
      }
      if(key !== 'Left') {
        clearInterval(move);
        ctx.clearRect(this.x + 10, this.y, snake.width, snake.height);
      }
    }, 100);
  }
  
  moveU() {
    key = 'Up';
    const move = setInterval(() => {
      ctx.fillRect(this.x, this.y, snake.width, snake.height);
      ctx.fillRect(this.x, this.y - 10, snake.width, snake.height);
      ctx.clearRect(this.x, this.y + 10, snake.width, snake.height);
    
      this.y -= 10;
      
      if(this.y <= -10) {
        clearInterval(move);
        alert('Game Over!');
        removeAllEventListeners();
      }
      if(key !== 'Up') {
        clearInterval(move);
        ctx.clearRect(this.x, this.y + 10, snake.width, snake.height);
      }
    }, 100);
  }
  
  moveD() {
    key = 'Down';
    const move = setInterval(() => {
      ctx.fillRect(this.x, this.y, snake.width, snake.height);
      ctx.fillRect(this.x, this.y + 10, snake.width, snake.height);
      ctx.clearRect(this.x, this.y - 10, snake.width, snake.height);
      
      this.y += 10;
      
      if(this.y >= canvas.height) {
        clearInterval(move);
        alert('Game Over!');
        removeAllEventListeners();
      }
      if(key !== 'Down') {
        clearInterval(move);
        ctx.clearRect(this.x, this.y - 10, snake.width, snake.height);
      }
    }, 100);
  }
}


const snake = new Snake();

function moveR() {snake.moveR()}
function moveL() {snake.moveL()}
function moveU() {snake.moveU()}
function moveD() {snake.moveD()}

rightBtn.addEventListener('click', moveR);
leftBtn.addEventListener('click', moveL);
upBtn.addEventListener('click', moveU);
downBtn.addEventListener('click', moveD);



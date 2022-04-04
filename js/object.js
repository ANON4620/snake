const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const score = document.getElementById('score');
const mute_unmute_icon = document.getElementById('mute_unmute_icon');

const game = {
  state: 'START',
  score: 0,

  updateScore() {
    this.score++;
    score.innerText = `SCORE: ${this.score}`;
  },

  over() {
    gameOverSound.play();
    setTimeout(() => {
      this.state = 'STOP';
      alert('Game Over!');
      game.reset();
    }, 1200);
  },

  reset() {
  	key = null;
    this.clearCanvas();
    this.state = 'START';
    this.score = 0;
    score.innerText = `SCORE: ${this.score}`;
  },

  clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },
  
  sound: {
    state: 'UNMUTE',
    
    mute() {
      turnSound.volume = 0;
      eatingSound.volume = 0;
      gameOverSound.volume = 0;
      mute_unmute_icon.src = 'icons/mute.png';
      this.state = 'MUTE';
    },
    
    unmute() {
      turnSound.volume = 1;
      eatingSound.volume = 1;
      gameOverSound.volume = 1;
      mute_unmute_icon.src = 'icons/unmute.png';
      this.state = 'UNMUTE';
    }
  }
  
};

class Snake {
  constructor(x, y, box, length) {
    this.box = box;
    this.tail = [{ x: x, y: y }];
    this.length = length;
    this.setPosition();
    this.move()
  }
  
  draw() {
    for(let i = 0; i < this.length; i++)
    {
      ctx.fillStyle = (i === 0) ? 'Purple' : 'Black';
      ctx.fillRect(this.tail[i].x, this.tail[i].y, this.box, this.box);
    }
  }
  
  setPosition() {
    for(let i = 1; i < this.length; i++)
    {
      if(key === 'RIGHT' || key === 'DOWN') {
        this.tail.push({
          x: this.tail[i - 1].x - this.box,
          y: this.tail[i - 1].y
        });
      }
      else if(key === 'LEFT')
      {
        this.tail.push({
          x: this.tail[i - 1].x + this.box,
          y: this.tail[i - 1].y
        });
      }
      else
      {
        this.tail.push({
          x: this.tail[i - 1].x,
          y: this.tail[i - 1].y + this.box
        });
      }
    }
  }
  
  updatePosition() {
    for(let i = this.length - 1; i > 0; i--) {
      this.tail[i].x = this.tail[i - 1].x;
      this.tail[i].y = this.tail[i - 1].y;
    }
    
    switch(key) {
    	case 'RIGHT':
    		this.tail[0].x += this.box;
    		if(this.tail[0].x > canvas.width - this.box)
    			this.tail[0].x = 0;
    		break;
    
    	case 'LEFT':
    		this.tail[0].x -= this.box;
    		if(this.tail[0].x < 0)
    			this.tail[0].x = canvas.width - this.box;
    		break;
    
    	case 'UP':
    		this.tail[0].y -= this.box;
    		if(this.tail[0].y < 0)
    			this.tail[0].y = canvas.height - this.box;
    		break;
    
    	case 'DOWN':
    		this.tail[0].y += this.box;
    		if(this.tail[0].y > canvas.height - this.box)
    			this.tail[0].y = 0;
    		break;
    }
  }
  
  hasCollided() {
    for(let i = 1; i < this.length; i++) 
    {
      if((this.tail[0].x === this.tail[i].x) && 
        (this.tail[0].y === this.tail[i].y))
        return true;
    }
    return false;
  }
  
  addTail() {
  	this.tail.push({
  		x: this.tail[this.length - 1].x,
  		y: this.tail[this.length - 1].y
  	});
  	this.length++;
  }
  
  move() {
    const move = setInterval(() => {
      game.clearCanvas();
      food.draw();
      this.draw();
      this.updatePosition();
      
      if(food.hasEaten()) {
      	game.updateScore();
        eatingSound.play();
        this.addTail();
        food.changePosition();
      }
      
      if(this.hasCollided()) {
      	clearInterval(move);
      	game.over();
      }
    }, 150);
  }
  
}

class Food {
  constructor() {
  	this.x = null;
  	this.y = null;
    this.box = snake.box;
    this.changePosition();
  }

  draw() {
    ctx.fillStyle = 'Red';
    ctx.fillRect(this.x, this.y, this.box, this.box);
  }

  changePosition() {
  	const arr = [];
  	for(let x = 0; x < canvas.width - this.box; x += this.box) {
  		for(let y = 0; y < canvas.height - this.box; y += this.box) {
  			let f = 0;
  			if(this.x === x && this.y === y)
  				f = 1;
  			else
  				for(let i = 0; i < snake.length; i++) {
  					if((snake.tail[i].x === x) &&
  					(snake.tail[i].y === y)) {
  						f = 1;
  						break;
  					}
  				}
  			if(f == 0)
  				arr.push({x: x, y: y});
  		}
  	}
  	
  	const random = parseInt(Math.random() * arr.length);
  	this.x = arr[random].x;
  	this.y = arr[random].y;
  }

  hasEaten() {
    if((snake.tail[0].x === food.x) &&
      (snake.tail[0].y === food.y))
      return true;
    else
      return false;
  }
}

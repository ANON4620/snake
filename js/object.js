const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const score = document.getElementById("score");
const mute_unmute_icon = document.getElementById("mute_unmute_icon");

const game = {
  state: "STOP",
  score: 0,

  updateScore() {
    this.score++;
    score.innerText = `SCORE: ${this.score}`;
  },

  over() {
    gameOverSound.play();
    setTimeout(() => {
      this.state = "STOP";
      alert("Game Over!");
      this.reset();
    }, 1200);
  },

  reset() {
  	key = null;
    this.clearCanvas();
    this.score = 0;
    score.innerText = `SCORE: ${this.score}`;
    
    for(let i = 0; i < snake.length; i++)
    	snake.tail.pop();
    
    snake.length = init_len;
  },

  clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },
  
  start() {
  	game.state = "RUNNING";
  	food.changePosition();
  	
  	const start = setInterval(() => {
  		game.clearCanvas();
  		food.draw();
  		snake.draw();
  		snake.move();
  
  		if(food.hasEaten()) {
  			eatingSound.play();
  			game.updateScore();
  			snake.addTail();
  			food.changePosition();
  		}
  
  		if(snake.hasCollided()) {
  			clearInterval(start);
  			game.over();
  		}
  	}, 150);
  },
  
  sound: {
    state: "UNMUTE",
    
    mute() {
      turnSound.volume = 0;
      eatingSound.volume = 0;
      gameOverSound.volume = 0;
      mute_unmute_btn.className = "mute";
      this.state = "MUTE";
    },
    
    unmute() {
      turnSound.volume = 1;
      eatingSound.volume = 1;
      gameOverSound.volume = 1;
      mute_unmute_btn.className = "unmute";
      this.state = "UNMUTE";
    }
  }
  
};

const init_len = 3;
const snake = {
 	box: 10,
 	tail: [],
 	length: init_len,
 	
  draw() {
    for(let i = this.length - 1; i > 0; i--) {
      ctx.fillStyle = "Black";
      ctx.fillRect(this.tail[i].x, this.tail[i].y, this.box, this.box);
    }
    
    ctx.fillStyle = "Purple";
    ctx.fillRect(this.tail[0].x, this.tail[0].y, this.box, this.box);
  },
  
  setPosition(x, y) {
    for(let i = 0; i < this.length; i++) 
    {
      this.tail.push({
        x: x,
        y: y
      });
    }
  },
  
  move() {
    for(let i = this.length - 1; i > 0; i--) {
      this.tail[i].x = this.tail[i - 1].x;
      this.tail[i].y = this.tail[i - 1].y;
    }
    
    switch(key) {
    	case "RIGHT":
    		this.tail[0].x += this.box;
    		if(this.tail[0].x > canvas.width - this.box)
    			this.tail[0].x = 0;
    		break;
    
    	case "LEFT":
    		this.tail[0].x -= this.box;
    		if(this.tail[0].x < 0)
    			this.tail[0].x = canvas.width - this.box;
    		break;
    
    	case "UP":
    		this.tail[0].y -= this.box;
    		if(this.tail[0].y < 0)
    			this.tail[0].y = canvas.height - this.box;
    		break;
    
    	case "DOWN":
    		this.tail[0].y += this.box;
    		if(this.tail[0].y > canvas.height - this.box)
    			this.tail[0].y = 0;
    		break;
    }
  },
  
  hasCollided() {
    for(let i = 1; i < this.length; i++) 
    {
      if((this.tail[0].x === this.tail[i].x) && 
        (this.tail[0].y === this.tail[i].y))
        return true;
    }
    return false;
  },
  
  addTail() {
  	this.tail.push({
  		x: this.tail[this.length - 1].x,
  		y: this.tail[this.length - 1].y
  	});
  	this.length++;
  }
};

const food = {
	x: null,
	y: null,
	box: snake.box,
	
  draw() {
    ctx.fillStyle = "Red";
    ctx.fillRect(this.x, this.y, this.box, this.box);
  },

  changePosition() {
  	const arr = [];
  	
  	for(let x = 0; x < canvas.width - this.box; x += this.box) {
  		for(let y = 0; y < canvas.height - this.box; y += this.box) {
  			
  			let blank_pos = true;
  			if(this.x === x && this.y === y)
  				blank_pos = false;
  			else {
  				for(let i = 0; i < snake.length; i++) {
  					if((snake.tail[i].x === x) &&
  					(snake.tail[i].y === y)) {
  						blank_pos = false;
  						break;
  					}
  				}
  			}
  			if(blank_pos)
  				arr.push({x: x, y: y});
  				
  		}
  	}
  	
  	const random = parseInt(Math.random() * arr.length);
  	this.x = arr[random].x;
  	this.y = arr[random].y;
  },

  hasEaten() {
    if((snake.tail[0].x === food.x) &&
      (snake.tail[0].y === food.y))
      return true;
      
    return false;
  }
};

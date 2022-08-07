const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const score = document.getElementById("score");
const mute_btn = document.getElementById("mute-btn");
const unmute_btn = document.getElementById("unmute-btn");


const game = {
  state: "STOP",
  score: 0,

  clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },
  
  input() {
    if(keyBuffer.length > 0)
      key = keyBuffer.shift();
  },
  
  start() {
  	game.state = "RUNNING";
  	snake.setPosition(-snake.box, 0);
  	food.changePosition();
  	
  	requestAnimationFrame(animationLoop);
  },
  
  over() {
    gameOverSound.pause();
    gameOverSound.currentTime = 0;
    gameOverSound.play();
    setTimeout(() => {
      this.state = "STOP";
      alert(`Game Over! Your score is ${this.score}.`);
      this.reset();
    }, 1500);
  },

  reset() {
    key = null;
    keyBuffer = [];
    this.clearCanvas();
    snake.tail = [];
    snake.length = init_len;
    this.score = 0;
    score.innerText = `SCORE: ${this.score}`;
  },
  
  updateScore() {
    this.score++;
    score.innerText = `SCORE: ${this.score}`;
  },

  screen: {
    setWidth() {
      let canvas_width = parseInt(window.innerWidth);
      while(canvas_width % snake.box !== 0)
        canvas_width--;
      return canvas_width;
    },

    setHeight() {
      let canvas_height = parseInt(window.innerHeight/2);
      while(canvas_height % snake.box !== 0)
        canvas_height--;
      return canvas_height;
    }
  },

  sound: {
    state: "UNMUTE",
    
    mute() {
      turnSound.volume = 0;
      eatingSound.volume = 0;
      gameOverSound.volume = 0;
      unmute_btn.style.display = "none";
      mute_btn.style.display = "inline";
      this.state = "MUTE";
    },
    
    unmute() {
      turnSound.volume = 1;
      eatingSound.volume = 1;
      gameOverSound.volume = 1;
      mute_btn.style.display = "none";
      unmute_btn.style.display = "inline";
      this.state = "UNMUTE";
    }
  }
  
};

const init_len = 3;
const snake = {
  box: 20,
  tail: [],
  head_color: "white",
  body_color: "white",
  length: init_len,
  lastTail: {
    x: null,
    y: null
  },
 	
  draw() {
    // delete tail
    ctx.clearRect(snake.lastTail.x, snake.lastTail.y, snake.box, snake.box);
    
    // draw body
    ctx.fillStyle = snake.body_color;
    ctx.fillRect(this.tail[1].x, this.tail[1].y, this.box, this.box);
    
    // draw head
    ctx.fillStyle = snake.head_color;
    ctx.fillRect(this.tail[0].x, this.tail[0].y, this.box, this.box);
  },
  
  setPosition(x, y) {
    for(let i = 0; i < this.length; i++) {
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
    	case "right":
    		this.tail[0].x += this.box;
    		break;
    
    	case "left":
    		this.tail[0].x -= this.box;
    		break;
    
    	case "up":
    		this.tail[0].y -= this.box;
    		break;
    
    	case "down":
    		this.tail[0].y += this.box;
    		break;
    }
    
    
    if(this.tail[0].x > canvas.width - this.box)
      this.tail[0].x = 0;
    if(this.tail[0].x < 0)
      this.tail[0].x = canvas.width - this.box;
    if(this.tail[0].y < 0)
      this.tail[0].y = canvas.height - this.box;
    if(this.tail[0].y > canvas.height - this.box)
      this.tail[0].y = 0;
    
  },
  
  hasCollided() {
    for(let i = 1; i < this.length; i++) 
    {
      if((this.tail[0].x === this.tail[i].x) && 
        (this.tail[0].y === this.tail[i].y)) {
        return true;
	}
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
  color: "#ff6666",
  box: snake.box,
	
  draw() {
    ctx.fillStyle = food.color;
    ctx.fillRect(this.x, this.y, this.box, this.box);
  },

  changePosition() {
  	const arr = [];
  	
  	for(let x = 0; x < canvas.width - this.box; x += this.box) {
  		for(let y = 0; y < canvas.height - this.box; y += this.box) {

  			let empty_area = true;

  			if(this.x === x && this.y === y) {
  				empty_area = false;
        		}
  			else {
  				for(let i = 0; i < snake.length; i++) {
  					if((snake.tail[i].x === x) && (snake.tail[i].y === y)) {
  						empty_area = false;
  						break;
  					}
  				}
  			}

  			if(empty_area) {
  				arr.push({x: x, y: y});	
        		}

  		}
  	}
  	
  	const random = parseInt(Math.random() * arr.length);
  	this.x = arr[random].x;
  	this.y = arr[random].y;
  },

  hasEaten() {
    if((snake.tail[0].x === food.x) && (snake.tail[0].y === food.y)) {
      return true;
    }
      
    return false;
  }
};

function animationLoop() {
  food.draw();
  snake.draw();

  snake.lastTail.x = snake.tail[snake.length - 1].x;
  snake.lastTail.y = snake.tail[snake.length - 1].y;

  game.input();
  snake.move();

  if(food.hasEaten()) {
    eatingSound.pause();
    eatingSound.currentTime = 0;
    eatingSound.play();
    game.updateScore();
    snake.addTail();
    food.changePosition();
  }

  if(snake.hasCollided()) {
    game.over();
    return;
  }

  setTimeout(() => {
    requestAnimationFrame(animationLoop);
  }, 1000 / 8);
}


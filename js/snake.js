const delay_per_frame = 150; // milliseconds

class Snake {
  constructor(x, y, box, length) {
    this.box = box;
    this.snake = [{ x: x, y: y }];
    this.length = length;
  }
  
  draw() {
    for(let i = 0; i < this.length; i++) 
    {
      ctx.fillStyle = (i === 0) ? 'Purple' : 'Black';
      ctx.fillRect(this.snake[i].x, this.snake[i].y, this.box, this.box);
    }
  }
  
  setPosition() {
    for(let i = 1; i < this.length; i++) 
    {
      if(key === 'RIGHT' || key === 'DOWN') {
        this.snake.push({
          x: this.snake[i - 1].x - this.box,
          y: this.snake[i - 1].y
        });
      }
      else if(key === 'LEFT')
      {
        this.snake.push({
          x: this.snake[i - 1].x + this.box,
          y: this.snake[i - 1].y
        });
      }
      else
      {
        this.snake.push({
          x: this.snake[i - 1].x,
          y: this.snake[i - 1].y + this.box
        });
      }
    }
  }
  
  updateHeadPosition() {
    switch(key) {
      case 'RIGHT':
        this.snake[0].x += this.box;
        break;
    
      case 'LEFT':
        this.snake[0].x -= this.box;
        break;
    
      case 'UP':
        this.snake[0].y -= this.box;
        break;
    
      case 'DOWN':
        this.snake[0].y += this.box;
        break;
    }
  }
  
  updateTailPosition() {
    for(let i = this.length - 1; i > 0; i--) {
      this.snake[i].x = this.snake[i - 1].x;
      this.snake[i].y = this.snake[i - 1].y;
    }
  }
  
  updatePosition() {
    this.updateTailPosition();
    this.updateHeadPosition();
  }
  
  touchedBorder() {
    if(
      (this.snake[0].x < 0) ||
      (this.snake[0].y < 0) ||
      (this.snake[0].x > canvas.width - this.box) ||
      (this.snake[0].y > canvas.height - this.box)
      ) 
      return true;
    else
      return false;
  }
  
  hasCollided() {
    for(let i = 1; i < this.length; i++) 
    {
      if(
        (this.snake[0].x === this.snake[i].x) && 
        (this.snake[0].y === this.snake[i].y)
        )
        return true;
    }
    return false;
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
            x: this.snake[i - 1].x,
            y: this.snake[i - 1].y
          });
        }
        Game.updateScore();
      }
      
      this.updatePosition();
      
      if(this.touchedBorder()) {
        if(this.snake[0].x < 0)
          this.snake[0].x = canvas.width - this.box;
        else if(this.snake[0].y < 0)
          this.snake[0].y = canvas.height - this.box;
        else if(this.snake[0].x > canvas.width - this.box)
          this.snake[0].x = 0;
        else if(this.snake[0].y > canvas.height - this.box)
          this.snake[0].y = 0;
      }
      
      if(this.hasCollided()) {
        clearInterval(move);
        Game.over();
      }
      
    }, delay_per_frame); // setInterval
  } // move() function
} // class Snake


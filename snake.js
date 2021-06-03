const delayPerFrame = 150;

class Snake {
  constructor(x, y, box, length) {
    this.box = box;
    this.snake = [{ x: x, y: y }];
    this.length = length;
    this.step = 10;
  }
  
  draw() {
    for(let i = 0; i < this.length; i++) 
    {
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
  
  setInitialPositions() {
    for(let i = 1; i < this.length; i++) 
    {
      this.snake.push({
        x: snake.snake[i - 1].x - 10,
        y: snake.snake[i - 1].y
      });
    }
  }
  
  touchedBorder() {
    if(
      (this.snake[0].x < 0) ||
      (this.snake[0].y < 0) ||
      (this.snake[0].x > canvas.width - 10) ||
      (this.snake[0].y > canvas.height - 10)
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
  } // move() function
} // class Snake


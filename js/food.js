class Food {
  constructor() {
    this.box = snake.box;
    this.x = null;
    this.y = null;
    this.changePosition();
  }

  draw() {
    ctx.fillStyle = 'Red';
    ctx.fillRect(this.x, this.y, this.box, this.box);
  }

  changePosition() {
    this.x = parseInt(((Math.random() * (canvas.width - this.box)) + 1) / this.box) * this.box;
    this.y = parseInt(((Math.random() * (canvas.height - this.box)) + 1) / this.box) * this.box;
  }

  hasEaten() {
    if (
      (snake.snake[0].x === food.x) &&
      (snake.snake[0].y === food.y)
    )
      return true;
    else
      return false;
  }

}

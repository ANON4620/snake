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
    this.x = parseInt(((Math.random() * (canvas.width - 10)) + 1) / 10) * 10;
    this.y = parseInt(((Math.random() * (canvas.height - 10)) + 1) / 10) * 10;
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

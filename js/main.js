let snake, food;

function createObjects() {
  snake = new Snake(x, y, 10, 3);
  food = new Food();
}

addAllEventListeners();

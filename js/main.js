let snake, food;
const box = 10, length = 3;

function createObjects() {
  snake = new Snake(x, y, box, length);
  food = new Food();
}

addAllEventListeners();

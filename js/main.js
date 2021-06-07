let snake, food;

function createObjects() {
  snake = new Snake(0, 0, 10, 3);
  food = new Food();
}

createObjects();
addAllEventListeners();

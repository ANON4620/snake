/*
LIBRARIES:
Tap.js - https://github.com/pukhalski/tap

SOUNDS:
https://mixkit.co/free-sound-effects/game/

*/

let snake, food;

function createObjects() {
  snake = new Snake(0, 0, 10, 1);
  food = new Food();
}

createObjects();
addAllEventListeners();

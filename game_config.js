const score = document.getElementById('score');

const Game = {
  score: 0,

  updateScore() {
    this.score++;
    score.innerText = `SCORE: ${this.score}`;
  },

  over() {
    gameOverSound.play();
    setTimeout(() => {
      removeAllEventListeners();
      state = 'STOP';
      alert('Game Over!');
      this.tryAgain();
    }, 2000);
  },

  tryAgain() {
    const tryAgain = confirm('Would you like to try again?');
    if (tryAgain)
      Game.reset();
  },

  reset() {
    this.clearCanvas();
    state = 'START';
    key = null;
    this.score = 0;
    score.innerText = `SCORE: ${this.score}`;
    createObjects();
    addAllEventListeners();
  },

  clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
};

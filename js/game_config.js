const score = document.getElementById('score');
const mute_unmute_icon = document.getElementById('mute_unmute_icon');

const Game = {
  state: 'START',
  score: 0,

  updateScore() {
    this.score++;
    score.innerText = `SCORE: ${this.score}`;
  },

  over() {
    gameOverSound.play();
    setTimeout(() => {
      removeAllEventListeners();
      this.state = 'STOP';
      alert('Game Over!');
      this.tryAgain();
    }, 2000);
  },

  tryAgain() {
    const tryAgain = confirm('Would you like to try again?');
    if(tryAgain)
      Game.reset();
  },

  reset() {
    this.clearCanvas();
    this.state = 'START';
    key = null;
    this.score = 0;
    score.innerText = `SCORE: ${this.score}`;
    createObjects();
    addAllEventListeners();
  },

  clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },
  
  sound: {
    state: 'UNMUTE',
    
    mute() {
      turnSound.volume = 0;
      eatingSound.volume = 0;
      gameOverSound.volume = 0;
      mute_unmute_icon.src = 'icons/mute.png';
      this.state = 'MUTE';
    },
    
    unmute() {
      turnSound.volume = 1;
      eatingSound.volume = 1;
      gameOverSound.volume = 1;
      mute_unmute_icon.src = 'icons/unmute.png';
      this.state = 'UNMUTE';
    }
  }
  
};

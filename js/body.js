// Loading body
document.querySelector('center').innerHTML = 
`<div class="container">
  <canvas id="canvas" width="200" height="200" style="border: 1px solid black"></canvas>
  <p id="score">SCORE: 0</p>
  <h1>SNAKE</h1>
  
  <button id="up">Up</button><br>
  <button id="left">Left</button>
  <button id="down">Down</button>
  <button id="right">Right</button>
    
  <h6>Press Right or Down to Start</h6>
    
  <b>CREDITS:</b><br>
  <b>Swarnadeep Sarkar</b>
  <b>(ANON4620)</b>
</div>`;



// Variables
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


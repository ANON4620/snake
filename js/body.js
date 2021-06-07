// Loading body
document.querySelector('center').innerHTML = 
`<canvas id="canvas" width="200" height="200" style="border: 1px solid black"></canvas>
  <p id="score">SCORE: 0</p>
  <h1>SNAKE</h1>
  
  <button id="up" class="controller" style="margin: 8px">Up</button><br>
  <button id="left" class="controller">Left</button>
  <button id="down" class="controller">Down</button>
  <button id="right" class="controller">Right</button>
    
  <h6>Press Right or Down to Start</h6>
    
  <b>CREDITS:</b><br>
  <b>Swarnadeep Sarkar</b>
  <b>(ANON4620)</b>`;



// Variables
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


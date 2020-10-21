// CONTROLLING ANIMATIONS

// Canvas Settings
let cnv = document.getElementById('myCanvas');
let ctx = cnv.getContext('2d');
cnv.width = 400;
cnv.height = 400;



// Control Variables
// Player
let pX = 100;
let pY = 100;
let pW = 30;
let pXspeed = 6;
let pYspeed = 6;

let speed = 0;
let bigger = 0;

let pPoint = 3;

// Enemy
let eX = Math.random()*cnv.width;
let eY = 0;
let eYspeed = 5;
let eW = 30;


// Keyboard Variables
let wPressed = false;
let aPressed = false;
let sPressed = false;
let dPressed = false;
let shiftPressed = false;
let spacePressed = false;

// Begin Animation
requestAnimationFrame(draw);

// Listen for a key being down/up
document.addEventListener('keydown', keydownHandler);
document.addEventListener('keyup', keyupHandler);


// keyboard functions
function keydownHandler(event) {
  if(event.code === "KeyW") wPressed = true;
  if(event.code === "KeyA") aPressed = true;
  if(event.code === "KeyS") sPressed = true;
  if(event.code === "KeyD") dPressed = true;
  if(event.code === "Space") spacePressed = true;
  if(event.code === "Shift") shiftPressed = true;
}

function keyupHandler(event) {
  if(event.code === "KeyW") wPressed = false;
  if(event.code === "KeyA") aPressed = false;
  if(event.code === "KeyS") sPressed = false;
  if(event.code === "KeyD") dPressed = false;
  if(event.code === "Space") spacePressed = false;
  if(event.code === "Shift") shiftPressed = false;
}

function draw(){
  speed++;
  bigger++;
  
  // SPecial ability
  if ( shiftPressed && speed > 100 && pPoint >= 15) {
    speed = 0;
    pXspeed = 10;
    pYspeed = 10;
  }

  if (spacePressed && bigger > 200 && pPoint >= 15) {
    bigger = 0;
    pW = 70;
  }

  // draw blue background
  ctx.fillStyle = 'lightblue';
  ctx.fillRect(0,0,cnv.width,cnv.height);

  // draw pPoint
  ctx.fillStyle = 'maroon';
  ctx.font = '20px Georgia' ;
  ctx.fillText("Point:" + pPoint, 10 , 20);

  // draw note
  
  // draw player rectangle
  ctx.fillStyle = 'brown';
  ctx.fillRect(pX, pY, pW, 30);

  // draw Enemy rectangle
  ctx.fillStyle = 'yellow';
  ctx.fillRect(eX, eY, eW, 10);

  // player Control
  if (wPressed) pY -= pYspeed;
  if (aPressed) pX -= pXspeed;
  if (sPressed) pY += pYspeed;
  if (dPressed) pX += pXspeed;


  // animate enemy 
  eY += eYspeed;
  if (eY > cnv.height) {
    eX = Math.random()*cnv.width;
    eY = 6;
    eYspeed = 5;
    pPoint--;
  }

  // Prevent orange out of the picture
  if (eX + eW > cnv.width) {
    ex = Math.random()*cnv.width;
  }

  // enemy collision detect
  if (eY + 15 >= pY && eX + eX > pX && eX <= pX + 30 && pY + 30 >= eY ) {
    eX = Math.random()*cnv.width;
    eY = 0;
    eYspeed ++;
    pPoint++;
  }

  // Collision
  if (pX < 0) pX += pXspeed;
  if (pY < 0) pY += pYspeed;
  if (pX + 30 > cnv.width) pX -= pXspeed;
  if (pY + 30 > cnv.width) pY -= pYspeed;

  
  if (pPoint > 0 && pPoint <= 30) {
  requestAnimationFrame(draw);
  }
}

const canvas = document.getElementById('swipe_canvas');
const ctx = canvas.getContext('2d');

let swipe_objects = [];
let colors = ['#ff0000', '#00ff00', '#ff00ff', '#ffff00', '#ffffff', '#00ffff'];


canvas.ontouchstart = (e) => {
	log('touch')
/*
  let so = {
    color: colors[swipe_objects.length % colors.length],
    x: e.touches[0].clientX,
    y: e.touches[0].clientY,
    id: e.touches[0].identifier,
    touch: e.touches[0]
  }*/
  //log(so);
  //swipe_objects.push(so);
  //start();

  drawTouches(e.touches)
  document.getElementById('console').innerHTML = e.touches[0].identifier;
};

canvas.ontouchmove = (e) => {
  drawTouches(e.touches)
};

canvas.ontouchend = (e) => {
  drawTouches(e.touches)
};

function drawTouches(touches) {
  clear();
  for(let i = 0; i < touches.length; i++) {
    drawTouch(touches[i].clientX, touches[i].clientY, colors[touches[i].identifier])
    // pageX, pageY
  }
}

function drawTouch(x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 50, 0, 2 * Math.PI);
  ctx.fill();
}


function stop() {
  cancelAnimationFrame(requestID);
  log('Stopped');
}

function start() {
  if(swipe_objects.length < 1) {
    loop();
    log('Started');
  }
}

function log(s) {
  console.log(s);
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/*
function set_handlers(name) {
  // Install event handlers for the given element
  
  el.ontouchstart = start_handler;
  el.ontouchmove = move_handler;
  // Use same handler for touchcancel and touchend
  el.ontouchcancel = end_handler;
  el.ontouchend = end_handler;
}*/

/*


function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function die(reason) {
  log('💀 Dead! Cause: ' + reason);
  stop();
}

function gameLoop() {

  // updatePlayer()

  updateDino();
  //updateWorld();

  // draw
  draw();


  checkInput();


  // controls
  updateTouch();
  drawTouch();

  requestID = requestAnimationFrame(gameLoop);
}

function drawTiles() {
  ctx.beginPath();

}

function draw() {
  clear();
  ctx.translate(0.5, 0.5);
  drawBackground();
  drawDino();
  drawWorld();
  drawTiles();
  ctx.translate(-0.5, -0.5);
}

function drawDino() {

  ctx.beginPath();

  ctx.imageSmoothingEnabled = false;


  // hitbox
  ctx.beginPath();
  ctx.rect(player.x, player.y, 32, 40);
  ctx.strokeStyle = '#f00';
  ctx.stroke();

  // skate hitbox
  ctx.beginPath();
  ctx.rect(player.x - 8,  player.y + 40, 48, 4);
  ctx.rect(player.x    ,  player.y + 45, 5,  5); // wheel1
  ctx.rect(player.x + 28, player.y + 45, 5,  5); // wheel2
  ctx.strokeStyle = '#f00';
  ctx.stroke();
}



*/


window.onload = function() {
  resize();
};

function resize() {
  console.log('Resize');
  
  // skateboard
  canvas.style.width = window.innerWidth;
  canvas.style.height = window.innerHeight;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.onorientationchange = function(event) {
  setTimeout(resize, 100);
};

window.onresize = resize;

















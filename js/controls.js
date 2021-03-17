var keys = [], action = {};
window.onkeyup = function(e) {keys[e.keyCode]=false;}
window.onkeydown = function(e) {keys[e.keyCode]=true; if(keys[88]) stop();}

function linkAction(id, action_name, action_name_2) {
	;
	var el = document.getElementById(id);
	el.addEventListener('touchstart', function(e) { action[onGround ? action_name : action_name_2] = true; }, false);
	el.addEventListener('mousedown', function(e) { action[action_name] = true; }, false);
	el.addEventListener('touchend', function(e) { action[action_name] = false; action[action_name_2] = false; }, false);
	el.addEventListener('mouseup', function(e) { action[action_name] = false; }, false);
}

let skateCanvas = document.getElementById('skate_canvas');
let skate_ctx = skateCanvas.getContext('2d');

let touchPoints = [];
skateCanvas.addEventListener('touchstart', function(e) { 
	var rect = skateCanvas.getBoundingClientRect();
	let x = event.touches[0].clientX - rect.left;
	let y = event.touches[0].clientY - rect.top;

	// Add touch point
	touchPoints.push({
		x: x,
		y: y,
		fade: 1.0
	});

	if(y > 200) {
		healPress();
	} else {
		nosePress();
	}

 }, false);

function updateTouch() {
	let remove = [];
	for ( let i = touchPoints.length-1; i >= 0; i--) {
		let point = touchPoints[i];
		point.fade -= 0.03;
		if(point.fade < 0.01) {
			touchPoints.splice(i, 1);
		}
	}
}

function drawTouch() {

	// Clear
	skate_ctx.clearRect(0,0, skateCanvas.width, skateCanvas.height);

	touchPoints.forEach(function(point) {
		
		skate_ctx.beginPath();
		skate_ctx.arc(point.x, point.y, 15, 0, 2 * Math.PI);
		skate_ctx.fillStyle = 'rgba(255,255,255,' + point.fade +')';
		skate_ctx.fill();
	});

}
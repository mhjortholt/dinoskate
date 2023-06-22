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

let swipeCanvas = document.getElementById('swipe_canvas');
let swipe_ctx = swipeCanvas.getContext('2d');

let touchPoints = [];
swipeCanvas.addEventListener('touchstart', function(e) { 
	
	var rect = swipeCanvas.getBoundingClientRect();
	for (var i =  0; i < e.touches.length; i++) {
		let touch = e.touches[i];
		let x = touch.clientX - rect.left;
		let y = touch.clientY - rect.top;

		// Add touch point
		touchPoints.push({
			x: x,
			y: y,
			fade: 1.0
		});

		if(y > 200) {
			heelPress();
		} else {
			nosePress();
		}
	}

 }, false);


swipeCanvas.addEventListener('touchmove', function(e) {
	var rect = swipeCanvas.getBoundingClientRect();
	for (var i =  0; i < e.touches.length; i++) {
		let touch = e.touches[i];
		let x = touch.clientX - rect.left;
		let y = touch.clientY - rect.top;

		
		if(touchPoints[i]) {
			touchPoints[i].x = x;
			touchPoints[i].y = y;
		}
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
	swipe_ctx.clearRect(0,0, swipeCanvas.width, swipeCanvas.height);

	touchPoints.forEach(function(point) {
		
		swipe_ctx.beginPath();
		swipe_ctx.arc(point.x, point.y, 15, 0, 2 * Math.PI);
		swipe_ctx.fillStyle = 'rgba(255,255,255,' + point.fade +')';
		swipe_ctx.fill();
	});

}
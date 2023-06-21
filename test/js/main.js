var canvas, ctx;
window.onload = function() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	resize();
	start();
};

function resize() {
	let width = window.innerWidth;
	let height = window.innerHeight;
	var container = document.getElementById('canvas_container');
	container.style.width = width + 'px';
	container.style.height = height + 20 + 'px';
	canvas.width = width;
	canvas.height = 10 + height;

	window.innerHeight = height + 15;
}

window.addEventListener('orientationchange', function() {
	setTimeout(resize, 50);
}, false);
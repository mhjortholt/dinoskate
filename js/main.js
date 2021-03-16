var canvas, ctx;
window.onload = function() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	resize();
	start();
};

function resize() {
	console.log('Resize');
	// SEGA genesis resolution
	canvas.width = 320;
	canvas.height = 224;

	let width = window.innerWidth;
	let height = window.innerHeight;

	let w = canvas.width / width;
	let h = canvas.height / height;

	canvas.style.height = '';
	canvas.style.width = '';
	//canvas.style.marginLeft = '';
	canvas.style.marginTop = '';

	if ( h > w) {
		// center horizontally
		canvas.style.height = '100%';
		//canvas.style.marginLeft = (width - canvas.offsetWidth) / 2 + 'px';
	} else {
		// center vertically
		canvas.style.width = '100%';
		canvas.style.marginTop = (height - canvas.offsetHeight) / 2 + 'px';
	}
}

window.onorientationchange = function(event) {
  setTimeout(resize, 100);
};

window.onresize = resize;
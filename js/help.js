function random(start, end) {
	return Math.floor( Math.random() * (end-start) ) + start;
}

function normRad(a) {
	while(a < 0) {
		a += Math.PI*2;
	}
	return a % (Math.PI * 2);
}

function angleBetween(p1, p2) {
	return normRad(Math.atan2(p2.y - p1.y, p2.x - p1.x));
}

function diffAngle(v1, v2) {
	var a = Math.abs(normRad(v1) - normRad(v2));
	return a > Math.PI ? (2 * Math.PI) - a : a;
}

let screenConsole = document.getElementById('console');
function log(s) {
	if(LOGGING) {
		console.log(s);
	
		if(ON_SCREEN_LOGGING) {
			screenConsole.innerHTML += '<br>' + s;
			screenConsole.scrollTop = screenConsole.scrollHeight;
		}
	}
}
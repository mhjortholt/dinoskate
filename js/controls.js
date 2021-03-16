var keys = [], action = {};
window.onkeyup = function(e) {keys[e.keyCode]=false;}
window.onkeydown = function(e) {keys[e.keyCode]=true; if(keys[88]) stop();}

function linkAction(id, action_name, action_name_2) {
	var el = document.getElementById(id);
	el.addEventListener('touchstart', function(e) { action[onGround ? action_name : action_name_2] = true; }, false);
	el.addEventListener('mousedown', function(e) { action[action_name] = true; }, false);
	el.addEventListener('touchend', function(e) { action[action_name] = false; action[action_name_2] = false; }, false);
	el.addEventListener('mouseup', function(e) { action[action_name] = false; }, false);
}

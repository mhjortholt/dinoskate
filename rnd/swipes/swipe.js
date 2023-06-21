
const canvas = document.getElementById('swipe_canvas');


canvas.ontouchstart = () => {
	console.log(1);
	alert(1)
};

/*
function set_handlers(name) {
  // Install event handlers for the given element
  
  el.ontouchstart = start_handler;
  el.ontouchmove = move_handler;
  // Use same handler for touchcancel and touchend
  el.ontouchcancel = end_handler;
  el.ontouchend = end_handler;
}*/
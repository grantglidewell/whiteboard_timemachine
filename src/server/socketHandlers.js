const MOUSE_MOVE = 'mousemove';
const MOUSE_DOWN = 'mousedown';

const mousemove = (payload) => {
  console.log(MOUSE_MOVE, payload);
};

const mousedown = (payload) => {
  console.log(MOUSE_DOWN, payload);
};

export {
  MOUSE_MOVE,
  MOUSE_DOWN,
  mousemove,
  mousedown,
};

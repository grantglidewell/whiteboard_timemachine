const uuid = require('uuid/v4');

const MOUSE_MOVE = 'mousemove';
const MOUSE_UP = 'mouseup';
const MOUSE_DOWN = 'mousedown';

const SocketHandler = class SocketHandler {
  constructor() {
    this.displays = {
      type: 'memory',
    };
  }
  static generateTimeStamp() {
    return +new Date();
  }
  getDisplays() {
    return this.displays;
  }
  createDisplay(roomid = uuid(), userid = uuid()) {
    this.displays[roomid] = {
      [userid]: {
        roomid,
        userid,
        ephemeralStore: [],
        lines: [],
      },
    };
    return {
      roomid,
      userid,
    };
  }
  generateRoomID() {
    const roomID = uuid();
    this.displays[roomID] = {
      roomID,
      lineCounter: 0,
    };
    return roomID;
  }
  mousedown({ x, y, roomid, userid }) {
    this.displays[roomid][userid].ephemeralStore.push(`${x},${y}`);
  }
  mousemove({ x, y, roomid, userid }) {
    this.displays[roomid][userid].ephemeralStore.push(`${x},${y}`);
  }
  mouseup({ roomid, userid }) {
    this.displays[roomid][userid].lines.push([...this.displays[roomid][userid].ephemeralStore]);
    this.displays[roomid][userid].ephemeralStore = [];
  }
};

export {
  MOUSE_MOVE,
  MOUSE_UP,
  MOUSE_DOWN,
  SocketHandler,
};

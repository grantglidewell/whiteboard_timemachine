const shortid = require('shortid');
const debug = require('debug')('wbtm:displayhandler');

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
  createDisplay(roomid = shortid.generate(), userid = shortid.generate()) {
    this.displays[roomid] = Object.assign(
      (this.displays[roomid] || {}),
      (
        Object.prototype.hasOwnProperty.call(this.displays, roomid) &&
        Object.prototype.hasOwnProperty.call(this.displays[roomid], userid)
      ) ? {} :
        {
          [userid]: {
            roomid,
            userid,
            ephemeralStore: [],
            lines: [],
          },
        },
    );
    debug({
      roomid,
      userid,
    });
    return {
      roomid,
      userid,
    };
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

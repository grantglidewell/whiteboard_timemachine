const shortid = require('shortid');
const debug = require('debug')('wbtm:displayhandler');

const MOUSE_MOVE = 'mousemove';
const MOUSE_UP = 'mouseup';
const MOUSE_DOWN = 'mousedown';

const DisplayHandler = class DisplayHandler {
  constructor(io) {
    this.io = io;
    this.displays = {
      type: 'memory',
    };
    this.rooms = {};
  }
  createRoom(roomid) {
    this.rooms[roomid] = this.io.of(`/${roomid}`);
    this.rooms[roomid].on('connection', (socket) => {
      socket.on(MOUSE_DOWN, data => this.mousedown(data));
      socket.on(MOUSE_MOVE, data => this.mousemove(data));
      socket.on(MOUSE_UP, data => this.mouseup(data));
    });
    return this.rooms[roomid];
  }
  room(roomid) {
    return Object.prototype.hasOwnProperty.call(this.rooms, roomid) ?
      this.rooms[roomid] :
      this.createRoom(roomid);
  }
  getDisplays() {
    return this.displays;
  }
  getArtwork(roomid) {
    return Object.prototype.hasOwnProperty.call(this.displays, roomid) ?
      Array.prototype.concat(...Object.entries(this.displays[roomid])
        .map(([, { lines }]) => lines)) :
      [];
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

    this.room(roomid);

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
    this.displays[roomid][userid].ephemeralStore.push([x, y]);
  }
  mousemove({ x, y, roomid, userid }) {
    this.displays[roomid][userid].ephemeralStore.push([x, y]);
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
  DisplayHandler,
};

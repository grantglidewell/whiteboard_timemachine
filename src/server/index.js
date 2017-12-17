import React from 'react';
import { renderToString } from 'react-dom/server';

import express from 'express';

import RenderCanvas from '../browser/components/renderCanvas';

import template from './template';

import {
  MOUSE_MOVE,
  MOUSE_UP,
  MOUSE_DOWN,
  SocketHandler,
} from './socketHandlers';

const debug = require('debug')('wbtm:server');

const sockethandler = new SocketHandler();

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

server.listen(8888);

app.get('/displays', (req, res) => {
  debug('displays');
  res.send(sockethandler.getDisplays());
});

app.get('/wbtm/:roomid?/:userid?', (req, res) => {
  const display = sockethandler.createDisplay(
    req.params.roomid,
    req.params.userid,
  );
  res.send(template({
    body: renderToString(<RenderCanvas roomid={display.roomid} userid={display.userid} />),
    ...display,
  }));
});

io.on('connection', (socket) => {
  socket.on(MOUSE_DOWN, data => sockethandler.mousedown(data));
  socket.on(MOUSE_MOVE, data => sockethandler.mousemove(data));
  socket.on(MOUSE_UP, data => sockethandler.mouseup(data));
});

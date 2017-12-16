import React from 'react';
import { renderToString } from 'react-dom/server';

import express from 'express';

import App from '../browser/components/app';

import template from './template';

import {
  MOUSE_MOVE,
  MOUSE_UP,
  MOUSE_DOWN,
  SocketHandler,
} from './socketHandlers';

const sockethandler = new SocketHandler();

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

server.listen(8888);

app.get('/', (req, res) => {
  res.send(template({
    body: renderToString(<App />),
    ...sockethandler.createDisplay(),
  }));
});

app.get('/displays', (req, res) => {
  res.send(sockethandler.getDisplays());
});

io.on('connection', (socket) => {
  socket.on(MOUSE_DOWN, data => sockethandler.mousedown(data));
  socket.on(MOUSE_MOVE, data => sockethandler.mousemove(data));
  socket.on(MOUSE_UP, data => sockethandler.mouseup(data));
});

import React from 'react';
import { renderToString } from 'react-dom/server';

import express from 'express';

import App from '../browser/components/app';

import template from './template';

import {
  MOUSE_MOVE,
  MOUSE_DOWN,
  mousemove,
  mousedown,
} from './socketHandlers';

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

server.listen(8888);

app.get('/', (req, res) => {
  res.send(template({
    body: renderToString(<App />),
  }));
});

io.on('connection', (socket) => {
  socket.on(MOUSE_MOVE, mousemove);
  socket.on(MOUSE_DOWN, mousedown);
});

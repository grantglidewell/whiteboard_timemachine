import React from 'react';
import { renderToString } from 'react-dom/server';

import express from 'express';

import RenderCanvas from '../browser/components/renderCanvas';

import template from './template';

import {
  DisplayHandler,
} from '../lib/displayHandler';

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const displayhandler = new DisplayHandler(io);

app.use(express.static('public'));

server.listen(8888);

app.get('/displays', (req, res) => {
  res.send(displayhandler.getDisplays());
});

app.get('/wbtm/:roomid?/:userid?', (req, res) => {
  const { roomid, userid } = displayhandler.createDisplay(
    req.params.roomid,
    req.params.userid,
  );
  const artwork = displayhandler.getArtwork(roomid);
  res.send(template({
    body: renderToString(<RenderCanvas roomid={roomid} userid={userid} artwork={artwork} />),
    roomid,
    userid,
    artwork,
  }));
});

import React from 'react';
import { render } from 'react-dom';
import RenderCanvas from './components/renderCanvas';

render(
  <RenderCanvas
    roomid={window.wbtm.roomid}
    userid={window.wbtm.userid}
    artwork={window.wbtm.artwork}
  />,
  document.getElementById('root'),
);

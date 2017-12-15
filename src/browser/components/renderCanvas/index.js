import React, { Component } from 'react';
import classnames from 'classnames';

import {
  whiteboard,
  colors,
  colorBox,
  black,
  red,
  green,
  blue,
  yellow,
} from './styles';

const RenderCanvas = class RenderCanvas extends Component {
  state = {}

  mousemove = (e) => {
    if (!this.drawing) {
      return;
    }
    this.drawLine(this.current.x, this.current.y, e.clientX, e.clientY, this.current.color, true);
    this.current.x = e.clientX;
    this.current.y = e.clientY;
  }

  mousedown = (e) => {
    this.drawing = true;
    this.current.x = e.clientX;
    this.current.y = e.clientY;
  }

  mouseup = (e) => {
    if (!this.drawing) {
      return;
    }
    this.drawing = false;
    this.drawLine(
      this.current.x, this.current.y, e.clientX, e.clientY, this.current.color,
      true,
    );
  }

  drawLine =(x0, y0, x1, y1, color) => {
    const context = this.canvas.getContext('2d');
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
    context.closePath();
  }

  handleEvents = e => this[e.type](e)

  current = {
    color: 'black',
  }

  drawing = false

  render() {
    return (
      <div>
        <canvas
          width={600}
          height={600}
          ref={(canvas) => {
            this.canvas = canvas;
          }}
          className={whiteboard}
          onMouseDown={this.handleEvents}
          onMouseUp={this.handleEvents}
          onMouseMove={this.handleEvents}
        />
        <div className={colors}>
          <div className={classnames(colorBox, black)} />
          <div className={classnames(colorBox, red)} />
          <div className={classnames(colorBox, green)} />
          <div className={classnames(colorBox, blue)} />
          <div className={classnames(colorBox, yellow)} />
        </div>
      </div>
    );
  }
};

export default RenderCanvas;

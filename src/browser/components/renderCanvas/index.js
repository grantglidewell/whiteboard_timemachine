import React, { Component } from 'react';
import classnames from 'classnames';
import { string } from 'prop-types';

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

import {
  MOUSE_MOVE,
  MOUSE_UP,
  MOUSE_DOWN,
} from '../../../server/socketHandlers';

const RenderCanvas = class RenderCanvas extends Component {
  static propTypes = {
    roomid: string.isRequired,
    userid: string.isRequired,
  }
  state = {}
  componentDidMount = () => {
    this.socket = window.io.connect('http://localhost:8888');
    this.setState({
      windowInnerWidth: window.innerWidth,
      windowInnerHeight: window.innerHeight,
    });
  }
  mousemove = (e) => {
    if (!this.drawing) {
      return;
    }
    this.drawLine(this.current.x, this.current.y, e.clientX, e.clientY, this.current.color, true);
    this.current.x = e.clientX;
    this.current.y = e.clientY;
    this.socket.emit(MOUSE_MOVE, {
      x: e.clientX,
      y: e.clientY,
      roomid: this.props.roomid,
      userid: this.props.userid,
    });
  }
  mousedown = (e) => {
    this.drawing = true;
    this.current.x = e.clientX;
    this.current.y = e.clientY;
    this.socket.emit(MOUSE_DOWN, {
      x: e.clientX,
      y: e.clientY,
      roomid: this.props.roomid,
      userid: this.props.userid,
    });
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
    this.socket.emit(MOUSE_UP, {
      roomid: this.props.roomid,
      userid: this.props.userid,
    });
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
          width={this.state.windowInnerWidth}
          height={this.state.windowInnerHeight}
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

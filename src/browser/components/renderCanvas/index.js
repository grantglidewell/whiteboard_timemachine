import React, { Component } from 'react';
import classnames from 'classnames';
import { string, arrayOf, array } from 'prop-types';

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
  DRAW,
} from '../../../lib/displayHandler';

const RenderCanvas = class RenderCanvas extends Component {
  static propTypes = {
    roomid: string.isRequired,
    userid: string.isRequired,
    artwork: arrayOf(array).isRequired,
  }
  state = {}
  componentDidMount = () => {
    this.socket = window.io.connect(`http://localhost:8888/${this.props.roomid}`);
    this.setState({
      windowInnerWidth: window.innerWidth,
      windowInnerHeight: window.innerHeight,
    }, () => {
      this.props.artwork.forEach(lines => lines.forEach(line => this.drawLine(line[0], line[1], 'black')));
    });
    this.socket.on(DRAW, (drawData) => {
      this.drawLine(drawData.x, drawData.y, 'black');
    });
  }
  mousemove = ({ clientX, clientY }) => {
    if (!this.drawing) {
      return;
    }
    this.drawLine(clientX, clientY);

    this.socket.emit(MOUSE_MOVE, {
      x: clientX,
      y: clientY,
      roomid: this.props.roomid,
      userid: this.props.userid,
    });
  }
  mousedown = ({ clientX, clientY }) => {
    this.drawing = true;
    this.current.x = clientX;
    this.current.y = clientY;
    this.socket.emit(MOUSE_DOWN, {
      x: clientX,
      y: clientY,
      roomid: this.props.roomid,
      userid: this.props.userid,
    });
    this.socket.emit(DRAW, {
      x: clientX,
      y: clientY,
      roomid: this.props.roomid,
      userid: this.props.userid,
    });
  }
  mouseup = ({ clientX, clientY }) => {
    if (!this.drawing) {
      return;
    }
    this.drawing = false;
    this.drawLine(
      clientX,
      clientY,
    );
    this.socket.emit(MOUSE_UP, {
      roomid: this.props.roomid,
      userid: this.props.userid,
    });
    this.socket.emit(DRAW, {
      x: clientX,
      y: clientY,
      roomid: this.props.roomid,
      userid: this.props.userid,
    });
  }
  drawLine = (x, y, color = this.current.color) => {
    const context = this.canvas.getContext('2d');
    context.beginPath();
    context.moveTo(this.current.x || x, this.current.y || y);
    context.lineTo(x, y);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
    context.closePath();
    this.current = {
      x,
      y,
      color,
    };
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

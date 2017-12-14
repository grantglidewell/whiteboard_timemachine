import React, { Component } from 'react';
import '../styles/style.css';

let drawing = false;

// const colors = document.getElementsByClassName('color');

class RenderCanvas extends Component {
  constructor() {
    super();
    this.state = {};
    this.current = {
      color: 'black',
    };
    this.handleEvents = this.handleEvents.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.drawLine = this.drawLine.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.throttle = this.throttle.bind(this);
    this.onResize = this.onResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onMouseMove(e) {
    if (!drawing) {
      return;
    }

    this.drawLine(this.current.x, this.current.y, e.clientX, e.clientY, this.current.color, true);
    this.current.x = e.clientX;
    this.current.y = e.clientY;
  }

  onMouseDown(e) {
    drawing = true;
    this.current.x = e.clientX;
    this.current.y = e.clientY;
  }

  onMouseUp(e) {
    if (!drawing) {
      return;
    }

    drawing = false;
    this.drawLine(
      this.current.x, this.current.y, e.clientX, e.clientY, this.current.color,
      true,
    );
  }

  onResize() { // make the canvas fill its parent
    this.canvas.width = window.innerWidth;// this still should live here
    this.canvas.height = window.innerHeight;// not sure where to put it
    // though for it to function properly
  }

  // also takes emit
  drawLine(x0, y0, x1, y1, color) {
    const context = this.canvas.getContext('2d');
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
    context.closePath();
  }

  handleEvents(e) {
    if (e.type === 'mousedown') {
      this.onMouseDown(e);
    }

    if (e.type === 'mouseup') {
      this.onMouseUp(e);
    }

    if (e.type === 'mousemove') {
      this.onMouseMove(e);
    }
  }

  throttle(callback, delay) { // limit the number of events per second
    let previousCall = new this.Date().getTime();
    return function throttleClosure() {
      const time = new this.Date().getTime();
      if ((time - previousCall) >= delay) {
        previousCall = time;
        callback(...this.arguments);
      }
    };
  }

  render() {
    return (
      <div>
        <canvas
          width={window.innerWidth}
          height={window.innerHeight}
          ref={(canvas) => {
            this.canvas = canvas;
          }}

          className="whiteboard"
          onMouseDown={this.handleEvents}
          onMouseUp={this.handleEvents}
          onMouseMove={this.handleEvents}
        />

        <div className="colors">
          <div className="color black" />
          <div className="color red" />
          <div className="color green" />
          <div className="color blue" />
          <div className="color yellow" />
        </div>
      </div>
    );
  }
}

export default RenderCanvas;

/*
var socket = io();

for (var i = 0; i < colors.length; i++){
  colors[i].addEventListener('click', onColorUpdate, false);
}

socket.on('drawing', onDrawingEvent);

window.addEventListener('resize', onResize, false);
onResize();


function onColorUpdate(e){
  current.color = e.target.className.split(' ')[1];
}


function onDrawingEvent(data){
  var w = canvas.width;
  var h = canvas.height;
  drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
}
*/

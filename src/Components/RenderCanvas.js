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

  render() {
    return (
      <div>
        <canvas
          width={600}
          height={600}
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


// this still should live here
// not sure where to put it though for it to function properly
/*
var socket = io();

canvas.addEventListener('mouseout', onMouseUp, false);
canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

for (var i = 0; i < colors.length; i++){
  colors[i].addEventListener('click', onColorUpdate, false);
}

socket.on('drawing', onDrawingEvent);

window.addEventListener('resize', onResize, false);
onResize();


function onColorUpdate(e){
  current.color = e.target.className.split(' ')[1];
}

// limit the number of events per second
function throttle(callback, delay) {
  var previousCall = new Date().getTime();
  return function() {
    var time = new Date().getTime();

    if ((time - previousCall) >= delay) {
      previousCall = time;
      callback.apply(null, arguments);
    }
  };
}

function onDrawingEvent(data){
  var w = canvas.width;
  var h = canvas.height;
  drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
}

// make the canvas fill its parent
function onResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
*/

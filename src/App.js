import React, { Component } from 'react';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8000');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: {
        color: 'black'
      }
    };
  }

  componentDidMount(){
    socket.on('drawing', this.onDrawingEvent)
    this.context = this.refs.canvas.getContext('2d');
    this.canvas = document.getElementsByClassName('whiteboard')[0];
    this.colors = document.getElementsByClassName('color');

    this.canvas.addEventListener('mousedown', this.onMouseDown, false);
    this.canvas.addEventListener('mouseup', this.onMouseUp, false);
    this.canvas.addEventListener('mouseout', this.onMouseUp, false);
    this.canvas.addEventListener('mousemove', this.throttle(this.onMouseMove, 10), false);
    
  }

  drawLine(x0, y0, x1, y1, color, emit){
    this.context.beginPath();
    this.context.moveTo(x0, y0);
    this.context.lineTo(x1, y1);
    this.context.strokeStyle = color;
    this.context.lineWidth = 2;
    this.context.stroke();
    this.context.closePath();

    if (!emit) { return; }
    var w = this.canvas.width;
    var h = this.canvas.height;

    socket.emit('drawing', {
      x0: x0 / w,
      y0: y0 / h,
      x1: x1 / w,
      y1: y1 / h,
      color: color
    });
  }
  onMouseDown(e){
    this.drawing = true;
    
    //replace all instances of x and y mutation to setstate functions
    
    this.state.current.x = e.clientX;
    this.state.current.y = e.clientY;
  }
  onMouseUp(e){
    if (!this.drawing) { return; }
    this.drawing = false;
    this.drawLine(this.state.current.x, this.state.current.y, e.this.clientX, e.this.clientY, this.state.current.color, true);
  }
  onColorUpdate(e){
    this.state.current.color = e.target.className.split(' ')[1];
  }

  //problem with callback in throttle
  throttle(callback, delay) {
    var previousCall = new Date().getTime();
    return function() {
      var time = new Date().getTime();

    };
  }
  onDrawingEvent(data){
    var w = this.canvas.width;
    var h = this.canvas.height;
    this.drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
  }

  render() {
    return (
      <div>
        <canvas className="whiteboard" ref="canvas" width={600} height={600}></canvas>

        <div className="colors">
          <div className="color black"></div>
          <div className="color red"></div>
          <div className="color green"></div>
          <div className="color blue"></div>
          <div className="color yellow"></div>
        </div>
      </div>
    );
  }
}

export default App;

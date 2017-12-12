import React, { Component } from 'react';
import '../styles/style.css';


class RenderCanvas extends Component {
  constructor(props){
    super();
    this.state = {};
    this.handleEvents = this.handleEvents.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.drawLine = this.drawLine.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.throttle = this.throttle.bind(this);
  }

  handleEvents(e){
        switch(e.type){
            case "mousedown":
                this.onMouseDown(e);
                break;
            case "mouseup":
            case "mouseout":
                this.onMouseUp(e);
                break;
            case "mousemove":
                this.throttle(this.onMouseMove(e), 10);
                break;
        }

  }

    onMouseMove(e){
        if (!drawing) { return; }
        this.drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true);
        current.x = e.clientX;
        current.y = e.clientY;
    }


    drawLine(x0, y0, x1, y1, color, emit){
        const context = this.canvas.getContext('2d');
        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.strokeStyle = color;
        context.lineWidth = 2;
        context.stroke();
        context.closePath();

        /*
         if (!emit) { return; }
         var w = canvas.width;
         var h = canvas.height;

         socket.emit('drawing', {
         x0: x0 / w,
         y0: y0 / h,
         x1: x1 / w,
         y1: y1 / h,
         color: color
         });*/
    }

    onMouseDown(e){
        drawing = true;
        current.x = e.clientX;
        current.y = e.clientY;
    }

    onMouseUp(e){
       if (!drawing) { return; }
        drawing = false;
        this.drawLine(current.x, current.y, e.clientX, e.clientY, current.color,
         true);
    }

    throttle(callback, delay) {// limit the number of events per second
        var previousCall = new Date().getTime();
        return function() {
            var time = new Date().getTime();

            if ((time - previousCall) >= delay) {
                previousCall = time;
                callback.apply(null, arguments);

            }
        };
    }

    render(){
    return(
      <div>
        <canvas  width={300} height={300} ref={(canvas) => {this.canvas = canvas;}} className="whiteboard" onMouseDown={this.handleEvents} onMouseUp={this.handleEvents} onMouseMove={this.handleEvents} onMouseOut={this.handleEvents}></canvas>
        <div className="colors">
          <div className="color black"></div>
          <div className="color red"></div>
          <div className="color green"></div>
          <div className="color blue"></div>
          <div className="color yellow"></div>
        </div>
        </div>
      )
  }
};

var drawing = false;
var current = {
    color: 'black'
};

var colors = document.getElementsByClassName('color');
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

// make the canvas fill its parent
function onResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
*/

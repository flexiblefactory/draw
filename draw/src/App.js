import React from 'react';
import './App.css';
import FileSaver from 'file-saver'

import Pen from './Pen';
import Line from './Line';
import Rectangle from './Rectangle';
import TextTool from './TextTool';

const b = {
  backgroundColor: 'red',
  border: 'none',
  color: 'white',
  padding: '20px',
  margin: '10px',
  width: '124px'
}
const ww = 700
const hh = 700

class App extends React.Component {
  componentDidMount() {
    this.setStyles(this.canvas, '#ff0000')
    this.setStyles(this.preview, '#ff7777')
    this.tool = new Rectangle(this.canvas, this.preview)
    this.keyDown = e => this.tool.keyListener && this.tool.keyListener(e)
    document.addEventListener('keydown', this.keyDown)
  }

  componentDidUnmount() {
    document.removeEventListener('keydown', this.keyDown)
  }
  solid() {
    this.canvas.getContext('2d').setLineDash([]);
    this.preview.getContext('2d').setLineDash([]);

  }
  dashed() {
    this.canvas.getContext('2d').setLineDash([12, 12]);
    this.preview.getContext('2d').setLineDash([12, 12]);

  }
  setStyles(c, col) {
    const context = c.getContext('2d')
    context.setLineDash([]);
    context.lineWidth = 7
    context.strokeStyle = col
    context.fillStyle = col
    context.font = '45px sans-serif';
  }
  render() {
    return (
      <div className="App" style={{ width: ww + 'px', margin: 'auto' }}>

        <button style={b}
          onClick={() => this.tool = new Line(this.canvas, this.preview)}>
          LINE
          </button>
        <button style={b}
          onClick={() => this.tool = new Rectangle(this.canvas, this.preview)}>
          RECTANGLE
          </button>
        <button style={b}
          onClick={() => this.tool = new Pen(this.canvas, this.preview)}>
          PEN
          </button>
        <button style={b}
          onClick={() => this.tool = new TextTool(this.canvas, this.preview)}>
          TEXT
          </button>

        <br />

        <button style={b}
          onClick={() => {
            this.preview.getContext('2d').clearRect(0, 0, this.preview.width, this.preview.height)

            this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height)
            }}>
          CLEAR
          </button>
        <button style={b}
          onClick={() => this.dashed()}>
          DASHED
          </button>
        <button style={b}
          onClick={() => this.solid()}>
          SOLID
          </button>

        <button style={b}
          onClick={() => {
            if(this.preview.commit) {this.preview.commit() ; this.preview.commit = null}
            FileSaver.saveAs(document.getElementById('canvas').toDataURL('image/png'), "myimage.png")
            }}>
          SAVE
          </button>
        <div style={{ position: 'relative' }}>
          <canvas
            ref={(c) => { this.canvas = c }}
            style={{ position: 'absolute', left: '0px', border: '1px solid red' }}
            id="canvas"
            onMouseDown={(e) => this.tool.mouseDown(e)}
            onMouseUp={(e) => this.tool.mouseUp(e)}
            onMouseOut={(e) => this.tool.mouseUp(e)}
            width={ww}
            height={hh}>
          </canvas>
          <canvas
            ref={(p) => { this.preview = p }}
            style={{ position: 'absolute', left: '0px' }}
            id="preview"
            onMouseDown={(e) => this.tool.mouseDown(e)}
            onMouseUp={(e) => this.tool.mouseUp(e)}
            width={ww}
            height={hh}>
          </canvas>
        </div>
      </div>
    );
  }
}
export default App;

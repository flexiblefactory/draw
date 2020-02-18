import React from 'react';
import './App.css';
import FileSaver from 'file-saver'

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect(), // abs. size of element
    scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
    scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

  return {
    x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
    y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
  }
}

function mouseDown(e) {
  const context = e.target.getContext('2d');
  const pos = getMousePos(e.target, e)
  context.beginPath();
  context.moveTo(pos.x, pos.y);
  e.target.addEventListener('mousemove', mouseMove)
}

function mouseUp(e) {
  const context = e.target.getContext('2d');
  context.closePath();
  e.target.removeEventListener('mousemove', mouseMove)
}

function saveImage() {
  FileSaver.saveAs(document.getElementById('canvas').toDataURL('image/png'), "myimage.png");
}

function mouseMove(e) {
  const context = e.target.getContext('2d');
  const pos = getMousePos(e.target, e)
  context.lineTo(pos.x, pos.y);
  context.strokeWidth = 5
  context.strokeStyle = '#ff0000'
  context.stroke();
}

function App() {
  return (
    <div className="App">
      <div>
        <button style={{
          backgroundColor: 'red',
          border: 'none',
          color: 'white',
          padding: '20px',
          margin: '10px',
          width: '124px'
        }}
          onClick={saveImage}>SAVE</button></div>
      <canvas
        style={{ border: '1px solid red' }}
        id="canvas"
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        onMouseOut={mouseUp}
        width="124"
        height="124"></canvas>
    </div>
  );
}
export default App;

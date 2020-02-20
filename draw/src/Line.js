import getMousePos from './getMousePos.js'

class Line {

  constructor(canvas, preview){

    this.canvas=canvas
    this.preview=preview
    this.moveListener= e=>this.mouseMove(e)
    this.preview.getContext('2d').clearRect(0, 0, this.preview.width, this.preview.height)
    if(this.preview.commit) {this.preview.commit() ; this.preview.commit = null}

  }

  mouseDown(e) {
    const context = this.preview.getContext('2d');
    this.startPosition = getMousePos(this.preview, e)
    context.beginPath();
    context.moveTo(this.startPosition.x, this.startPosition .y);
    this.preview.addEventListener('mousemove', this.moveListener)
  }

  mouseUp(e) {
    if(!this.startPosition)return

    this.preview.removeEventListener('mousemove', this.moveListener)
    this.preview.getContext('2d').clearRect(0,0,this.preview.width, this.preview.height)
    const pos = getMousePos(this.preview, e);
    const context = this.canvas.getContext('2d');
    context.beginPath();
    context.moveTo(this.startPosition.x, this.startPosition.y)
    context.lineTo(pos.x, pos.y);
    context.stroke();
    context.closePath();
  }

  mouseMove(e) {
    const context = this.preview.getContext('2d');
    const pos = getMousePos(this.preview, e);
    context.clearRect(0,0,this.preview.width, this.preview.height)
    context.beginPath();
    context.moveTo(this.startPosition.x, this.startPosition.y)
    context.lineTo(pos.x, pos.y);
    context.stroke();
    context.closePath();

  }
}

export default Line

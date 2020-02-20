import getMousePos from './getMousePos.js'

class Pen {

  constructor(canvas, preview){

    this.canvas=canvas
    this.preview=preview
    this.moveListener= e=>this.mouseMove(e)
    const context = canvas.getContext('2d')
    this.preview.getContext('2d').clearRect(0, 0, this.preview.width, this.preview.height)

    if(this.preview.commit) {this.preview.commit() ; this.preview.commit = null}

  }


  mouseDown(e) {
    const context = this.canvas.getContext('2d');
    const pos = getMousePos(this.canvas, e)
    context.beginPath();
    context.moveTo(pos.x, pos.y);
    this.preview.addEventListener('mousemove', this.moveListener)
  }

  mouseUp(e) {
    const context = e.target.getContext('2d');
    context.closePath();
    this.preview.removeEventListener('mousemove', this.moveListener)
  }

  mouseMove(e) {
    const context = this.canvas.getContext('2d');
    const pos = getMousePos(this.canvas, e)
    context.lineTo(pos.x, pos.y);
   
    context.stroke();
  }
}

export default Pen

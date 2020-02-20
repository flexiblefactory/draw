import getMousePos from './getMousePos.js'

class TextTool {

  listening =false
  constructor(canvas, preview) {

    this.canvas = canvas
    this.preview = preview
    this.preview.getContext('2d').clearRect(0, 0, this.preview.width, this.preview.height)

    if(this.preview.commit && this.text!=='') {this.preview.commit() ; this.preview.commit = null}
    
    this.preview.commit=()=>{
      this.commit()
    }

    this.keyListener = (ke) => {

      if(!this.listening)return;
      if (ke.key === 'Enter') {
        document.removeEventListener('keydown', this.keyListener)
        this.commit();
        return;
      }
      else if (ke.key.length === 1) {
        this.text += ke.key;

        this.drawText(this.preview)
      }
      else if (ke.key === 'Backspace') {
        this.text = this.text.substr(0, this.text.length - 1)
        this.drawText(this.preview)
      }

      ke.preventDefault();

    }

  }

  drawText(c) {

    const context = c.getContext('2d')

    if (c === this.preview) {
      context.clearRect(0, 0, this.preview.width, this.preview.height)
      if (this.text === '') {
        context.beginPath();
        const lw = context.lineWidth
        const ld = context.getLineDash()
        context.lineWidth = 1
        context.setLineDash([]);

        context.moveTo(this.startPosition.x, this.startPosition.y)
        context.lineTo(this.startPosition.x, this.startPosition.y - 50);
        context.stroke();
        context.closePath();
        context.setLineDash(ld);

        context.lineWidth = lw
      }


    }
    if(this.startPosition)c.getContext('2d').fillText(this.text, this.startPosition.x, this.startPosition.y);
  }


  mouseDown(e) {
    if (this.text) this.commit()
    this.startPosition = getMousePos(this.preview, e)
    this.text = ''
    const context = this.preview.getContext('2d')
    this.drawText(this.preview)
    this.listening=true
  }

  commit() {
    this.preview.getContext('2d').clearRect(0, 0, this.preview.width, this.preview.height)

    this.drawText(this.canvas)
    this.text = ''
  }
  mouseUp(e) { }
  mouseMove(e) {

  }
}

export default TextTool

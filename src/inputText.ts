export default class InputText {
  constructor(
    private canvas: HTMLCanvasElement,
    private ctx: CanvasRenderingContext2D,
    private inputText: string = '',
    private inputLineX: number = 0,
  ) {}

  inputTextBox(): void {
    const x = 0
    const y = this.canvas.height * .9
    this.ctx.strokeStyle = '#0bbf9b'
    this.ctx.lineWidth = 10
    this.ctx.strokeRect(x, y, this.canvas.width, this.canvas.height - y)
  }

  inputTextLine(blink: boolean): void {
    this.ctx.fillStyle = 'black'
    this.ctx.lineWidth = 10
    if (blink) {
      this.ctx.fillRect(this.inputLineX, (this.canvas.height * .9) + 15, 5, 30)
    } else {
      this.ctx.clearRect(this.inputLineX, (this.canvas.height * .9) + 15, 5, 30)
    }
  }

  typeText(event: Event, callback?: (text: string) => void): void {
    const key = (event as KeyboardEvent).key
    if ((key.length > 1 && key !== 'Enter' && key !== 'Backspace')) return
    this.ctx.font = '32px serif'
    this.clearInputText()
    this.ctx.fillStyle = 'white'
    switch(key) {
      case 'Enter':
        callback?.(this.inputText)
        this.inputText = ''
        this.inputLineX = 10
        break
      case 'Backspace':
        this.inputText = this.inputText.slice(0, -1)
        this.inputLineX = 10 + this.ctx.measureText(this.inputText).width + 3
        break
      default:
        if (!this.lineLimitReached(`${this.inputText}${key}`)) {
          this.inputText = `${this.inputText}${key}`
          this.inputLineX = 10 + this.ctx.measureText(this.inputText).width + 3
        }
    }
    this.ctx.fillText(this.inputText, 10, (this.canvas.height * .9) + 40, this.canvas.width - 20)
  }

  clearInputText(): void {
    const x = 5
    const y = this.canvas.height * .9 + 10
    this.ctx.fillStyle = 'black'
    this.ctx.lineWidth = 0
    this.ctx.fillRect(x,y, this.canvas.width - 10, this.canvas.height - y - 10)
  }

  blink(): () => void {
    let blink = true
    return () => {
      blink = !blink
      this.inputTextLine(blink)
    }
  }

  private lineLimitReached(text: string): boolean {
    const textMetric = this.ctx.measureText(text)
    if ((this.canvas.width - 10) - textMetric.width <= 20) {
      return true
    }
    return false
  }
}
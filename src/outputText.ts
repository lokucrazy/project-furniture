export default class OutputText {
  constructor(
    private canvas: HTMLCanvasElement,
    private ctx: CanvasRenderingContext2D,
    private outputText: string = '',
  ) {}

  setOutputText(text: string): void {
    this.outputText = text;
  }

  outputTextBox(): void {
    const x = 0
    const y = 0
    this.ctx.strokeStyle = '#bf0b50'
    this.ctx.lineWidth = 10
    this.ctx.strokeRect(x, y, this.canvas.width, this.canvas.height * .9 - 10)
  }

  writeText(): void {
    this.clearOutputText()
    this.ctx.font = '32px serif'
    this.ctx.fillStyle = 'white'
    const textArray = this.formatText()
    const x = 10
    let y = 40
    textArray.forEach((text) => {
      const textLine = text.join('')
      console.log(textLine)
      const textMetric = this.ctx.measureText(textLine)
      this.ctx.fillText(textLine, x, y, this.canvas.width - 10)
      y += textMetric.actualBoundingBoxAscent + Math.abs(textMetric.actualBoundingBoxDescent) + 10
    })
  }

  clearOutputText(): void {
    const x = 10
    const y = 10
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(x,y, this.canvas.width - 20, this.canvas.height * .9 - 26)
  }

  private formatText(): string[][] {
    const textArray: string[][] = [[]]
    let j = 0;
    let offset = 0;
    for (let i = 0; i < this.outputText.length; i++) {
      textArray[j][i - offset] = this.outputText[i]
      if ((this.canvas.width - 10) - this.ctx.measureText(textArray[j].join('')).width <= 20) {
        textArray[++j] = []
        offset = i + 1
      }
    }
    return textArray
  }
}
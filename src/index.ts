const GameCanvas = document.getElementById('game') as HTMLCanvasElement
const ctx = GameCanvas.getContext('2d')
const defaultCtx = cloneCtx(ctx)
let blink = true
let inputText = ''
let inputLineX = 15


function init() {
  window.addEventListener('resize', resizeCanvas, false);
  window.addEventListener('keydown', typeText)
  resizeCanvas()
}

function resizeCanvas() {
  GameCanvas.width = window.innerWidth;
  GameCanvas.height = window.innerHeight;

  draw()
}
init()

function draw() {
  if (ctx) {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, GameCanvas.width, GameCanvas.height)
    inputTextBox()
  }
}

window.setInterval(() => {
  blink = !blink
  inputTextLine(blink)
}, 800)

function inputTextBox() {
  if (!ctx) return
  const x = 0
  const y = GameCanvas.height * .9
  ctx.strokeStyle = '#0bbf9b'
  ctx.lineWidth = 10
  ctx.strokeRect(x, y, GameCanvas.width, GameCanvas.height - y)
}

function inputTextLine(blink: boolean) {
  if (!ctx) return
  ctx.fillStyle = 'black'
  ctx.lineWidth = 10
  if (blink) {
    ctx.fillRect(inputLineX, (GameCanvas.height * .9) + 15, 5, 30)
  } else {
    ctx.clearRect(inputLineX, (GameCanvas.height * .9) + 15, 5, 30)
  }
}

interface DefaultCtx {
  fillStyle: string | CanvasGradient | CanvasPattern,
  strokeStyle: string | CanvasGradient | CanvasPattern,
  lineWidth: number,
}

function cloneCtx(ctx: CanvasRenderingContext2D | null): DefaultCtx | null {
  if (!ctx) return null
  const { fillStyle, strokeStyle, lineWidth } = ctx;

  return { fillStyle, strokeStyle, lineWidth }
}

function typeText(event: Event) {
  const key = (event as KeyboardEvent).key
  if (!ctx || (key.length > 1 && key !== 'Enter' && key !== 'Backspace')) return
  ctx.font = '32px serif'
  clearInputText()
  ctx.fillStyle = 'white'
  switch(key) {
    case 'Enter':
      inputText = ''
      inputLineX = 10
      break
    case 'Backspace':
      console.log('fuck')
      inputText = inputText.slice(0, -1)
      inputLineX = 10 + ctx.measureText(inputText).width + 3
      break
    default:
      inputText = `${inputText}${key}`
      inputLineX = 10 + ctx.measureText(inputText).width + 3
  }
  ctx.fillText(inputText, 10, (GameCanvas.height * .9) + 40, GameCanvas.width - 20)
}

function clearInputText() {
  if (!ctx) return
  const x = 5
  const y = GameCanvas.height * .9 + 10
  ctx.fillStyle = 'black'
  ctx.lineWidth = 0
  ctx.fillRect(x,y, GameCanvas.width - 10, GameCanvas.height - y - 10)
}
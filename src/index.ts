import InputText from './inputText'
import OutputText from './outputText';

const canvas = document.getElementById('game') as HTMLCanvasElement
const ctx = canvas.getContext('2d')

// Just in case I need the default context
// interface DefaultCtx {
//   fillStyle: string | CanvasGradient | CanvasPattern,
//   strokeStyle: string | CanvasGradient | CanvasPattern,
//   lineWidth: number,
// }

// function cloneCtx(ctx: CanvasRenderingContext2D | null): DefaultCtx | null {
//   if (!ctx) return null
//   const { fillStyle, strokeStyle, lineWidth } = ctx;

//   return { fillStyle, strokeStyle, lineWidth }
// }

// const defaultCtx = cloneCtx(ctx)

function init() {
  if (!canvas || !ctx) {
    console.error('Could not get canvas or context')
    return
  }
  const inputText = new InputText(canvas, ctx, '', 15)
  const outputText = new OutputText(canvas, ctx)
  function draw() {
    if (ctx) {
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      inputText.inputTextBox()
      outputText.outputTextBox()
    }
  }
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    draw()
  }

  window.addEventListener('resize', () => resizeCanvas(), false)
  window.addEventListener('keydown', (ev) => {ev.preventDefault();inputText.typeText(ev, (text) => { outputText.setOutputText(text); outputText.writeText() })})
  window.setInterval(inputText.blink(), 800)

  resizeCanvas()
}


init()
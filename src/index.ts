import { readText } from './terminalInput'
import { writeText } from './terminalOutput'

const inputTextElement = document.getElementById('terminal-input')
const outputTextElement = document.getElementById('terminal-output')

if (inputTextElement && outputTextElement) {
  inputTextElement.addEventListener('keypress', readText, false)
  outputTextElement.addEventListener('write', writeText, false)
}
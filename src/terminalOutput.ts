const SPEED = 100

declare global {
  interface HTMLElementEventMap {
    write: CustomEvent<string>
  }
}

function writeText(event: CustomEvent<string>): void {
  const text = event.detail
  const elem = event.target as HTMLTextAreaElement
  function write() {
    if (elem.textLength < text.length) {
      elem.value += text.charAt(elem.textLength)
      setTimeout(write, SPEED)
    }
  }
  elem.value = ''
  write()
}

function clear(elem: HTMLTextAreaElement): void {
  elem.value = ''
}

export {
  writeText,
  clear,
}
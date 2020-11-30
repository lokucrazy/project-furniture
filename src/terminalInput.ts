function readText(event: KeyboardEvent): void {
  const elem = event.target as HTMLTextAreaElement
  event.preventDefault()
  switch(event.key) {
    case 'Backspace':
      elem.value = elem.value.slice(0, -1)
      break
    case 'Enter':
      console.log(event.key)
      document.getElementById('terminal-output')?.dispatchEvent(new CustomEvent('write', { detail: elem.value }))
      elem.value = ''
      break
    default:
      elem.value += event.key
  }
}

export {
  readText
}
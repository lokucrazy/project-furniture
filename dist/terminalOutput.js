const SPEED = 100;
function writeText(event) {
    const text = event.detail;
    const elem = event.target;
    function write() {
        if (elem.textLength < text.length) {
            elem.value += text.charAt(elem.textLength);
            setTimeout(write, SPEED);
        }
    }
    elem.value = '';
    write();
}
function clear(elem) {
    elem.value = '';
}
export { writeText, clear, };

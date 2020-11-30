function readText(event) {
    var _a;
    const elem = event.target;
    event.preventDefault();
    switch (event.key) {
        case 'Backspace':
            elem.value = elem.value.slice(0, -1);
            break;
        case 'Enter':
            console.log(event.key);
            (_a = document.getElementById('terminal-output')) === null || _a === void 0 ? void 0 : _a.dispatchEvent(new CustomEvent('write', { detail: elem.value }));
            elem.value = '';
            break;
        default:
            elem.value += event.key;
    }
}
export { readText };

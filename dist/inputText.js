export default class InputText {
    constructor(canvas, ctx, inputText = '', inputLineX = 0) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.inputText = inputText;
        this.inputLineX = inputLineX;
    }
    inputTextBox() {
        const x = 0;
        const y = this.canvas.height * .9;
        this.ctx.strokeStyle = '#0bbf9b';
        this.ctx.lineWidth = 10;
        this.ctx.strokeRect(x, y, this.canvas.width, this.canvas.height - y);
    }
    inputTextLine(blink) {
        this.ctx.fillStyle = 'black';
        this.ctx.lineWidth = 10;
        if (blink) {
            this.ctx.fillRect(this.inputLineX, (this.canvas.height * .9) + 15, 5, 30);
        }
        else {
            this.ctx.clearRect(this.inputLineX, (this.canvas.height * .9) + 15, 5, 30);
        }
    }
    typeText(event, callback) {
        const key = event.key;
        if ((key.length > 1 && key !== 'Enter' && key !== 'Backspace'))
            return;
        this.ctx.font = '32px serif';
        this.clearInputText();
        this.ctx.fillStyle = 'white';
        switch (key) {
            case 'Enter':
                callback === null || callback === void 0 ? void 0 : callback(this.inputText);
                this.inputText = '';
                this.inputLineX = 10;
                break;
            case 'Backspace':
                this.inputText = this.inputText.slice(0, -1);
                this.inputLineX = 10 + this.ctx.measureText(this.inputText).width + 3;
                break;
            default:
                if (!this.lineLimitReached(`${this.inputText}${key}`)) {
                    this.inputText = `${this.inputText}${key}`;
                    this.inputLineX = 10 + this.ctx.measureText(this.inputText).width + 3;
                }
        }
        this.ctx.fillText(this.inputText, 10, (this.canvas.height * .9) + 40, this.canvas.width - 20);
    }
    clearInputText() {
        const x = 5;
        const y = this.canvas.height * .9 + 10;
        this.ctx.fillStyle = 'black';
        this.ctx.lineWidth = 0;
        this.ctx.fillRect(x, y, this.canvas.width - 10, this.canvas.height - y - 10);
    }
    blink() {
        let blink = true;
        return () => {
            blink = !blink;
            this.inputTextLine(blink);
        };
    }
    lineLimitReached(text) {
        const textMetric = this.ctx.measureText(text);
        if ((this.canvas.width - 10) - textMetric.width <= 20) {
            return true;
        }
        return false;
    }
}

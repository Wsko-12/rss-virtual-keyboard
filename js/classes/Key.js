import Layout from '../layout/layout.js';
import keysData from '../keysData/index.js';

export default class Key {
  constructor(keyCode, lang) {
    this.data = {};
    this.code = keyCode;
    Object.keys(keysData).forEach((language) => {
      this.data[language] = keysData[language].find((keyData) => keyData.code === keyCode);
    });
    this.subtitle = Layout.createEl('span', { classes: ['key__subtitle'], content: this.data[lang].shift });

    if (this.data[lang].shift === this.data[lang].value.toUpperCase()) {
      this.subtitle.innerHTML = '';
    }

    this.title = Layout.createEl('span', { classes: ['key__title'], content: this.data[lang].value });

    const properties = {
      classes: ['keyboard__key'],
      content: [this.subtitle, this.title],
      dataset: {
        code: keyCode,
      },
    };
    this.element = Layout.createEl('div', properties);
    this.currentValue = this.data[lang].value;
  }

  mouseLeave = () => {
    this.unpress();
    this.element.removeEventListener('mouseleave', this.mouseLeave);
    this.element.removeEventListener('mouseup', this.mouseLeave);
  };

  press(repeat) {
    this.element.classList.add('keyboard__key_active');
    if (this.code.match(/Control/)) {
      if (this.code.match(/Left/)) {
        this.keyboard.ctrlLeft = true;
        if (!repeat) {
          if (this.keyboard.altLeft) this.keyboard.switchLang();
        }
      } else {
        this.keyboard.ctrlRight = true;
      }
      return;
    }
    if (this.code.match(/Alt/)) {
      if (this.code.match(/Left/)) {
        this.keyboard.altLeft = true;
        if (!repeat) {
          if (this.keyboard.ctrlLeft) this.keyboard.switchLang();
        }
      } else {
        this.keyboard.altRight = true;
      }
      return;
    }

    if (this.code.match(/Shift/)) {
      if (this.code.match(/Left/)) {
        this.keyboard.shiftLeft = true;
      } else {
        this.keyboard.shiftRight = true;
      }
      if (!repeat) {
        this.keyboard.switchCase();
      }
      return;
    }

    if (this.code.match(/Caps/)) {
      if (this.keyboard.capsKeyPressed) return;
      this.keyboard.capsKeyPressed = true;
      if (!repeat) {
        this.keyboard.caps = !this.keyboard.caps;
        this.keyboard.switchCase();
      }
      return;
    }
    if (this.code.match(/Meta/)) {
      return;
    }

    this.print();
  }

  print() {
    const { output } = this.keyboard;
    output.focus();
    const caretPosStart = output.selectionStart;
    const caretPosEnd = output.selectionEnd;

    const textBefore = this.keyboard.output.value.slice(0, caretPosStart);
    const textAfter = this.keyboard.output.value.slice(caretPosEnd);

    if (this.currentValue.length === 1) {
      this.keyboard.output.value = textBefore + this.currentValue + textAfter;
      output.selectionStart = caretPosStart + 1;
      output.selectionEnd = caretPosStart + 1;
    }

    if (this.code.match(/Backspace/)) {
      if (caretPosStart === caretPosEnd) {
        const textBeforeСorrected = textBefore.slice(0, caretPosStart - 1);
        this.keyboard.output.value = textBeforeСorrected + textAfter;
        if (textBefore.length) {
          output.selectionStart = caretPosStart - 1;
          output.selectionEnd = caretPosStart - 1;
        }
      } else {
        this.keyboard.output.value = textBefore + textAfter;
        output.selectionStart = caretPosStart;
        output.selectionEnd = caretPosStart;
      }
    }
    if (this.code.match(/Delete/)) {
      if (caretPosStart === caretPosEnd) {
        const textAfterСorrected = textAfter.slice(1);
        this.keyboard.output.value = textBefore + textAfterСorrected;
        output.selectionStart = caretPosStart;
        output.selectionEnd = caretPosStart;
      } else {
        this.keyboard.output.value = textBefore + textAfter;
        output.selectionStart = caretPosStart;
        output.selectionEnd = caretPosStart;
      }
    }
    if (this.code.match(/Tab/)) {
      this.keyboard.output.value = `${textBefore}\t${textAfter}`;
      output.selectionStart = caretPosStart + 1;
      output.selectionEnd = caretPosStart + 1;
    }
    if (this.code.match(/Enter/)) {
      this.keyboard.output.value = `${textBefore}\n${textAfter}`;
      output.selectionStart = caretPosStart + 1;
      output.selectionEnd = caretPosStart + 1;
    }
  }

  unpress() {
    if (this.code.match(/Caps/)) {
      this.keyboard.capsKeyPressed = false;
      if (this.keyboard.caps) {
        return;
      }
    }
    this.element.classList.remove('keyboard__key_active');
    if (this.code.match(/Control/)) {
      if (this.code.match(/Left/)) {
        this.keyboard.ctrlLeft = false;
      } else {
        this.keyboard.ctrlRight = false;
      }
      return;
    }
    if (this.code.match(/Alt/)) {
      if (this.code.match(/Left/)) {
        this.keyboard.altLeft = false;
      } else {
        this.keyboard.altRight = false;
      }
    }

    if (this.code.match(/Shift/)) {
      if (this.code.match(/Left/)) {
        this.keyboard.shiftLeft = false;
      } else {
        this.keyboard.shiftRight = false;
      }
      this.keyboard.switchCase();
    }
  }

  switchCase() {
    const {
      lang, caps, shiftLeft, shiftRight,
    } = this.keyboard;
    const { shift, value } = this.data[lang];
    if (shift) {
      this.title.innerHTML = '';
      this.subtitle.innerHTML = '';
      if (!caps) {
        if (shiftLeft || shiftRight) {
          this.title.innerHTML = shift;
          this.currentValue = shift;
          if (shift !== value.toUpperCase()) {
            this.subtitle.innerHTML = value;
          }
        } else {
          this.title.innerHTML = value;
          this.currentValue = value;
          if (shift !== value.toUpperCase()) {
            this.subtitle.innerHTML = shift;
          }
        }
      } else if (shiftLeft || shiftRight) {
        if (shift === value.toUpperCase()) {
          this.title.innerHTML = value;
          this.currentValue = value;
        } else {
          this.title.innerHTML = shift;
          this.currentValue = shift;
          this.subtitle.innerHTML = value;
        }
      } else if (shift === value.toUpperCase()) {
        this.title.innerHTML = shift;
        this.currentValue = shift;
      } else {
        this.title.innerHTML = value;
        this.currentValue = value;
        this.subtitle.innerHTML = shift;
      }
    }
  }

  click() {
    this.press();
    this.element.addEventListener('mouseleave', this.mouseLeave);
    this.element.addEventListener('mouseup', this.mouseLeave);
  }
}

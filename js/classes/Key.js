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
  }

  mouseLeave = () => {
    this.unpress();
    this.element.removeEventListener('mouseleave', this.mouseLeave);
    this.element.removeEventListener('mouseup', this.mouseLeave);
  };

  press() {
    this.element.classList.add('keyboard__key_active');
    if (this.code.match(/Control/)) {
      if (this.code.match(/Left/)) {
        this.keyboard.ctrlLeft = true;
        if (this.keyboard.altLeft) this.keyboard.switchLang();
      } else {
        this.keyboard.ctrlRight = true;
      }
      return;
    }
    if (this.code.match(/Alt/)) {
      if (this.code.match(/Left/)) {
        this.keyboard.altLeft = true;
        if (this.keyboard.ctrlLeft) this.keyboard.switchLang();
      } else {
        this.keyboard.altRight = true;
      }
      return;
    }

    if (this.code.match(/Shift/)) {
      if (!this.keyboard.shiftLeft && !this.keyboard.shiftRight) {
        this.keyboard.switchCase();
      }
      if (this.code.match(/Left/)) {
        this.keyboard.shiftLeft = true;
      } else {
        this.keyboard.shiftRight = true;
      }
      return;
    }

    if (this.code.match(/Caps/)) {
      this.keyboard.caps = !this.keyboard.caps;
      this.keyboard.switchCaps();
    }
  }

  unpress() {
    if (this.code.match(/Caps/) && this.keyboard.caps) {
      return;
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

  click() {
    this.press();
    this.element.addEventListener('mouseleave', this.mouseLeave);
    this.element.addEventListener('mouseup', this.mouseLeave);
  }
}

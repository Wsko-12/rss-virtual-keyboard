import Layout from '../layout/layout.js';
import Key from './Key.js';
import keysData from '../keysData/index.js';

export default class Keyboard {
  constructor(lang) {
    this.lang = lang;
    this.layout = [
      ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
      ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete'],
      ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
      ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
      ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
    ];
    this.output = Layout.createEl('textarea', { classes: ['output'], attrs: { rows: 8, cols: 64 } });
    this.container = Layout.createEl('div', { classes: ['keyboard'] });

    this.wrapper = Layout.createEl('div', { classes: ['wrapper'], content: [this.output, this.container] });

    document.body.append(this.wrapper);

    this.keys = {};
    this.layout.forEach((row) => {
      const rowEl = Layout.createEl('div', { classes: ['keyboard__row'], dataset: { keyboardRow: true } });
      row.forEach((keyCode) => {
        const key = new Key(keyCode, lang);
        this.keys[keyCode] = key;
        key.keyboard = this;
        rowEl.append(key.element);
      });

      this.container.append(rowEl);
    });
    this.initListeners();
  }

  initListeners() {
    this.shiftLeft = this.shiftRight = false;
    this.ctrlLeft = this.ctrlRight = false;
    this.altLeft = this.altRight = false;
    this.caps = false;
    document.addEventListener('keydown', (e) => { this.eventCatcher(e); });
    document.addEventListener('keyup', (e) => { this.eventCatcher(e); });
    this.container.addEventListener('mousedown', (e) => { this.eventCatcher(e); });
  }

  eventCatcher = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type.match(/key/)) {
      const keyCode = e.code;
      const key = this.keys[keyCode];
      if (!key) return;
      if (e.type.match(/down/)) {
        key.press();
      } else {
        key.unpress();
      }
    } else {
      if (e.target === this.container || e.target.dataset.keyboardRow) return;
      const keyElement = e.target.closest('.keyboard__key');
      const key = this.keys[keyElement.dataset.code];
      key.click();
    }
  };

  switchLang() {
    const languages = Object.keys(keysData);
    let nextLangIndex = languages.indexOf(this.lang);
    nextLangIndex = nextLangIndex + 1 >= languages.length ? 0 : nextLangIndex + 1;
    this.lang = languages[nextLangIndex];
    Object.keys(this.keys).forEach((keyCode) => {
      this.keys[keyCode].switchCase();
    });
  }

  switchCase() {
    Object.keys(this.keys).forEach((keyCode) => {
      this.keys[keyCode].switchCase();
    });
  }
}

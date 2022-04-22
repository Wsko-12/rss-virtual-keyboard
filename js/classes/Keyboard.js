/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import Layout from '../layout/layout.js';
import Key from './Key.js';

export default class Keyboard {
  constructor(lang) {
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
        rowEl.append(key.element);
      });

      this.container.append(rowEl);
    });
    this.initListeners();
  }

  initListeners() {
    document.addEventListener('keydown', (e) => { this.eventCatcher(e); });
    document.addEventListener('keyup', (e) => { this.eventCatcher(e); });
    this.container.addEventListener('mousedown', (e) => { this.eventCatcher(e); });
    this.container.addEventListener('mouseup', (e) => { this.eventCatcher(e); });
  }

  eventCatcher = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type.match(/key/)) {
      const keyCode = e.code;
      if (!this.keys[keyCode]) return;
      if (e.type.match(/down/)) {
        this.keys[keyCode].element.classList.add('keyboard__key_active');
      } else {
        this.keys[keyCode].element.classList.remove('keyboard__key_active');
      }
    } else {
      if (e.target === this.container || e.target.dataset.keyboardRow) return;

      const keyElement = e.target.closest('.keyboard__key');
      const key = this.keys[keyElement.dataset.code];
      if (e.type.match(/down/)) {
        keyElement.classList.add('keyboard__key_active');
        keyElement.addEventListener('mouseleave', key.mouseLeave);
      } else {
        keyElement.classList.remove('keyboard__key_active');
      }
    }
  };
}

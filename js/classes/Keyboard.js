/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import Layout from '../layout/layout.js';
import Key from './Key.js';

export default class Keyboard {
  constructor(lang) {
    this.layout = [
      ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
      ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Del'],
      ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
      ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
      ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
    ];
    this.output = Layout.createEl('textarea', { classes: ['output'], attrs: { rows: 8, cols: 64 } });
    this.container = Layout.createEl('div', { classes: ['keyboard'] });

    this.wrapper = Layout.createEl('div', { classes: ['wrapper'], content: [this.output, this.container] });

    document.body.append(this.wrapper);

    this.keys = [];
    this.layout.forEach((row) => {
      const rowEl = Layout.createEl('div', { classes: ['keyboard__row'] });
      row.forEach((keyCode) => {
        const key = new Key(keyCode, lang);
        this.keys.push(key);
        rowEl.append(key.element);
      });

      this.container.append(rowEl);
    });
  }
}

/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import Layout from '../layout/layout.js';

export default class Key {
  constructor(keyCode, lang) {
    const properties = {
      classes: ['keyboard__key'],
      dataset: {
        code: keyCode,
      },
    };
    this.element = Layout.createEl('div', properties);
  }
}

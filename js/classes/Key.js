/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import Layout from '../layout/layout.js';
import keysData from '../keysData/index.js';

export default class Key {
  constructor(keyCode, lang) {
    this.data = {};

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
    this.element.classList.remove('keyboard__key_active');
    this.element.removeEventListener('mouseleave', this.mouseLeave);
  };
}

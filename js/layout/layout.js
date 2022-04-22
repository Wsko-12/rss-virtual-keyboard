/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-extra-semi */
// eslint-disable-next-line import/extensions
import Keyboard from '../classes/Keyboard.js';

export default {
  init() {
    const header = this.createEl('h1', { content: 'RSS Virtual Keyboard' });
    const subtitle = this.createEl('h3', { content: 'Клавиатура создана в операционной системе Windows' });
    const info = this.createEl('h2', { content: 'Для переключения языка: <b>левые</b> Ctrl + Alt' });

    document.body.append(header, subtitle, info);
    this.Keyboard = new Keyboard(this.getStorage('lang'));
  },
  createEl(tag, properties = {}) {
    let element;
    try {
      element = document.createElement(tag);
    } catch (err) {
      throw new Error('No element tag name');
    }

    properties.classes && element.classList.add(...properties.classes);

    if (properties.content) {
      (typeof properties.content === 'string') ? element.innerHTML = properties.content : element.append(...properties.content);
    };

    if (properties.attrs) {
      Object.keys(properties.attrs).forEach((attr) => {
        if (typeof properties.attrs[attr] === 'string' || typeof properties.attrs[attr] === 'number') {
          element.setAttribute(attr, properties.attrs[attr]);
        } else {
          element[attr] = properties.attrs[attr];
        };
      });
    };

    if (properties.dataset) {
      Object.keys(properties.dataset).forEach((key) => {
        element.dataset[key] = properties.dataset[key];
      });
    };
    return element;
  },
  setStorage(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  getStorage(key, def = '"en"') {
    return JSON.parse(window.localStorage.getItem(key) || def);
  },
};

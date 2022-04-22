/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import Layout from '../layout/layout.js';

export default class Keyboard {
  constructor() {
    this.output = Layout.createEl('textarea', { classes: ['output'], attrs: { rows: 5, cols: 20 } });
    this.container = Layout.createEl('div', { classes: ['keyboard'] });

    this.wrapper = Layout.createEl('div', { classes: ['wrapper'], content: [this.output, this.container] });

    document.body.append(this.wrapper);
  }
}

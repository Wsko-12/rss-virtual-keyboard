import Keyboard from './classes/Keyboard.js';
import layout from './layout/layout.js';

(function init() {
  const header = layout.createEl('h1', { content: 'RSS Virtual Keyboard' });
  const subtitle = layout.createEl('h3', { content: 'Клавиатура создана в операционной системе Windows' });
  const info = layout.createEl('h2', { content: 'Для переключения языка: <b>левые</b> Ctrl + Alt' });

  document.body.append(header, subtitle, info);
  layout.keyboard = new Keyboard(layout.getStorage('lang'));
}());

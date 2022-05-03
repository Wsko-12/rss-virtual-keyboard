export default {
  createEl(tag, properties = {}) {
    let element;
    try {
      element = document.createElement(tag);
    } catch (err) {
      throw new Error('No element tag name');
    }

    if (properties.classes) element.classList.add(...properties.classes);

    if (properties.content) {
      if (typeof properties.content === 'string') {
        element.innerHTML = properties.content;
      } else {
        element.append(...properties.content);
      }
    }

    if (properties.attrs) {
      Object.keys(properties.attrs).forEach((attr) => {
        if (typeof properties.attrs[attr] === 'string' || typeof properties.attrs[attr] === 'number') {
          element.setAttribute(attr, properties.attrs[attr]);
        } else {
          element[attr] = properties.attrs[attr];
        }
      });
    }

    if (properties.dataset) {
      Object.keys(properties.dataset).forEach((key) => {
        element.dataset[key] = properties.dataset[key];
      });
    }
    return element;
  },
  setStorage(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  getStorage(key, def = '"en"') {
    return JSON.parse(window.localStorage.getItem(key) || def);
  },
};

/* eslint-disable no-unused-expressions */
/* eslint-disable no-extra-semi */
const layout = {
  createEl(tag, properties) {
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
  getStorage(key, def = null) {
    return JSON.parse(window.localStorage.getItem(key) || def);
  },
};

export default { layout };

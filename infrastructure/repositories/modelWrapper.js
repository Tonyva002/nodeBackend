const { callbackToPromise } = require('../utils/asyncHelper');

function wrapModel(model) {
  return new Proxy(model, {
    get(target, property) {
      const value = target[property];
      if (typeof value !== 'function') {
        return value;
      }
      return (...args) => callbackToPromise(value.bind(target), ...args);
    },
  });
}

module.exports = {
  wrapModel,
};

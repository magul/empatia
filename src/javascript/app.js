const onReady = (callback) => {
  setTimeout(() => {
    if (document.readyState === 'interactive') {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback, false);
    }
  }, 0);
};

export default function () {
  const modules = [];
  const invokeModule = ({ module, selector }) => {
    if (!selector) {
      module();
    } else {
      Array
        .from(document.querySelectorAll(selector))
        .forEach(element => module({ element }));
    }
  };

  onReady(() => modules.forEach(invokeModule));

  return {
    registerModule(module, selector) {
      modules.push({ module, selector });

      return this;
    },
  };
}

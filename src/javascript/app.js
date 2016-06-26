import jquery from 'jquery';

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

  jquery(() => { modules.forEach(invokeModule); });

  return {
    registerModule(module, selector) {
      modules.push({ module, selector });

      return this;
    },
  };
}

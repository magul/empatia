import jquery from 'jquery';

export default function () {
  const modules = [];
  const publicObj = {};
  const invokeModule = ({ module, selector }) => {
    if (!selector) {
      module(publicObj);
    } else {
      Array
        .from(document.querySelectorAll(selector))
        .forEach(element => module(
          Object.assign(publicObj, {
            element: jquery(element) })
          ));
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

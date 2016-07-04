const DEFAULT_PARAMS = {
  left: 0,
  top: 0,
  width: 600,
  height: 700,
  toolbar: 1,
  resizable: 0,
};

const serialize = obj =>
  Object.keys(obj)
    .reduce((result, key) => result.concat(`${key}=${obj[key]}`), [])
    .join();
const getOffset = (screenSize, windowSize) =>
  (screenSize / 2) - windowSize;

export function nativePopupLink({ element }) {
  function openPopup({ link, params, name }) {
    window.open(link, name, serialize(params));
  }

  function clickHandler(event) {
    const { currentTarget: { href, host } } = event;
    const params = Object.assign({}, DEFAULT_PARAMS, {
      left: getOffset(window.screen.width, DEFAULT_PARAMS.width),
      top: getOffset(window.screen.height, DEFAULT_PARAMS.height),
    });

    event.preventDefault();
    openPopup({ link: href, name: host, params });
  }

  element.addEventListener('click', clickHandler, false);
}

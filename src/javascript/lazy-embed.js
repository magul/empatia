const LOADING_CLASS = 'is-loading';
const IGNORE_MOUSE_CLASS = 'is-blurred';
const LOADING_TIMEOUT = 5000;

export function lazyEmbed({ element }) {
  const iframeElement = element.querySelector('iframe');
  let timeoutFallback;

  function handleClick() {
    element.classList.remove(IGNORE_MOUSE_CLASS);
  }

  function handleMouseLeave() {
    element.classList.add(IGNORE_MOUSE_CLASS);
  }

  function handleIframeLoad() {
    element.classList.remove(LOADING_CLASS);
    clearTimeout(timeoutFallback);
  }

  element.classList.add(IGNORE_MOUSE_CLASS);
  element.addEventListener('click', handleClick, false);
  element.addEventListener('mouseleave', handleMouseLeave, false);
  iframeElement.addEventListener('load', handleIframeLoad, false);
  iframeElement.setAttribute('src', element.dataset.src);
  timeoutFallback = setTimeout(handleIframeLoad, LOADING_TIMEOUT);
}

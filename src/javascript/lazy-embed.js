const LOADING_CLASS = 'is-loading';
const IGNORE_MOUSE_CLASS = 'is-blurred';

export function lazyEmbed({ element }) {
  const iframeElement = element.querySelector('iframe');

  function handleClick() {
    element.classList.remove(IGNORE_MOUSE_CLASS);
  }

  function handleMouseLeave() {
    element.classList.add(IGNORE_MOUSE_CLASS);
  }

  function handleIframeLoad() {
    element.classList.remove(LOADING_CLASS);
  }

  element.classList.add(IGNORE_MOUSE_CLASS);
  element.addEventListener('click', handleClick, false);
  element.addEventListener('mouseleave', handleMouseLeave, false);
  iframeElement.addEventListener('load', handleIframeLoad, false);
  iframeElement.setAttribute('src', element.dataset.src);
}

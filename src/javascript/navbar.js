import { navigationChange } from './events';

const OPEN_CLASS = 'is-open';
const isToggleMenu = target =>
  target.classList.contains('js-toggle-menu', 'js-scroll-to-section');
const isMenuSection = target =>
  target.classList.contains('js-scroll-to-section');

export function navbar({ element }) {
  function toggleMenu() {
    requestAnimationFrame(() => {
      element.classList.toggle(OPEN_CLASS);
    });
  }

  function clickHandler(event) {
    if (isToggleMenu(event.target)) {
      toggleMenu();
    } else if (isMenuSection(event.target)) {
      event.preventDefault();
      navigationChange(event.target.hash);
    }
  }

  element.addEventListener('click', clickHandler, false);
}

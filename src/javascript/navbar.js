import { navigationChange } from './events';

const OPEN_CLASS = 'is-open';
const HAMBURGER_ACTIVE_CLASS = 'is-active';

const isToggleMenu = target =>
  target.classList.contains('js-toggle-menu', 'js-scroll-to-section');
const isMenuSection = target =>
  target.classList.contains('js-scroll-to-section');

export function navbar({ element }) {
  const hamburger = element.querySelector('.js-hamburger');

  function toggleMenu() {
    requestAnimationFrame(() => {
      hamburger.classList.toggle(HAMBURGER_ACTIVE_CLASS);
      element.classList.toggle(OPEN_CLASS);
    });
  }

  function clickHandler(event) {
    if (isToggleMenu(event.target) || hamburger.contains(event.target)) {
      toggleMenu();
    } else if (isMenuSection(event.target)) {
      event.preventDefault();
      navigationChange(event.target.hash);
    }
  }

  element.addEventListener('click', clickHandler, false);
}

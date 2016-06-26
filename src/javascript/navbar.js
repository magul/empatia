import { NAVIGATION_CHANGE, NAVIGATION_TOPIC } from './events';

const TOGGLE_SELECTOR = '.js-toggle-menu, .js-scroll-to-section';
const SCROLL_TO_SECTION_SELECTOR = '.js-scroll-to-section';
const OPEN_CLASS = 'is-open';

export function navbar({ element, PubSub }) {
  function toggleMenu() {
    requestAnimationFrame(() => {
      element.toggleClass(OPEN_CLASS);
    });
  }

  element
    .on('click', TOGGLE_SELECTOR, toggleMenu)
    .on('click', SCROLL_TO_SECTION_SELECTOR, (event) => {
      event.preventDefault();
      PubSub.publish(NAVIGATION_TOPIC, {
        type: NAVIGATION_CHANGE,
        target: event.currentTarget.hash,
      });
    });
}

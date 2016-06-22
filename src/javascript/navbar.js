const TOGGLE_SELECTOR = '.js-toggle-menu, .js-scroll-to-section';
const OPEN_CLASS = 'is-open';

export function navbar({ $navbar }) {
  function toggleMenu() {
    requestAnimationFrame(() => {
      $navbar.toggleClass(OPEN_CLASS);
    });
  }

  $navbar.on('click', TOGGLE_SELECTOR, toggleMenu);
}

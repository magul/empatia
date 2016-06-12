import jquery from 'jquery';
const SECTION_ITEM_SELECTOR = '.js-scroll-to-section';
const CURRENT_SECTION_CLASS = 'is-current';

export function sectionsManager() {
  const $sections = jquery(SECTION_ITEM_SELECTOR);
  const $scrollTarget = jquery('html, body');

  function scrollTo(target, cb) {
    $scrollTarget
      .stop()
      .animate({ scrollTop: target.offsetTop }, 500, 'swing', cb);
  }

  function setCurrentSection(target) {
    $sections
      .each((index, element) => {
        const $element = jquery(element);

        $element
          .parent()
          .toggleClass(CURRENT_SECTION_CLASS, $element.is(target));
      });
  }

  function showSection({ originalEvent: event }) {
    const section = document.querySelector(event.target.hash);

    event.preventDefault();
    scrollTo(section, setCurrentSection.bind(null, event.target));
  }

  jquery(document)
    .on('click', SECTION_ITEM_SELECTOR, showSection);
}

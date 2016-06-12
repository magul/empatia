import jquery from 'jquery';
import { scrollSpy } from './scroll-spy';
const SECTION_ITEM_SELECTOR = '.js-scroll-to-section';
const CURRENT_SECTION_CLASS = 'is-current';

export function sectionsManager() {
  const $navSections = jquery(SECTION_ITEM_SELECTOR);
  const $scrollTarget = jquery('html, body');
  const scrollSpyInst = scrollSpy({ $navSections,
    currentSectionClass: CURRENT_SECTION_CLASS });

  function scrollTo(target, cb) {
    const done = () => {
      scrollSpyInst.hang(false);
      cb();
    };

    scrollSpyInst.hang(true);
    $scrollTarget
      .stop()
      .animate({ scrollTop: target.offsetTop }, 500, 'swing', done);
  }

  function setCurrentSection(target) {
    $navSections
      .each((index, element) => {
        const $element = jquery(element);
        const isCurrent = $element.is(target);

        $element
          .parent()
          .toggleClass(CURRENT_SECTION_CLASS, isCurrent);
      });
  }

  function showSection({ originalEvent: event }) {
    const section = document.querySelector(event.target.hash);

    event.preventDefault();
    scrollTo(section, setCurrentSection.bind(null, event.target));
  }

  jquery(document)
    .on('click', SECTION_ITEM_SELECTOR, showSection);
  $scrollTarget.on('scroll', scrollSpy);
}

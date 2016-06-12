import throttle from 'lodash/throttle';
import forEachRight from 'lodash/forEachRight';
import jquery from 'jquery';

export function scrollSpy({ $navSections, currentSectionClass }) {
  const $window = jquery(window);
  const $pageSections = $navSections.map((index, el) => jquery(el.hash));
  let hangDetection = false;

  function setCurrentSection(index) {
    forEachRight($navSections, (navEl, navIndex) => {
      jquery(navEl)
        .parent()
        .toggleClass(currentSectionClass, navIndex === index);
    });
  }

  function detectSection() {
    let detected = false;

    if (hangDetection) return;

    const checkPoint = $window.scrollTop() + ($window.height() * 0.75);

    forEachRight($pageSections, ($element, index) => {
      if (detected) return;

      detected = checkPoint >= $element.offset().top;

      if (detected) {
        requestAnimationFrame(setCurrentSection.bind(null, index));
      }
    });
  }

  $window.on('scroll', throttle(detectSection, 250));

  return Object.freeze({
    hang: status => { hangDetection = status; },
  });
}

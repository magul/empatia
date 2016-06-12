import debounce from 'lodash/debounce';
import jquery from 'jquery';

export function scrollSpy({ $navSections }) {
  let hangDetection = false;
  let $pageSections = $navSections
    .map((index, element) => jquery(element.hash));

  function detectSection() {
    let it = 0;

    if (hangDetection) return;
  }

  jquery(window).on('scroll', debounce(detectSection, 150));

  return Object.freeze({
    hang: status => { hangDetection = status; },
  });
}

import PubSub from 'pubsub-js';
import throttle from 'lodash/throttle';
import forEachRight from 'lodash/forEachRight';
import { ANIMATION_TOPIC, ANIMATION_SS_END, navigationUpdate } from './events';

const SECTIONS_SELECTOR = '.js-section';
const CHECK_INTERVAL = 500;
const elementToHash = element => `#${element.id}`;

export function scrollSpy() {
  const pageSections = document.querySelectorAll(SECTIONS_SELECTOR);
  let ignoreDetection = false;

  PubSub.subscribe(ANIMATION_TOPIC, (topic, { type }) => {
    ignoreDetection = type !== ANIMATION_SS_END;
  });

  function detectSection() {
    let detected = false;
    const checkPoint = window.scrollY + (window.outerHeight * 0.5);

    forEachRight(pageSections, (element) => {
      if (detected || ignoreDetection) return;

      detected = checkPoint >= element.offsetTop;

      if (detected) {
        navigationUpdate(elementToHash(element));
      }
    });
  }

  window.addEventListener('scroll',
    throttle(detectSection, CHECK_INTERVAL), false);
}

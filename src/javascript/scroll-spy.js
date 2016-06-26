/* global window */

import throttle from 'lodash/throttle';
import forEachRight from 'lodash/forEachRight';
import {
  NAVIGATION_UPDATE,
  NAVIGATION_TOPIC,
  ANIMATION_TOPIC,
  ANIMATION_SS_END,
} from './events';
import jquery from 'jquery';

const SECTIONS_SELECTOR = '.js-section';
const CHECK_INTERVAL = 500;
const elementToHash = element => `#${element.id}`;

export function scrollSpy({ PubSub }) {
  const scrollTarget = jquery(window);
  const pageSections = jquery(SECTIONS_SELECTOR);
  let ignoreDetection = false;

  PubSub.subscribe(ANIMATION_TOPIC, (topic, value) => {
    ignoreDetection = value !== ANIMATION_SS_END;
  });

  function detectSection() {
    let detected = false;

    const checkPoint = scrollTarget.scrollTop() + (scrollTarget.height() * 0.5);

    forEachRight(pageSections, (element, index) => {
      if (detected || ignoreDetection) return;

      const $element = pageSections.eq(index);
      detected = checkPoint >= $element.offset().top;

      if (detected) {
        PubSub.publish(NAVIGATION_TOPIC, {
          type: NAVIGATION_UPDATE,
          target: elementToHash(element),
        });
      }
    });
  }

  scrollTarget.on('scroll', throttle(detectSection, CHECK_INTERVAL));
}

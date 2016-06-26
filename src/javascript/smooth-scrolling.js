import PubSub from 'pubsub-js';
import scrollTo from 'scroll-to';
import { NAVIGATION_TOPIC, NAVIGATION_CHANGE, smoothScroll } from './events';

const ANIMATION_DURATION = 500;
const ANIMATION_EASE = 'inOutQuart';

export function smoothScrolling() {
  PubSub.subscribe(NAVIGATION_TOPIC, (topic, { type, target }) => {
    if (type === NAVIGATION_CHANGE) {
      const scrollTarget = document.querySelector(target);

      smoothScroll(true);
      scrollTo(0, scrollTarget.offsetTop, {
        diration: ANIMATION_DURATION,
        ease: ANIMATION_EASE,
      });
      setTimeout(smoothScroll, ANIMATION_DURATION, false);
    }
  });
}

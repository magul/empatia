import PubSub from 'pubsub-js';
import scrollTo from 'scroll-to';
import { NAVIGATION_TOPIC, NAVIGATION_CHANGE, smoothScroll } from './events';

const ANIMATION_DURATION = 500;
const ANIMATION_EASE = 'inOutQuart';
const CANCEL_EVENT = 'wheel';

export function smoothScrolling() {
  const animationOptions = {
    diration: ANIMATION_DURATION,
    ease: ANIMATION_EASE,
  };

  PubSub.subscribe(NAVIGATION_TOPIC, (topic, { type, target }) => {
    if (type === NAVIGATION_CHANGE) {
      const scrollTarget = document.querySelector(target);
      const animation = scrollTo(0, scrollTarget.offsetTop, animationOptions);
      const cancelCallback = () => { animation.stop(); };
      const onAnimationEnd = () => {
        document.removeEventListener(CANCEL_EVENT, cancelCallback);
      };

      animation.once('end', onAnimationEnd);
      document.addEventListener(CANCEL_EVENT, cancelCallback, false);
      smoothScroll(true);
      setTimeout(smoothScroll, ANIMATION_DURATION, false);
    }
  });
}

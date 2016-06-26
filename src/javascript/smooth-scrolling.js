import PubSub from 'pubsub-js';
import jquery from 'jquery';
import { NAVIGATION_TOPIC, NAVIGATION_CHANGE, smoothScroll } from './events';

export function smoothScrolling() {
  const element = jquery('html,body');

  function scrollTo(target) {
    smoothScroll(true);
    element
      .stop()
      .animate(
        { scrollTop: target.offsetTop },
        500,
        'swing',
        smoothScroll.bind(null, false));
  }

  PubSub.subscribe(NAVIGATION_TOPIC, (topic, { type, target }) => {
    if (type === NAVIGATION_CHANGE) {
      scrollTo(document.querySelector(target));
    }
  });
}

import PubSub from 'pubsub-js';
import jquery from 'jquery';
import {
  NAVIGATION_TOPIC,
  NAVIGATION_CHANGE,
  ANIMATION_TOPIC,
  ANIMATION_SS_START,
  ANIMATION_SS_END,
} from './events';

export function smoothScrolling() {
  const element = jquery('html,body');
  const onScrollDone = () => PubSub.publish(ANIMATION_TOPIC, ANIMATION_SS_END);

  function scrollTo(target) {
    PubSub.publish(ANIMATION_TOPIC, ANIMATION_SS_START);
    element
      .stop()
      .animate({ scrollTop: target.offsetTop }, 500, 'swing', onScrollDone);
  }

  PubSub.subscribe(NAVIGATION_TOPIC, (topic, { type, target }) => {
    if (type === NAVIGATION_CHANGE) {
      scrollTo(document.querySelector(target));
    }
  });
}

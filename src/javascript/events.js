import PubSub from 'pubsub-js';

export const NAVIGATION_TOPIC = 'navigation';
export const NAVIGATION_CHANGE = 'navigationChange';
export const NAVIGATION_UPDATE = 'navigationUpdate';

export const ANIMATION_TOPIC = 'animation';
export const ANIMATION_SS_START = 'smoothScrollStart';
export const ANIMATION_SS_END = 'smoothScrollEnd';

export function navigationChange(hash) {
  PubSub.publish(NAVIGATION_TOPIC, {
    type: NAVIGATION_CHANGE,
    target: hash,
  });
}

export function navigationUpdate(hash) {
  PubSub.publish(NAVIGATION_TOPIC, {
    type: NAVIGATION_UPDATE,
    target: hash,
  });
}

export function smoothScroll(start) {
  const type = start ? ANIMATION_SS_START : ANIMATION_SS_END;
  PubSub.publish(ANIMATION_TOPIC, { type });
}

import PubSub from 'pubsub-js';
import {
  NAVIGATION_UPDATE,
  NAVIGATION_CHANGE,
  NAVIGATION_TOPIC,
} from './events';

const TITLE = '';
const REGEX_HASH = /#/;
const REGEX_PATH = /\//;
const hashToString = hash => hash.replace(REGEX_HASH, '');
const pathToHash = path => path.replace(REGEX_PATH, '#');
const isRootPath = path => path === '/';

export function historyManager() {
  if (!isRootPath(location.pathname)) {
    PubSub.publish(NAVIGATION_TOPIC, {
      type: NAVIGATION_CHANGE,
      target: pathToHash(location.pathname),
    });
  }

  PubSub.subscribe(NAVIGATION_TOPIC, (topic, { type, target }) => {
    if (type === NAVIGATION_CHANGE || type === NAVIGATION_UPDATE) {
      history.replaceState(null, TITLE, hashToString(target));
    }
  });
}

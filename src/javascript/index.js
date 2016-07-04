import { scrollSpy } from './scroll-spy';
import { smoothScrolling } from './smooth-scrolling';
import { historyManager } from './history-manager';
import { lazyEmbed } from './lazy-embed';
import { navbar } from './navbar';
import { nativePopupLink } from './native-popup-link';
import app from './app';

app()
  .registerModule(scrollSpy)
  .registerModule(smoothScrolling)
  .registerModule(lazyEmbed, '.js-lazy-embed')
  .registerModule(navbar, '.js-navbar')
  .registerModule(historyManager)
  .registerModule(nativePopupLink, '.js-native-popup');

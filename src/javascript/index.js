import jquery from 'jquery';
import { sectionsManager } from './sections-manager';
import { lazyEmbed } from './lazy-embed';
import { navbar } from './navbar';

jquery(() => {
  sectionsManager();
  lazyEmbed();
  navbar({ $navbar: jquery('.js-navbar') });
});

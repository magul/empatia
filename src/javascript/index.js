import { sectionsManager } from './sections-manager';
import { lazyEmbed } from './lazy-embed';
import jquery from 'jquery';

jquery(() => {
  sectionsManager();
  lazyEmbed();
});

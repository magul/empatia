import jquery from 'jquery';

export function lazyEmbed() {
  const LAZY_EMBED_SELECTOR = '.js-lazy-embed';

  function loadEmbed(element) {
    requestAnimationFrame(() => {
      jquery(element)
        .html(`<iframe
          src="${element.dataset.src}"
          width="${element.dataset.width}"
          height="${element.dataset.height}"
          frameborder="0"></iframe>`)
        .removeAttr('style');
    });
  }

  jquery(LAZY_EMBED_SELECTOR)
    .each((index, element) => {
      setTimeout(loadEmbed, 500, element);
    });
}

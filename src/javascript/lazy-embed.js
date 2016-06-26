const LOADING_CLASS = 'is-loading';

export function lazyEmbed({ element }) {
  element
    .attr('src', element.data().src)
    .on('load', () => {
      element.removeClass(LOADING_CLASS);
    });
}

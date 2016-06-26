const LOADING_CLASS = 'is-loading';
const IGNORE_MOUSE_CLASS = 'is-blurred';

export function lazyEmbed({ element }) {
  element
    .toggleClass(IGNORE_MOUSE_CLASS, true)
    .on('click', () => { element.toggleClass(IGNORE_MOUSE_CLASS, false); })
    .on('mouseleave', () => { element.toggleClass(IGNORE_MOUSE_CLASS, true); })
    .children()
    .attr('src', element.data().src)
    .on('load', () => { element.removeClass(LOADING_CLASS); });
}

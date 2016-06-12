(function empatia(window, document) {
  var CURRENT_SECTION_CLASS = 'is-current';
  var currentSection = getCurrentSection();

  if (currentSection && currentSection.hash !== window.location.hash) {
    currentSection.classList.remove(CURRENT_SECTION_CLASS);
    currentSection = document
      .querySelector('[href="' + window.location.hash + '"]').parentNode;
    currentSection.classList.add(CURRENT_SECTION_CLASS);
  }

  function scrollToSection(event) {
    if (event.target.classList.contains('js-scroll-to-section')) {
      const scrollTarget = document.querySelector(event.target.hash);

      if (scrollTarget) {
        currentSection.classList.remove(CURRENT_SECTION_CLASS);
        currentSection = event.target.parentNode;
        currentSection.classList.add(CURRENT_SECTION_CLASS);
      }
    }
  }

  function getCurrentSection() {
    return document.querySelector('.navbar-item.' + CURRENT_SECTION_CLASS);
  }

  document.addEventListener('click', scrollToSection, false);
}(window, document));

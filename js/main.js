// js/main.js
// Mobile hamburger menu toggle (consistent across all pages)

(function () {
  const burger = document.querySelector('[data-burger]');
  const panel = document.querySelector('[data-mobile-panel]');

  if (!burger || !panel) return;

  burger.addEventListener('click', () => {
    const isOpen = panel.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when a mobile link is clicked
  panel.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-navlink]');
    if (link) {
      panel.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
})();


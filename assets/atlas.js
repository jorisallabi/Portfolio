
(() => {
  const dialog = document.getElementById('atlas-case-study');
  const opener = document.getElementById('atlas-open');
  if (!dialog || !opener) return;
  const closeButtons = dialog.querySelectorAll('[data-atlas-close]');
  opener.addEventListener('click', () => {
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    document.body.dataset.atlasDialogOpen = 'true';
  });
  const close = () => {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
    delete document.body.dataset.atlasDialogOpen;
    opener.focus();
  };
  closeButtons.forEach((button) => button.addEventListener('click', close));
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) close();
  });
  dialog.addEventListener('close', () => {
    delete document.body.dataset.atlasDialogOpen;
    opener.focus();
  });
  dialog.querySelectorAll('.atlas-modal-nav a').forEach((link) => {
    link.addEventListener('click', () => {
      const target = dialog.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start'});
    });
  });
})();

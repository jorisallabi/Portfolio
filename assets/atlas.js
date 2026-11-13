(() => {
  const dialog = document.getElementById('atlas-case-study');
  const opener = document.getElementById('atlas-open');
  if (!dialog || !opener) return;

  const closeButtons = dialog.querySelectorAll('[data-atlas-close]');
  const setOpenState = (isOpen) => {
    document.body.dataset.atlasDialogOpen = String(isOpen);
    opener.setAttribute('aria-expanded', String(isOpen));
  };

  opener.setAttribute('aria-expanded', 'false');
  opener.addEventListener('click', () => {
    if (dialog.open) return;
    try {
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.classList.add('atlas-fallback');
        dialog.setAttribute('open', '');
      }
    } catch (error) {
      dialog.classList.add('atlas-fallback');
      dialog.setAttribute('open', '');
    }
    setOpenState(true);
  });

  const close = () => {
    if (!dialog.open) return;
    if (dialog.classList.contains('atlas-fallback')) {
      dialog.removeAttribute('open');
      dialog.classList.remove('atlas-fallback');
    } else if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
    setOpenState(false);
    opener.focus();
  };

  closeButtons.forEach((button) => button.addEventListener('click', close));
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog && !dialog.classList.contains('atlas-fallback')) close();
  });
  dialog.addEventListener('close', () => {
    setOpenState(false);
    opener.focus();
  });

  dialog.querySelectorAll('.atlas-modal-nav a').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const target = dialog.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          block: 'start'
        });
      }
    });
  });
})();

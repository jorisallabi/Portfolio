(() => {
  const root = document.documentElement;
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progress);

  const updateProgress = () => {
    const max = root.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = document.querySelectorAll(
    '.section-head, .project-card, .project-row, .capability, .about-layout, .method-step, .contact-panel, .article > h1, .article > h2, .article > p, .article > figure, .article > table, .article > ul, .article > pre, .article > aside, .atlas-section'
  );
  targets.forEach((el) => el.setAttribute('data-reveal', ''));
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });
    targets.forEach((el) => observer.observe(el));
  } else {
    targets.forEach((el) => el.classList.add('is-visible'));
  }

  // Loupe accessible pour toutes les images des fiches projets.
  const lightbox = document.createElement('dialog');
  lightbox.className = 'image-lightbox';
  lightbox.setAttribute('aria-label', 'Aperçu agrandi de l’image');
  const lightboxImage = document.createElement('img');
  const lightboxCaption = document.createElement('figcaption');
  const lightboxFigure = document.createElement('figure');
  const closeButton = document.createElement('button');
  closeButton.className = 'image-lightbox-close';
  closeButton.type = 'button';
  closeButton.setAttribute('aria-label', 'Fermer l’image agrandie');
  closeButton.textContent = '×';
  lightboxFigure.append(lightboxImage, lightboxCaption);
  lightbox.append(closeButton, lightboxFigure);
  document.body.appendChild(lightbox);

  const closeLightbox = () => {
    if (lightbox.open) lightbox.close();
    lightboxImage.removeAttribute('src');
  };
  const openLightbox = (image) => {
    if (!image || (!image.currentSrc && !image.src)) return;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt || 'Image agrandie';
    const caption = image.closest('figure')?.querySelector('figcaption')?.textContent?.trim();
    lightboxCaption.textContent = caption || image.alt || '';
    lightboxCaption.hidden = !lightboxCaption.textContent;
    if (typeof lightbox.showModal === 'function') lightbox.showModal();
  };

  document.querySelectorAll('.article img').forEach((image) => {
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', image.alt ? 'Agrandir : ' + image.alt : 'Agrandir l’image');
  });
  closeButton.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  lightbox.addEventListener('close', () => lightboxImage.removeAttribute('src'));

  document.addEventListener('click', (event) => {
    const image = event.target.closest?.('.article img');
    if (!image) return;
    event.preventDefault();
    openLightbox(image);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      const image = event.target.closest?.('.article img');
      if (image) {
        event.preventDefault();
        openLightbox(image);
      }
    }
    if (event.key === 'Escape' && lightbox.open) closeLightbox();
  });
})();

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
})();
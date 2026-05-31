// Theme init — apply before first paint to avoid flash
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
let theme = localStorage.getItem('theme') || (systemDark ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', theme);

document.addEventListener('DOMContentLoaded', () => {

  // ── Theme toggle ──
  const toggleBtn = document.getElementById('theme-toggle');
  const icon = toggleBtn?.querySelector('i');

  const syncIcon = () => {
    if (icon) icon.className = theme === 'dark' ? 'bx bx-sun' : 'bx bx-moon';
  };
  syncIcon();

  toggleBtn?.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    syncIcon();
  });

  // ── Image lightbox ──
  const enlargeables = document.querySelectorAll('.enlargeable');
  enlargeables.forEach(img => {
    img.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = img.classList.contains('enlarged');
      enlargeables.forEach(i => i.classList.remove('enlarged'));
      if (!isOpen) img.classList.add('enlarged');
    });
  });
  document.addEventListener('click', () => {
    enlargeables.forEach(i => i.classList.remove('enlarged'));
  });

  // ── Project tabs ──
  const tabBtns = document.querySelectorAll('.tab-btn');
  const grids   = document.querySelectorAll('.projects-grid');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.tab;
      grids.forEach(g => g.classList.toggle('hidden', g.id !== target));
      // Instantly reveal all cards in the newly shown grid (no stagger needed)
      document.querySelectorAll(`#${target} .reveal`).forEach(el => {
        el.style.transitionDelay = '0s';
        el.classList.add('visible');
      });
    });
  });

  // ── Scroll reveal ──
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });

  // Add reveal to key content blocks
  const revealTargets = [
    '.section-header',
    '.about-text',
    '.about-gallery',
    '.skill-card',
    '.project-card',
    '.contact-intro',
    '.contact-card',
  ];
  revealTargets.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.06}s`;
      revealObserver.observe(el);
    });
  });

  // ── Active nav on scroll ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar a');

  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(s => navObserver.observe(s));
});

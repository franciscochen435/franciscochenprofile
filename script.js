// script.js
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
let theme = localStorage.getItem('theme') || (systemPrefersDark ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', theme);

document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    });
  }
});

const images = document.querySelectorAll('.enlargeable');

images.forEach((image) => {
  image.addEventListener('click', () => {
    image.classList.toggle('enlarged');
  });
});

document.addEventListener('click', (event) => {
  if (!event.target.classList.contains('enlargeable')) {
    images.forEach((image) => {
      image.classList.remove('enlarged');
    });
  }
});

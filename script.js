// script.js
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
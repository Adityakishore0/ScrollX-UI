document.addEventListener('DOMContentLoaded', function () {
  // Page Loader
  let loader = document.getElementById('pageLoader');
  setTimeout(() => {
    loader.style.display = 'none';
  }, 3000); // Hide loader after 3 seconds

  // 3D Hover Effect on Cards
  const cards = document.querySelectorAll('.swiper-slide .card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      let cardRect = card.getBoundingClientRect();
      let x = (e.clientX - cardRect.left) / cardRect.width - 0.5;
      let y = (e.clientY - cardRect.top) / cardRect.height - 0.5;

      card.style.transform = `rotateY(${x * 20}deg) rotateX(${y * -20}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
});

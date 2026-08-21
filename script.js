const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(item => observer.observe(item));

const backTop = document.querySelector('.back-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) backTop.classList.add('visible');
  else backTop.classList.remove('visible');
}, { passive: true });

backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

document.getElementById('year').textContent = new Date().getFullYear();

// Use the actual founder photograph from the repository.
// Do not replace it with the old placeholder SVG.
document.querySelectorAll('.portrait-frame').forEach(frame => {
  frame.style.backgroundImage = "url('D4D2696D-443A-4184-A4F1-EBA2C4E6B08F.png?v=6')";
  frame.style.backgroundSize = 'cover';
  frame.style.backgroundPosition = 'center 18%';
  frame.style.overflow = 'hidden';
  frame.style.filter = 'none';

  frame.querySelectorAll('.portrait-content, .portrait-line').forEach(el => {
    el.style.display = '';
  });

  const monogram = frame.querySelector('.portrait-monogram');
  if (monogram) monogram.style.display = 'none';
});

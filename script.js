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

// Force the real founder photograph onto the doctor card.
// This also bypasses any stale mobile CSS that may still show the old placeholder.
document.querySelectorAll('.portrait-frame').forEach(frame => {
  frame.style.backgroundImage = "url('dr-reshma.svg?v=5')";
  frame.style.backgroundSize = 'cover';
  frame.style.backgroundPosition = 'center top';
  frame.style.overflow = 'hidden';
  frame.querySelectorAll('.portrait-content, .portrait-line').forEach(el => {
    el.style.display = 'none';
  });
});

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
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}

const backTop = document.querySelector('.back-top');
if (backTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) backTop.classList.add('visible');
    else backTop.classList.remove('visible');
  }, { passive: true });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

/*
 * Doctor portrait: use a real IMG element, not a CSS background.
 * This avoids the old SVG placeholder and makes the uploaded photograph
 * render directly in Safari/iOS and desktop browsers.
 */
document.querySelectorAll('.portrait-frame').forEach(frame => {
  const imageUrl = 'https://raw.githubusercontent.com/ManeeshNandan/care-health-hospital/main/D4D2696D-443A-4184-A4F1-EBA2C4E6B08F.png?v=7';

  frame.style.background = 'none';
  frame.style.position = 'relative';
  frame.style.overflow = 'hidden';
  frame.style.filter = 'none';

  const oldImage = frame.querySelector('.doctor-photo');
  if (oldImage) oldImage.remove();

  const img = document.createElement('img');
  img.className = 'doctor-photo';
  img.src = imageUrl;
  img.alt = 'Dr Reshma M Sugunan, MBBS, Founder of Care & Health Hospital';
  img.decoding = 'async';
  img.loading = 'eager';
  img.style.cssText = 'position:absolute!important;inset:0!important;width:100%!important;height:100%!important;max-width:none!important;object-fit:cover!important;object-position:center 18%!important;display:block!important;z-index:0!important;filter:none!important;opacity:1!important;';

  frame.prepend(img);

  const content = frame.querySelector('.portrait-content');
  if (content) {
    content.style.display = 'block';
    content.style.position = 'absolute';
    content.style.zIndex = '4';
  }

  const monogram = frame.querySelector('.portrait-monogram');
  if (monogram) monogram.style.display = 'none';
});

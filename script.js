const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    document.body.classList.toggle('nav-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.textContent = isOpen ? '×' : '☰';
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      document.body.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.textContent = '☰';
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

revealItems.forEach((item) => observer.observe(item));

const sections = document.querySelectorAll('section[id]');
const menuLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  const current = Array.from(sections).find((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= 170 && rect.bottom >= 170;
  });

  menuLinks.forEach((link) => {
    link.classList.toggle('active', current && link.getAttribute('href') === `#${current.id}`);
  });
});

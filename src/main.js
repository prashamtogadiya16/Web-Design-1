import './style.css';

// navbar shadow on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// mobile menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-links a[href^="#"]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(l => l.classList.remove('active'));
    const match = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
    if (match) match.classList.add('active');
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// testimonial slider (mobile only)
const grid = document.getElementById('reviewsGrid');
const cards = grid ? Array.from(grid.children) : [];
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let current = 0;

function showCard(i) {
  cards.forEach((c, idx) => {
    c.style.display = idx === i ? 'block' : 'none';
  });
}

function syncCarousel() {
  if (window.innerWidth <= 768) {
    showCard(current);
  } else {
    cards.forEach(c => { c.style.display = ''; });
  }
}

if (prevBtn && nextBtn && cards.length) {
  prevBtn.addEventListener('click', () => {
    current = (current - 1 + cards.length) % cards.length;
    syncCarousel();
  });
  nextBtn.addEventListener('click', () => {
    current = (current + 1) % cards.length;
    syncCarousel();
  });
}

window.addEventListener('resize', syncCarousel, { passive: true });
syncCarousel();

// contact form
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('emailInput');
    if (!input.value.trim()) return;
    input.value = '';
    input.placeholder = "Thanks! We'll be in touch.";
    setTimeout(() => { input.placeholder = 'Enter your email address'; }, 3000);
  });
}

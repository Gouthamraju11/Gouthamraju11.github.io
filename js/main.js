/* ============================================================
   main.js — navigation, theme toggle, contact form, scroll
   ============================================================ */

/* ---------- Theme toggle ---------- */
const THEME_KEY = 'portfolio-theme';

function getPreferredTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  }
}

function initTheme() {
  const theme = getPreferredTheme();
  applyTheme(theme);

  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });
}

/* ---------- Navigation: hamburger ---------- */
function initNav() {
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  function closeMenu() {
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
    navLinks.classList.remove('is-open');
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'Close navigation menu');
      navLinks.classList.add('is-open');
    }
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu when clicking outside
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
}

/* ---------- Navigation: scrolled state ---------- */
function initNavScroll() {
  const header = document.getElementById('nav-header');
  if (!header) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    window.requestAnimationFrame(() => {
      header.classList.toggle('is-scrolled', window.scrollY > 20);
      ticking = false;
    });
    ticking = true;
  }, { passive: true });
}

/* ---------- Active section highlighting ---------- */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav__link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('is-active', href === `#${id}`);
      });
    });
  }, {
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0,
  });

  sections.forEach(section => observer.observe(section));
}

/* ---------- Contact form ---------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = {
    name:    { el: form.querySelector('[name="name"]'),    errId: 'name-error' },
    email:   { el: form.querySelector('[name="email"]'),   errId: 'email-error' },
    message: { el: form.querySelector('[name="message"]'), errId: 'message-error' },
  };

  function setError(field, msg) {
    const errEl = document.getElementById(field.errId);
    if (errEl) errEl.textContent = msg;
    if (msg) field.el.classList.add('is-invalid');
    else     field.el.classList.remove('is-invalid');
  }

  // Clear errors on input
  Object.values(fields).forEach(field => {
    field.el.addEventListener('input', () => setError(field, ''));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    const name    = fields.name.el.value.trim();
    const email   = fields.email.el.value.trim();
    const message = fields.message.el.value.trim();

    if (!name) {
      setError(fields.name, 'Name is required.');
      valid = false;
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRe.test(email)) {
      setError(fields.email, 'A valid email address is required.');
      valid = false;
    }
    if (!message) {
      setError(fields.message, 'Message is required.');
      valid = false;
    }

    if (!valid) return;

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:gouthamraju224@gmail.com?subject=${subject}&body=${body}`;
  });
}

/* ---------- Smooth scroll polyfill for anchor links ---------- */
function initSmoothScroll() {
  // CSS scroll-behavior handles modern browsers; this catches any edge cases.
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNav();
  initNavScroll();
  initActiveNav();
  initContactForm();
  initSmoothScroll();
});

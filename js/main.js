/* ============================================================
   main.js — theme, nav, count-up, contact form
   ============================================================ */

/* ---------- Theme ---------- */
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
  applyTheme(getPreferredTheme());
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });
}

/* ---------- Nav: hamburger ---------- */
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
    const open = hamburger.getAttribute('aria-expanded') === 'true';
    if (open) {
      closeMenu();
    } else {
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'Close navigation menu');
      navLinks.classList.add('is-open');
    }
  });

  navLinks.querySelectorAll('.nav__link').forEach(l => l.addEventListener('click', closeMenu));
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) closeMenu();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
}

/* ---------- Nav: scroll shadow ---------- */
function initNavScroll() {
  const header = document.getElementById('nav-header');
  if (!header) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      header.classList.toggle('is-scrolled', window.scrollY > 20);
      ticking = false;
    });
    ticking = true;
  }, { passive: true });
}

/* ---------- Nav: active section highlight ---------- */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav__link');
  if (!sections.length || !links.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === `#${id}`));
    });
  }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

  sections.forEach(s => obs.observe(s));
}

/* ---------- Count-up animation ---------- */
function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

function animateCounter(el) {
  const target   = parseFloat(el.dataset.count);
  const suffix   = el.dataset.suffix  ?? '';
  const decimals = parseInt(el.dataset.decimals ?? '0', 10);
  const duration = 1800;
  const start    = performance.now();

  function tick(now) {
    const elapsed  = Math.min(now - start, duration);
    const progress = easeOutQuart(elapsed / duration);
    const value    = target * progress;

    el.textContent = (decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toLocaleString()) + suffix;

    if (elapsed < duration) requestAnimationFrame(tick);
    else el.textContent = (decimals > 0 ? target.toFixed(decimals) : target.toLocaleString()) + suffix;
  }

  requestAnimationFrame(tick);
}

function initCounters() {
  const counters = document.querySelectorAll('.stat__value[data-count]');
  if (!counters.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => obs.observe(el));
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
    const err = document.getElementById(field.errId);
    if (err) err.textContent = msg;
    field.el.classList.toggle('is-invalid', !!msg);
  }

  Object.values(fields).forEach(f => f.el.addEventListener('input', () => setError(f, '')));

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    const name    = fields.name.el.value.trim();
    const email   = fields.email.el.value.trim();
    const message = fields.message.el.value.trim();

    if (!name)    { setError(fields.name, 'Name is required.');          valid = false; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(fields.email, 'A valid email address is required.');       valid = false;
    }
    if (!message) { setError(fields.message, 'Message is required.');    valid = false; }

    if (!valid) return;

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:gouthamraju224@gmail.com?subject=${subject}&body=${body}`;
  });
}

/* ---------- Smooth scroll ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.getElementById(anchor.getAttribute('href').slice(1));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ---------- Hide hero scroll indicator on scroll ---------- */
function initHeroScroll() {
  const indicator = document.querySelector('.hero__scroll');
  if (!indicator) return;
  const onScroll = () => {
    indicator.style.opacity = window.scrollY > 80 ? '0' : '0.4';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------- Boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNav();
  initNavScroll();
  initActiveNav();
  initCounters();
  initContactForm();
  initSmoothScroll();
  initHeroScroll();
});

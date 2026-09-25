// Arjun Mehta — Portfolio interactivity

(function () {
  'use strict';

  // ---------- Gallery data ----------
  const photos = [
    { src: 'https://images.unsplash.com/photo-1502923804217-28f3b19c78c4?auto=format&fit=crop&w=900&q=80', title: 'Crossing', location: 'Berlin, 2023' },
    { src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80', title: 'Night Walk', location: 'Tokyo, 2022' },
    { src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=900&q=80', title: 'Rush Hour', location: 'Mumbai, 2023' },
    { src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=80', title: 'City Lights', location: 'Chicago, 2021' },
    { src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=80', title: 'The Commute', location: 'London, 2022' },
    { src: 'https://images.unsplash.com/photo-1517457373958-fcaed30088f2?auto=format&fit=crop&w=900&q=80', title: 'Rainy Corner', location: 'Paris, 2023' },
    { src: 'https://images.unsplash.com/photo-1493553289266-e72701d40023?auto=format&fit=crop&w=900&q=80', title: 'Silent Street', location: 'Lisbon, 2021' },
    { src: 'https://images.unsplash.com/photo-1473181488821-2d23949a0450?auto=format&fit=crop&w=900&q=80', title: 'Market Day', location: 'Marrakech, 2022' },
    { src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=80', title: 'Morning Fog', location: 'Kyoto, 2023' }
  ];

  // ---------- Render gallery ----------
  const grid = document.getElementById('galleryGrid');
  if (grid) {
    grid.innerHTML = photos.map((p, i) => `
      <figure class="gallery-item" data-index="${i}" tabindex="0" role="button" aria-label="View ${p.title} — ${p.location}">
        <img src="${p.src}" alt="${p.title} — ${p.location}" loading="lazy" decoding="async" />
        <figcaption class="overlay">
          <div>
            <div class="font-display font-bold text-lg">${p.title}</div>
            <div class="text-xs opacity-80">${p.location}</div>
          </div>
        </figcaption>
      </figure>
    `).join('');
  }

  // ---------- Mobile menu ----------
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('hidden') === false;
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------- Lightbox ----------
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCap = document.getElementById('lbCap');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  let current = 0;
  let lastFocused = null;

  function openLightbox(i) {
    current = i;
    updateLightbox();
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.style.overflow = 'hidden';
    lastFocused = document.activeElement;
    lbClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  function updateLightbox() {
    const p = photos[current];
    lbImg.src = p.src.replace('w=900', 'w=1600');
    lbImg.alt = `${p.title} — ${p.location}`;
    lbCap.textContent = `${p.title} · ${p.location}`;
  }

  function next() { current = (current + 1) % photos.length; updateLightbox(); }
  function prev() { current = (current - 1 + photos.length) % photos.length; updateLightbox(); }

  if (grid) {
    grid.addEventListener('click', (e) => {
      const item = e.target.closest('.gallery-item');
      if (item) openLightbox(parseInt(item.dataset.index, 10));
    });
    grid.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const item = e.target.closest('.gallery-item');
        if (item) { e.preventDefault(); openLightbox(parseInt(item.dataset.index, 10)); }
      }
    });
  }

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbNext) lbNext.addEventListener('click', next);
  if (lbPrev) lbPrev.addEventListener('click', prev);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  // ---------- Contact form ----------
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();
      if (!name || !email || !message) {
        status.textContent = 'Please fill in all fields.';
        status.className = 'text-sm text-center text-red-600';
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.textContent = 'Please enter a valid email address.';
        status.className = 'text-sm text-center text-red-600';
        return;
      }
      status.textContent = `Thanks, ${name}! Your message has been received. I'll reply within 48 hours.`;
      status.className = 'text-sm text-center text-green-700 font-medium';
      form.reset();
    });
  }

  // ---------- Footer year ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

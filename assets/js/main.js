/* =========================================================
   BALKIS SELMI — PORTFOLIO SCRIPT
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Preloader ---------- */
  window.addEventListener('load', function () {
    var pre = document.getElementById('preloader');
    if (pre) {
      setTimeout(function () { pre.classList.add('hidden'); }, 400);
    }
  });

  /* ---------- Navbar scroll state ---------- */
  var nav = document.getElementById('navbar');
  function onScroll() {
    if (window.scrollY > 40) { nav.classList.add('scrolled'); }
    else { nav.classList.remove('scrolled'); }
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  toggle.addEventListener('click', function () {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      toggle.classList.remove('open');
      links.classList.remove('open');
    });
  });

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) { year.textContent = new Date().getFullYear(); }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- Certificates filter ---------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var certCards = document.querySelectorAll('.cert-card');
  certCards.forEach(function (c) { c.classList.add('show'); });

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');
      certCards.forEach(function (card) {
        var cat = card.getAttribute('data-cat') || 'none';
        var show = (filter === 'all' || cat === filter);
        card.classList.toggle('show', show);
      });
    });
  });

  /* ---------- Lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.cert-card img, .gallery-item img').forEach(function (img) {
    img.addEventListener('click', function (e) {
      e.stopPropagation();
      lightboxImg.src = img.src;
      var caption = img.closest('figure') ?
        img.closest('figure').innerText.replace(/[\n]+/g, ' | ') : '';
      lightboxCaption.textContent = caption || '';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) { closeLightbox(); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeLightbox(); }
  });

  /* ---------- Hero particles ---------- */
  var particlesEl = document.getElementById('particles');
  if (particlesEl) {
    var count = 26;
    for (var i = 0; i < count; i++) {
      var p = document.createElement('span');
      p.className = 'particle';
      var size = 3 + Math.random() * 5;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.opacity = (0.3 + Math.random() * 0.6).toFixed(2);
      p.style.animation = 'float ' + (4 + Math.random() * 6) + 's ease-in-out infinite';
      particlesEl.appendChild(p);
    }
  }
})();
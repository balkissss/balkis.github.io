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
  var filterBtns = document.querySelectorAll('.cert-filter-btn, .filter-btn:not(.gallery-filter-btn):not(.tab-btn)');
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

  /* ---------- Gallery filter ---------- */
  var galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  var galleryItems = document.querySelectorAll('.gallery-item');
  galleryFilterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      galleryFilterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');
      galleryItems.forEach(function (item) {
        var cat = item.getAttribute('data-cat') || 'all';
        var show = (filter === 'all' || cat === filter);
        item.style.display = show ? 'block' : 'none';
      });
    });
  });

  /* ---------- Projects filter ---------- */
  var projectFilterBtns = document.querySelectorAll('.project-filter-btn');
  var projectCards = document.querySelectorAll('.projects-grid .project-card');
  projectFilterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      projectFilterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');
      projectCards.forEach(function (card) {
        var categories = (card.getAttribute('data-category') || '').split(' ');
        var show = (filter === 'all' || categories.indexOf(filter) !== -1);
        card.style.display = show ? 'flex' : 'none';
      });
    });
  });

  /* ---------- Creative Studio Tabs ---------- */
  var tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('data-tab');
      var parentSection = btn.closest('section');
      if (!parentSection) return;
      parentSection.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
      parentSection.querySelectorAll('.tab-pane').forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      var targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  /* ---------- Video Modal Player ---------- */
  var videoModal = document.getElementById('videoModal');
  var videoPlayer = document.getElementById('videoModalPlayer');
  var videoTitle = document.getElementById('videoModalTitle');
  var videoDesc = document.getElementById('videoModalDesc');
  var videoClose = document.getElementById('videoModalClose');

  function openVideoModal(src, title, desc) {
    if (!videoModal || !videoPlayer) return;
    videoPlayer.src = src;
    if (videoTitle) videoTitle.innerHTML = '<i class="fa-solid fa-circle-play"></i> ' + (title || 'Video Player');
    if (videoDesc) videoDesc.textContent = desc || '';
    videoModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    videoPlayer.play().catch(function () {});
  }

  function closeVideoModal() {
    if (!videoModal || !videoPlayer) return;
    videoPlayer.pause();
    videoPlayer.removeAttribute('src');
    videoPlayer.load();
    videoModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-video-src]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      var src = el.getAttribute('data-video-src');
      var title = el.getAttribute('data-video-title') || el.closest('.project-card, .record-card, .video-card')?.querySelector('h3')?.textContent || '';
      var desc = el.getAttribute('data-video-desc') || el.closest('.project-card, .record-card, .video-card')?.querySelector('p')?.textContent || '';
      openVideoModal(src, title, desc);
    });
  });

  if (videoClose) {
    videoClose.addEventListener('click', closeVideoModal);
  }
  if (videoModal) {
    videoModal.addEventListener('click', function (e) {
      if (e.target === videoModal) closeVideoModal();
    });
  }

  /* ---------- Lightbox for Images ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lightboxClose = document.getElementById('lightboxClose');

  var zoomableSelector = '.cert-card img, .gallery-item img, .poster-card img, .logo-card img, .pres-thumb-wrap img, .zoomable';
  document.querySelectorAll(zoomableSelector).forEach(function (img) {
    img.addEventListener('click', function (e) {
      e.stopPropagation();
      lightboxImg.src = img.src;
      var caption = '';
      var fig = img.closest('figure');
      var card = img.closest('.poster-card, .logo-card, .pres-card, .gallery-item, .cert-card');
      if (fig) {
        caption = fig.innerText.replace(/[\n]+/g, ' | ').trim();
      } else if (card) {
        var h = card.querySelector('h3, h4');
        var sub = card.querySelector('span, figcaption, p');
        caption = (h ? h.innerText : '') + (sub ? ' | ' + sub.innerText : '');
      }
      lightboxCaption.textContent = caption || img.alt || '';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) { closeLightbox(); }
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeLightbox();
      closeVideoModal();
    }
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
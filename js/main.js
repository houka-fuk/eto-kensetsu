/* ============================================================
   株式会社エトウ — main.js
   Behavior spec: design_handoff_eto_website/README.md
   ============================================================ */

(function () {
  'use strict';

  const header    = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay   = document.getElementById('overlay');
  const backToTop = document.getElementById('backToTop');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ===== スクロール連動（ヘッダー / トップへ戻る） =====
  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 80);
    backToTop.classList.toggle('is-visible', y > 400);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  });

  // ===== モバイルメニュー =====
  let menuOpen = false;

  function setMenu(open) {
    menuOpen = open;
    mobileMenu.classList.toggle('is-open', open);
    overlay.classList.toggle('is-open', open);
    hamburger.classList.toggle('is-open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    document.body.style.overflow = open ? 'hidden' : '';
  }

  hamburger.addEventListener('click', function () { setMenu(!menuOpen); });
  overlay.addEventListener('click', function () { setMenu(false); });
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuOpen) setMenu(false);
  });

  // ===== スクロールフェードイン（.js-fade） =====
  if ('IntersectionObserver' in window && !reducedMotion) {
    const fadeObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay || '0', 10);
          setTimeout(function () { entry.target.classList.add('is-visible'); }, delay);
          fadeObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.js-fade').forEach(function (el) { fadeObs.observe(el); });
  } else {
    document.querySelectorAll('.js-fade').forEach(function (el) { el.classList.add('is-visible'); });
  }

  // ===== スタッツカウントアップ =====
  function animCount(id, from, to, dur) {
    const el = document.getElementById(id);
    if (!el) return;
    if (reducedMotion) { el.textContent = to; return; }
    const t0 = performance.now();
    function step(now) {
      const t = Math.min((now - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(from + (to - from) * ease);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const stats = document.getElementById('heroStats');
  if (stats && 'IntersectionObserver' in window) {
    const countObs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        animCount('cntYear', 1820, 1920, 1600);
        animCount('cntProj', 0, 500, 2000);
        animCount('cntRev', 0, 80, 1800);
        countObs.disconnect();
      }
    }, { threshold: 0.5 });
    countObs.observe(stats);
  } else {
    animCount('cntYear', 1920, 1920, 0);
    animCount('cntProj', 500, 500, 0);
    animCount('cntRev', 80, 80, 0);
  }

  // ===== スムーズスクロール（ヘッダー高さオフセット） =====
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const id = a.getAttribute('href');
      if (id === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
        return;
      }
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - (header.offsetHeight + 12);
        window.scrollTo({ top: top, behavior: reducedMotion ? 'auto' : 'smooth' });
      }
    });
  });

  // ===== お問い合わせフォーム =====
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;
      let firstInvalid = null;

      form.querySelectorAll('[required]').forEach(function (field) {
        const ok = field.value.trim().length > 0;
        field.classList.toggle('is-error', !ok);
        if (!ok) {
          valid = false;
          if (!firstInvalid) firstInvalid = field;
        }
      });

      const email = document.getElementById('email');
      if (email && email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.classList.add('is-error');
        valid = false;
        if (!firstInvalid) firstInvalid = email;
      }

      if (!valid) {
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const old = document.getElementById('formSuccess');
      if (old) old.remove();
      const msg = document.createElement('div');
      msg.id = 'formSuccess';
      msg.className = 'form-success';
      msg.setAttribute('role', 'status');
      msg.textContent = 'お問い合わせを受け付けました。担当者よりご連絡いたします。';
      form.appendChild(msg);
      form.reset();
      setTimeout(function () {
        const m = document.getElementById('formSuccess');
        if (m) m.remove();
      }, 8000);
    });

    // エラー表示は入力し直したらクリア
    form.querySelectorAll('.eto-input').forEach(function (field) {
      field.addEventListener('input', function () { field.classList.remove('is-error'); });
    });
  }
})();

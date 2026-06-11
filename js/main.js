/* ============================================================
   ETO建設株式会社 — main.js
   ============================================================ */

(function () {
  'use strict';

  // ===== 要素の取得 =====
  const header    = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  const backToTop = document.getElementById('backToTop');

  // ===== ヘッダー: スクロールで背景変化 =====
  function onScroll() {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
      backToTop.classList.add('visible');
    } else {
      header.classList.remove('scrolled');
      backToTop.classList.remove('visible');
    }
    updateActiveNav();
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ===== ハンバーガーメニュー =====
  function closeMenu() {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  function openMenu() {
    hamburger.classList.add('open');
    navLinks.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  hamburger.addEventListener('click', function () {
    const isOpen = navLinks.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  // リンククリックでメニューを閉じる
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // メニュー外タップで閉じる
  document.addEventListener('click', function (e) {
    if (navLinks.classList.contains('open') && !header.contains(e.target)) {
      closeMenu();
    }
  });

  // ESC キーで閉じる
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  // ===== アクティブナビゲーション =====
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');
    let current = '';

    sections.forEach(function (section) {
      if (window.scrollY >= section.offsetTop - 140) {
        current = section.id;
      }
    });

    navItems.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  // ===== フェードインアニメーション (IntersectionObserver) =====
  var fadeTargets = [
    '.service-card',
    '.news-item',
    '.stat',
    '.company-table tr',
    '.about-text',
    '.about-visual',
    '.contact-info',
    '.contact-form',
    '.company-wrapper',
    '.twitter-feed',
    '.news-list',
  ];

  var allFadeEls = document.querySelectorAll(fadeTargets.join(','));

  allFadeEls.forEach(function (el) {
    el.classList.add('fade-in');
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var delay = parseInt(entry.target.dataset.fadeDelay, 10) || 0;
            setTimeout(function () {
              entry.target.classList.add('visible');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // グリッド内の子要素には順番に遅延を付与
    var cardGrids = document.querySelectorAll(
      '.services-grid, .about-stats, .news-list, .contact-info'
    );

    cardGrids.forEach(function (grid) {
      var children = grid.querySelectorAll('.fade-in');
      children.forEach(function (child, i) {
        child.dataset.fadeDelay = i * 100;
      });
    });

    allFadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // IntersectionObserver 非対応環境ではすぐ表示
    allFadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ===== お問い合わせフォーム =====
  var contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // 簡易バリデーション
      var requiredFields = contactForm.querySelectorAll('[required]');
      var isValid = true;

      requiredFields.forEach(function (field) {
        field.style.borderColor = '';
        if (!field.value.trim()) {
          field.style.borderColor = '#e05252';
          isValid = false;
        }
      });

      if (!isValid) {
        var firstInvalid = contactForm.querySelector('[required][style*="e05252"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // メール形式チェック
      var emailField = contactForm.querySelector('#email');
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailField && !emailPattern.test(emailField.value.trim())) {
        emailField.style.borderColor = '#e05252';
        emailField.focus();
        return;
      }

      /*
        ★ フォーム送信処理をここに実装してください。
        例: Formspree を使う場合
            fetch('https://formspree.io/f/YOUR_FORM_ID', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(Object.fromEntries(new FormData(contactForm)))
            });
      */

      // 送信完了メッセージ（仮）
      showFormSuccess();
      contactForm.reset();
    });
  }

  function showFormSuccess() {
    var existing = document.getElementById('form-success-msg');
    if (existing) existing.remove();

    var msg = document.createElement('p');
    msg.id = 'form-success-msg';
    msg.textContent = 'お問い合わせを受け付けました。担当者よりご連絡いたします。';
    msg.style.cssText = [
      'color: #2d7a2d',
      'background: #edf7ed',
      'border: 1.5px solid #2d7a2d',
      'border-radius: 6px',
      'padding: 1rem 1.25rem',
      'font-size: 0.92rem',
      'font-weight: 500',
      'margin-top: 0.25rem',
      'grid-column: 1 / -1',
    ].join(';');

    contactForm.appendChild(msg);

    setTimeout(function () {
      var el = document.getElementById('form-success-msg');
      if (el) el.remove();
    }, 8000);
  }

  // ===== トップへ戻るボタン =====
  if (backToTop) {
    backToTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== スムーズスクロール（href="#xxx" のリンク） =====
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return; // トップ戻りはネイティブに任せる

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset = header.offsetHeight + 16;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ===== 初期実行 =====
  onScroll();
})();

/* =========================================================
   branchead — interactions
   ========================================================= */
(() => {
  'use strict';

  const doc = document;
  const root = doc.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  /* ---------- Theme ---------- */
  const themeButton = doc.querySelector('[data-theme-toggle]');
  const themeMeta = doc.querySelector('meta[name="theme-color"]');

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    try { localStorage.setItem('bh-theme', theme); } catch (_) {}
    if (themeMeta) themeMeta.content = theme === 'light' ? '#f5f8ee' : '#0b0e0b';
    if (themeButton) {
      const next = theme === 'dark' ? 'ライト' : 'ダーク';
      themeButton.setAttribute('aria-label', `${next}テーマに切り替える`);
      themeButton.title = `${next}テーマに切り替える`;
    }
  };

  if (themeButton) {
    // Sync button state with the theme chosen in the inline head script.
    applyTheme(root.dataset.theme === 'light' ? 'light' : 'dark');
    themeButton.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      if (doc.startViewTransition && !reduceMotion.matches) {
        doc.startViewTransition(() => applyTheme(next));
      } else {
        applyTheme(next);
      }
    });
  }

  /* ---------- Header & scroll progress ---------- */
  const header = doc.querySelector('[data-header]');
  const progress = doc.querySelector('[data-scroll-progress]');
  let scrollTicking = false;

  const updateScroll = () => {
    const y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('is-scrolled', y > 18);
    if (progress) {
      const max = doc.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(Math.max(y / max, 0), 1) : 0;
      progress.style.transform = `scaleX(${ratio})`;
    }
    scrollTicking = false;
  };

  const onScroll = () => {
    if (!scrollTicking) {
      scrollTicking = true;
      window.requestAnimationFrame(updateScroll);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  updateScroll();

  /* ---------- Mobile menu ---------- */
  const menu = doc.getElementById('mobile-menu');
  const menuOpen = doc.querySelector('[data-menu-open]');
  const menuClose = doc.querySelector('[data-menu-close]');

  const syncDialogState = () => {
    doc.body.classList.toggle('dialog-open', Boolean(doc.querySelector('dialog[open]')));
  };

  if (menu && menuOpen) {
    menuOpen.addEventListener('click', () => {
      menu.showModal();
      syncDialogState();
      const firstLink = menu.querySelector('a');
      if (firstLink) firstLink.focus({ preventScroll: true });
    });
    menu.addEventListener('close', syncDialogState);
    if (menuClose) menuClose.addEventListener('click', () => menu.close());
    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => menu.close());
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealItems = doc.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealItems.length) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-in'));
  }

  /* ---------- Subtle pointer parallax ---------- */
  const setupTilt = (element, maxTilt = 4) => {
    if (!element || !finePointer.matches || reduceMotion.matches) return;
    let frame = null;
    let targetX = 0;
    let targetY = 0;

    const render = () => {
      element.style.transform = `perspective(900px) rotateX(${targetY}deg) rotateY(${targetX}deg)`;
      frame = null;
    };

    element.addEventListener('pointermove', (event) => {
      const rect = element.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      targetX = (px - 0.5) * maxTilt * 2;
      targetY = (0.5 - py) * maxTilt * 1.4;
      if (!frame) frame = window.requestAnimationFrame(render);
    });

    element.addEventListener('pointerleave', () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = null;
      element.style.transform = '';
    });
  };

  doc.querySelectorAll('[data-tilt]').forEach((element) => setupTilt(element, 4));
  doc.querySelectorAll('[data-parallax]').forEach((element) => setupTilt(element, 2.4));

  /* ---------- Copy email ---------- */
  doc.querySelectorAll('[data-copy-email]').forEach((button) => {
    const defaultLabel = button.querySelector('span');
    button.addEventListener('click', async () => {
      const email = button.dataset.copyEmail || 'hello@branchead.com';
      try {
        await navigator.clipboard.writeText(email);
      } catch (_) {
        const temp = doc.createElement('textarea');
        temp.value = email;
        temp.setAttribute('readonly', '');
        temp.style.position = 'fixed';
        temp.style.opacity = '0';
        doc.body.appendChild(temp);
        temp.select();
        try { doc.execCommand('copy'); } catch (__) {}
        temp.remove();
      }
      if (defaultLabel) {
        const original = defaultLabel.textContent;
        button.classList.add('is-copied');
        defaultLabel.textContent = 'コピーしました';
        window.setTimeout(() => {
          button.classList.remove('is-copied');
          defaultLabel.textContent = original;
        }, 2000);
      }
    });
  });

  /* ---------- Project filtering ---------- */
  const filterButtons = doc.querySelectorAll('[data-filter]');
  const workCards = Array.from(doc.querySelectorAll('[data-categories]'));
  const filterCount = doc.querySelector('[data-filter-count]');

  if (filterButtons.length && workCards.length) {
    const applyFilter = (filter) => {
      let visible = 0;
      filterButtons.forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.filter === filter));
      });

      workCards.forEach((card) => {
        const categories = (card.dataset.categories || '').split(/\s+/);
        const show = filter === 'all' || categories.includes(filter);
        card.classList.toggle('is-filtered', !show);
        card.hidden = !show;
        if (show) {
          visible += 1;
          card.classList.remove('is-entering');
          // Restart the entrance animation for each filter change.
          void card.offsetWidth;
          card.classList.add('is-entering');
        }
      });

      if (filterCount) {
        filterCount.textContent = `${String(visible).padStart(2, '0')} / ${String(workCards.length).padStart(2, '0')} projects`;
      }
    };

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => applyFilter(button.dataset.filter || 'all'));
    });
    applyFilter('all');
  }

  /* ---------- Project dialogs ---------- */
  const projectLinks = doc.querySelectorAll('[data-project-open]');
  const dialogs = Array.from(doc.querySelectorAll('.project-dialog'));

  if (projectLinks.length && dialogs.length && typeof HTMLDialogElement !== 'undefined') {
    let lastTrigger = null;

    const openDialog = (dialog, pushHistory = true) => {
      if (!dialog || dialog.open) return;
      dialog.scrollTop = 0;
      dialog.showModal();
      syncDialogState();
      if (pushHistory) {
        try { history.pushState({ dialog: dialog.id }, '', `#${dialog.id}`); } catch (_) {}
      }
      const close = dialog.querySelector('[data-dialog-close]');
      if (close) close.focus({ preventScroll: true });
    };

    const closeDialog = (dialog) => {
      if (dialog && dialog.open) dialog.close();
    };

    projectLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        const id = (link.getAttribute('href') || '').replace(/^#/, '');
        const dialog = doc.getElementById(id);
        if (!dialog) return;
        event.preventDefault();
        lastTrigger = link;
        openDialog(dialog);
      });
    });

    dialogs.forEach((dialog) => {
      const close = dialog.querySelector('[data-dialog-close]');
      if (close) close.addEventListener('click', () => closeDialog(dialog));

      dialog.addEventListener('click', (event) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const outside = event.clientX < rect.left || event.clientX > rect.right
          || event.clientY < rect.top || event.clientY > rect.bottom;
        if (outside) closeDialog(dialog);
      });

      dialog.addEventListener('close', () => {
        syncDialogState();
        if (location.hash === `#${dialog.id}`) {
          try { history.replaceState(null, '', `${location.pathname}${location.search}`); } catch (_) {}
        }
        if (lastTrigger && doc.contains(lastTrigger)) {
          lastTrigger.focus({ preventScroll: true });
        }
      });
    });

    const openFromHash = () => {
      const id = location.hash.replace(/^#/, '');
      const dialog = id ? doc.getElementById(id) : null;
      if (dialog && dialog.classList.contains('project-dialog')) openDialog(dialog, false);
    };

    window.addEventListener('popstate', () => {
      dialogs.forEach((dialog) => {
        if (dialog.open) dialog.close();
      });
      openFromHash();
    });

    window.addEventListener('load', openFromHash, { once: true });
    if (doc.readyState === 'complete') openFromHash();
  }
})();

/* =========================================================
   branchead — minimal interactions
   罫線の開放アニメーションと、メールアドレスのコピーのみ。
   ========================================================= */
(() => {
  'use strict';

  const doc = document;

  /* ---------- Rule lines released on scroll ---------- */
  const streakHosts = Array.from(doc.querySelectorAll('main > section'));
  const footer = doc.querySelector('.site-footer');
  const streaks = [];

  const makeStreak = (host, index) => {
    const line = doc.createElement('span');
    line.className = index % 2 ? 'streak streak--right' : 'streak';
    line.setAttribute('aria-hidden', 'true');
    host.prepend(line);
    streaks.push(line);
  };

  streakHosts.forEach((host, index) => makeStreak(host, index));
  if (footer) makeStreak(footer, streakHosts.length);

  if ('IntersectionObserver' in window && streaks.length) {
    const streakObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -4% 0px' });
    streaks.forEach((line) => streakObserver.observe(line));
  } else {
    streaks.forEach((line) => line.classList.add('is-in'));
  }

  /* ---------- Copy contact handle ---------- */
  doc.querySelectorAll('[data-copy]').forEach((button) => {
    const label = button.querySelector('span');
    button.addEventListener('click', async () => {
      const text = button.dataset.copy || '';
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
      } catch (_) {
        const temp = doc.createElement('textarea');
        temp.value = text;
        temp.setAttribute('readonly', '');
        temp.style.position = 'fixed';
        temp.style.opacity = '0';
        doc.body.appendChild(temp);
        temp.select();
        try { doc.execCommand('copy'); } catch (__) {}
        temp.remove();
      }
      if (label) {
        const original = label.textContent;
        button.classList.add('is-copied');
        label.textContent = 'コピーしました';
        window.setTimeout(() => {
          button.classList.remove('is-copied');
          label.textContent = original;
        }, 2000);
      }
    });
  });
})();

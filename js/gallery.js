/* ============================================================
   DOMAĆINSTVO JOVIĆ — gallery.js (lightbox)
   ============================================================ */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const links = [...document.querySelectorAll('.masonry a')];
  if (!links.length) return;

  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = `
    <button class="lb-close" aria-label="Zatvori">✕</button>
    <button class="lb-prev" aria-label="Prethodna">‹</button>
    <img alt="">
    <button class="lb-next" aria-label="Sljedeća">›</button>`;
  document.body.appendChild(lb);

  const img = lb.querySelector('img');
  let idx = 0;

  const show = (i) => {
    idx = (i + links.length) % links.length;
    img.src = links[idx].href;
    img.alt = links[idx].querySelector('img')?.alt || '';
  };
  const open = (i) => { show(i); lb.classList.add('is-open'); document.body.style.overflow = 'hidden'; };
  const close = () => { lb.classList.remove('is-open'); document.body.style.overflow = ''; };

  links.forEach((a, i) => a.addEventListener('click', e => { e.preventDefault(); open(i); }));
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', () => show(idx - 1));
  lb.querySelector('.lb-next').addEventListener('click', () => show(idx + 1));
  lb.addEventListener('click', e => { if (e.target === lb) close(); });

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });

  /* Swipe na mobilnom */
  let sx = 0;
  lb.addEventListener('touchstart', e => sx = e.touches[0].clientX, { passive: true });
  lb.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
  }, { passive: true });
});

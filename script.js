/* ─────────────────────────────────────────────
   script.js  —  Muhiuddin Shanto Portfolio
───────────────────────────────────────────── */

/* ── 1. THEME TOGGLE ── */
const html      = document.documentElement;
const toggleBtn = document.getElementById('themeToggle');

// Auto-detect system preference on first visit
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const saved       = localStorage.getItem('theme');
const initTheme   = saved || (prefersDark ? 'dark' : 'light');
html.setAttribute('data-theme', initTheme);

toggleBtn.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* ── 2. CUSTOM CURSOR ── */
const cur  = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');

let mx = 0, my = 0;   // mouse position (instant)
let rx = 0, ry = 0;   // ring position (lagged)

// Move the dot instantly
document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = (mx - 6) + 'px';
  cur.style.top  = (my - 6) + 'px';
});

// Animate the ring with spring lag
function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = (rx - 18) + 'px';
  ring.style.top  = (ry - 18) + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Cursor scale on interactive elements
document.querySelectorAll('a, button, .sk, .pj, .wc, .svc').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cur.style.transform        = 'scale(2.5)';
    ring.style.transform       = 'scale(1.5)';
    ring.style.borderColor     = 'rgba(200,255,94,0.6)';
  });
  el.addEventListener('mouseleave', () => {
    cur.style.transform        = 'scale(1)';
    ring.style.transform       = 'scale(1)';
    ring.style.borderColor     = 'rgba(200,255,94,0.35)';
  });
});

/* ── 3. STICKY NAV ON SCROLL ── */
window.addEventListener('scroll', () => {
  document.getElementById('nav')
    .classList.toggle('scrolled', window.scrollY > 60);
});

/* ── 4. REVEAL ON SCROLL (IntersectionObserver) ── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger each visible element slightly
        setTimeout(() => entry.target.classList.add('in'), i * 90);
      }
    });
  },
  { threshold: 0.06 }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── 5. COPY EMAIL BUTTON ── */
document.getElementById('copyBtn').addEventListener('click', function () {
  navigator.clipboard.writeText('muhiuddinshanto@gmail.com');

  const originalHTML = this.innerHTML;

  this.innerHTML =
    '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
    '<path d="M20 6L9 17l-5-5"/></svg> Copied!';
  this.style.borderColor = 'rgba(200,255,94,0.4)';
  this.style.color       = 'var(--lime)';

  setTimeout(() => {
    this.innerHTML         = originalHTML;
    this.style.borderColor = '';
    this.style.color       = '';
  }, 2200);
});
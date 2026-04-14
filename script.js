/* ─────────────────────────────────────────
   script.js — Sneha Baskaran Portfolio
   ───────────────────────────────────────── */

/* ── CUSTOM CURSOR ── */
const cursor    = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

// Move dot cursor instantly with mouse
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// Animate ring cursor with smooth lag
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Cursor scale effect on interactive elements
const hoverTargets = document.querySelectorAll(
  'a, button, .skill-card, .project-card, .edu-card, .exp-card'
);

hoverTargets.forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform    = 'translate(-50%, -50%) scale(2)';
    cursorRing.style.width    = '60px';
    cursorRing.style.height   = '60px';
    cursorRing.style.opacity  = '0.3';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform    = 'translate(-50%, -50%) scale(1)';
    cursorRing.style.width    = '36px';
    cursorRing.style.height   = '36px';
    cursorRing.style.opacity  = '0.5';
  });
});


/* ── SCROLL REVEAL ── */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger each visible element slightly
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach((el) => revealObserver.observe(el));


/* ── ACTIVE NAV HIGHLIGHT ON SCROLL ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 200) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--accent)';
    } else {
      link.style.color = '';
    }
  });
});

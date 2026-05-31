// ════════════════════════════════
// PARA VOCÊ · CHAYANNE
// ════════════════════════════════

const START = new Date('2024-05-30T00:00:00');
const CHAPTERS = ['capa','cap1','cap2','cap3','cap4','cap5','cap6','cap7','cap8','fim'];

const root   = () => document.getElementById('scroll-root');
const $ = id => document.getElementById(id);

document.addEventListener('DOMContentLoaded', () => {
  registerSW();
  initSplash();
  initCursor();
  initProgress();
  initNavDots();
  initReveal();
  initParticles();
  initEmbers();
  initFieldLines();
  initOrbits();
  initSnow();
  initRain();
  initLightning();
  initGoldParticles();
  initHearts();
  initCounter();
});

// ── Service Worker ──
function registerSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
}

// ── Splash ──
function initSplash() {
  const el = $('splash');
  setTimeout(() => {
    el.classList.add('out');
    setTimeout(() => el.remove(), 950);
  }, 2800);
}

// ── Cursor (desktop) ──
function initCursor() {
  const c = $('cursor');
  if (!c || !window.matchMedia('(pointer:fine)').matches) return;
  let mx = 0, my = 0, cx = 0, cy = 0;
  const sc = $('screen');
  sc.addEventListener('mousemove', e => {
    const r = sc.getBoundingClientRect();
    mx = e.clientX - r.left;
    my = e.clientY - r.top;
  });
  (function loop() {
    cx += (mx - cx) * 0.16;
    cy += (my - cy) * 0.16;
    c.style.left = cx + 'px';
    c.style.top  = cy + 'px';
    requestAnimationFrame(loop);
  })();
}

// ── Scroll progress & nav sync ──
function initProgress() {
  const pl = $('prog-left');
  const pb = $('prog-bottom');
  const sr = root();
  sr.addEventListener('scroll', () => {
    const pct = Math.min(100, (sr.scrollTop / (sr.scrollHeight - sr.clientHeight)) * 100);
    pl.style.height = pct + '%';
    pb.style.width  = pct + '%';
    syncDots();
  }, { passive: true });
}

// ── Nav dots ──
function initNavDots() {
  const nav = $('nav-dots');
  CHAPTERS.forEach(id => {
    const d = document.createElement('button');
    d.className = 'nd';
    d.setAttribute('aria-label', id);
    d.addEventListener('click', () => {
      const el = $(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
    nav.appendChild(d);
  });
  syncDots();
}

function syncDots() {
  const sr  = root();
  const mid = sr.scrollTop + sr.clientHeight * 0.5;
  const dots = document.querySelectorAll('.nd');
  let active = 0;
  CHAPTERS.forEach((id, i) => {
    const el = $(id);
    if (el && el.offsetTop <= mid) active = i;
  });
  dots.forEach((d, i) => d.classList.toggle('on', i === active));
}

// ── Reveal via IntersectionObserver ──
function initReveal() {
  const sr = root();
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('vis');
        obs.unobserve(e.target);
      }
    });
  }, { root: sr, threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ════════════════════════════════
// CAPA — floating particles canvas
// ════════════════════════════════
function initParticles() {
  const cv = $('capa-canvas');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  const cols = ['#ff6b6b','#feca57','#48dbfb','#a29bfe','#fd79a8'];
  let W, H, ps;

  function resize() {
    W = cv.width  = cv.offsetWidth;
    H = cv.height = cv.offsetHeight;
  }

  function make() {
    return Array.from({ length: 55 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2.2 + 0.7,
      c: cols[Math.random() * cols.length | 0],
      vx: (Math.random() - .5) * .4,
      vy: -(Math.random() * .5 + .15),
      a: Math.random() * .4 + .15,
    }));
  }

  resize(); ps = make();
  window.addEventListener('resize', () => { resize(); ps = make(); });

  (function draw() {
    ctx.clearRect(0, 0, W, H);
    ps.forEach(p => {
      ctx.globalAlpha = p.a;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.c;
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if (p.y < -10) p.y = H + 10;
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  })();
}

// ════════════════════════════════
// CAP 1 — ember particles (canvas)
// ════════════════════════════════
function initEmbers() {
  const cv = $('embers-canvas');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  let W, H;

  function resize() {
    W = cv.width  = cv.offsetWidth;
    H = cv.height = cv.offsetHeight;
  }
  resize();

  const embers = Array.from({ length: 40 }, () => mkEmber(true));

  function mkEmber(init) {
    return {
      x:  Math.random() * (W || 390),
      y:  init ? Math.random() * (H || 844) : (H || 844) + 10,
      r:  Math.random() * 2.5 + .8,
      vy: -(Math.random() * 1.2 + .4),
      vx: (Math.random() - .5) * .6,
      life: Math.random(),
      decay: Math.random() * .003 + .001,
      hue: 30 + Math.random() * 30,
    };
  }

  (function draw() {
    ctx.clearRect(0, 0, W, H);
    embers.forEach((e, i) => {
      ctx.globalAlpha = e.life * .85;
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.r * e.life, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${e.hue},100%,65%)`;
      ctx.fill();
      // glow
      ctx.globalAlpha = e.life * .25;
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.r * e.life * 3, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${e.hue},100%,60%)`;
      ctx.fill();

      e.x += e.vx; e.y += e.vy;
      e.life -= e.decay;
      if (e.life <= 0) embers[i] = mkEmber(false);
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  })();
}

// ════════════════════════════════
// CAP 2 — magnetic field lines (CSS)
// ════════════════════════════════
function initFieldLines() {
  const cont = $('field-lines');
  if (!cont) return;
  for (let i = 0; i < 8; i++) {
    const el = document.createElement('div');
    el.className = 'field-line';
    const s = 80 + i * 55;
    el.style.cssText = `
      width:${s}px; height:${s}px;
      left:50%; top:50%;
      transform: translate(-50%,-50%);
      animation-delay:${i * .4}s;
      animation-duration:${2.5 + i * .3}s;
    `;
    cont.appendChild(el);
  }
}

// ════════════════════════════════
// CAP 3 — orbiting dots
// ════════════════════════════════
function initOrbits() {
  const cont = $('orbits-bg');
  if (!cont) return;
  const radii = [80,130,180,230];
  radii.forEach((r, i) => {
    const dot = document.createElement('div');
    dot.className = 'orbit-dot';
    dot.style.cssText = `
      --r: ${r}px;
      animation-duration: ${10 + i * 4}s;
      animation-delay: ${-i * 3}s;
      opacity: ${0.5 - i * 0.08};
      width: ${7 - i}px;
      height: ${7 - i}px;
      margin-left: ${-(3.5 - i*.5)}px;
      margin-top: ${-(3.5 - i*.5)}px;
    `;
    cont.appendChild(dot);
  });
}

// ════════════════════════════════
// CAP 4 — snow
// ════════════════════════════════
function initSnow() {
  const cont = $('snow-cont');
  if (!cont) return;
  const chars = ['❄','❅','❆','·','∗','•'];

  function spawn() {
    const f = document.createElement('span');
    f.className = 'flake';
    f.textContent = chars[Math.random() * chars.length | 0];
    f.style.cssText = `
      left: ${Math.random() * 100}%;
      font-size: ${Math.random() * 14 + 8}px;
      animation-duration: ${Math.random() * 7 + 5}s;
      animation-delay: ${Math.random() * 3}s;
      opacity: ${Math.random() * .5 + .3};
    `;
    cont.appendChild(f);
    setTimeout(() => f.remove(), 13000);
  }

  for (let i = 0; i < 20; i++) setTimeout(spawn, Math.random() * 4000);
  setInterval(spawn, 480);
}

// ════════════════════════════════
// CAP 5 — rain
// ════════════════════════════════
function initRain() {
  const cont = $('rain-cont');
  if (!cont) return;
  for (let i = 0; i < 70; i++) {
    const d = document.createElement('div');
    d.className = 'raindrop';
    d.style.cssText = `
      left: ${Math.random() * 100}%;
      height: ${Math.random() * 22 + 10}px;
      animation-duration: ${Math.random() * .55 + .35}s;
      animation-delay: ${Math.random() * 2.5}s;
    `;
    cont.appendChild(d);
  }
}

// ════════════════════════════════
// CAP 5 — lightning
// ════════════════════════════════
function initLightning() {
  const over = document.querySelector('.lightning-over');
  if (!over) return;

  function flash() {
    over.classList.add('flash');
    setTimeout(() => {
      over.classList.remove('flash');
      setTimeout(() => {
        over.classList.add('flash');
        setTimeout(() => over.classList.remove('flash'), 55);
      }, 100);
    }, 70);
  }

  (function sched() {
    setTimeout(() => { flash(); sched(); }, 5000 + Math.random() * 7000);
  })();
}

// ════════════════════════════════
// CAP 8 — gold shimmer particles
// ════════════════════════════════
function initGoldParticles() {
  const cont = $('gold-particles');
  if (!cont) return;

  function spawn() {
    const p = document.createElement('div');
    const x = Math.random() * 100;
    const size = Math.random() * 3 + 1;
    p.style.cssText = `
      position: absolute;
      left: ${x}%;
      bottom: ${Math.random() * 100}%;
      width: ${size}px; height: ${size}px;
      border-radius: 50%;
      background: hsl(${45 + Math.random() * 15}, 100%, ${60 + Math.random() * 20}%);
      animation: heartRise ${Math.random() * 6 + 4}s ease-in ${Math.random() * 2}s infinite;
      opacity: 0;
    `;
    cont.appendChild(p);
    setTimeout(() => p.remove(), 12000);
  }

  for (let i = 0; i < 15; i++) setTimeout(spawn, Math.random() * 3000);
  setInterval(spawn, 700);
}

// ════════════════════════════════
// FIM — rising hearts
// ════════════════════════════════
function initHearts() {
  const cont = $('hearts-cont');
  if (!cont) return;

  function spawn() {
    const h = document.createElement('div');
    h.className = 'hrt';
    h.textContent = '♥';
    h.style.cssText = `
      left: ${5 + Math.random() * 90}%;
      font-size: ${Math.random() * 18 + 10}px;
      animation-duration: ${Math.random() * 5 + 5}s;
      animation-delay: ${Math.random() * 1.5}s;
    `;
    cont.appendChild(h);
    setTimeout(() => h.remove(), 12000);
  }

  for (let i = 0; i < 14; i++) setTimeout(spawn, Math.random() * 3500);
  setInterval(spawn, 950);
}

// ════════════════════════════════
// FIM — animated day counter
// ════════════════════════════════
function initCounter() {
  const el = $('day-num');
  if (!el) return;

  const total = Math.floor((Date.now() - START.getTime()) / 86_400_000);
  let started = false;
  const sr = root();

  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !started) {
      started = true; obs.disconnect();
      const t0 = performance.now();
      const dur = 1800;
      (function animate(now) {
        const ease = 1 - Math.pow(1 - Math.min((now - t0) / dur, 1), 3);
        el.textContent = Math.floor(ease * total).toLocaleString('pt-BR');
        if (ease < 1) requestAnimationFrame(animate);
        else el.textContent = total.toLocaleString('pt-BR');
      })(performance.now());
    }
  }, { root: sr, threshold: .4 });

  obs.observe(el.parentElement);
  el.textContent = '0';
}

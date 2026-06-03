/* ============================================================
   DINOUSEG — app.js
   WebGL plasma shader, lazy image loader w/ skeletons,
   parallax, scroll progress, reveal-on-scroll, renderers.
   ============================================================ */

(function () {
  'use strict';

  const prefersReduced = matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  /* ---------- helpers ---------- */
  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  /* Lazy image: takes an <img> with data-src, fades in on load.
     Adds .loaded when ready; hides a sibling .placeholder if present. */
  const imgObserver =
    'IntersectionObserver' in window
      ? new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((en) => {
              if (en.isIntersecting) {
                loadImg(en.target);
                obs.unobserve(en.target);
              }
            });
          },
          { rootMargin: '200px' }
        )
      : null;

  function loadImg(img) {
    const src = img.getAttribute('data-src');
    if (!src) return;
    img.onload = () => {
      img.classList.add('loaded');
      const ph = img.parentNode.querySelector('.placeholder');
      if (ph) ph.style.display = 'none';
    };
    img.onerror = () => {
      img.style.display = 'none';
    };
    img.src = src;
  }

  function lazy(img) {
    if (imgObserver) imgObserver.observe(img);
    else loadImg(img);
  }

  /* Reveal on scroll */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          revealObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
  );
  function observeReveals(scope) {
    (scope || document)
      .querySelectorAll('.reveal:not(.in)')
      .forEach((el) => revealObserver.observe(el));
  }

  /* expose a couple to inline scripts / fallbacks */
  window.__dino = { lazy, observeReveals, el };

  /* =========================================================
     WebGL PLASMA / FLUID NOISE SHADER
     ========================================================= */
  function initShader() {
    if (prefersReduced) return;
    const cvs = document.getElementById('shader');
    if (!cvs) return;
    const gl =
      cvs.getContext('webgl', { antialias: false, alpha: true }) ||
      cvs.getContext('experimental-webgl');
    if (!gl) {
      cvs.style.display = 'none';
      return;
    }

    const vert = `
      attribute vec2 p;
      void main(){ gl_Position = vec4(p, 0.0, 1.0); }
    `;

    /* fbm domain-warped noise -> cyan/magenta plasma */
    const frag = `
      precision highp float;
      uniform vec2 u_res;
      uniform float u_time;
      uniform vec2 u_mouse;

      float hash(vec2 p){
        p = fract(p * vec2(123.34, 345.45));
        p += dot(p, p + 34.345);
        return fract(p.x * p.y);
      }
      float noise(vec2 p){
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f*f*(3.0-2.0*f);
        float a = hash(i);
        float b = hash(i + vec2(1.0,0.0));
        float c = hash(i + vec2(0.0,1.0));
        float d = hash(i + vec2(1.0,1.0));
        return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
      }
      float fbm(vec2 p){
        float v = 0.0;
        float a = 0.5;
        for(int i=0;i<5;i++){
          v += a * noise(p);
          p *= 2.0;
          a *= 0.5;
        }
        return v;
      }

      void main(){
        vec2 uv = gl_FragCoord.xy / u_res.xy;
        // center & scale uniformly so the field is symmetric L/R
        vec2 p = (uv - 0.5);
        p.x *= u_res.x / u_res.y;
        p *= 2.2;

        // slow, ambient, NOT mouse-reactive
        float t = u_time * 0.018;

        // domain warp
        vec2 q = vec2(
          fbm(p + vec2(t, 0.0)),
          fbm(p + vec2(5.2, 1.3) - t)
        );
        vec2 r = vec2(
          fbm(p + 3.0*q + vec2(1.7, 9.2) + t*0.4),
          fbm(p + 3.0*q + vec2(8.3, 2.8) - t*0.4)
        );
        float f = fbm(p + 3.0*r);

        // color ramp: deep bg -> cyan -> magenta highlights
        vec3 bg     = vec3(0.027, 0.031, 0.047);
        vec3 cyan   = vec3(0.0, 0.62, 0.82);
        vec3 mag    = vec3(0.72, 0.13, 0.46);

        vec3 col = bg;
        col = mix(col, cyan, smoothstep(0.35, 0.85, f) * 0.5);
        col = mix(col, mag, smoothstep(0.55, 1.0, length(r)) * 0.38);

        // radial vignette (centered) so edges fall to dark evenly
        float vig = smoothstep(1.25, 0.15, length(uv - 0.5));
        col *= mix(0.5, 1.0, vig);

        gl_FragColor = vec4(col, 0.85);
      }
    `;

    function compile(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn('shader err', gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    }

    const vs = compile(gl.VERTEX_SHADER, vert);
    const fs = compile(gl.FRAGMENT_SHADER, frag);
    if (!vs || !fs) {
      cvs.style.display = 'none';
      return;
    }
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    // cap DPR for perf on mobile
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    let mouse = [0.5, 0.5];

    function resize() {
      cvs.width = Math.floor(innerWidth * dpr);
      cvs.height = Math.floor(innerHeight * dpr);
      cvs.style.width = innerWidth + 'px';
      cvs.style.height = innerHeight + 'px';
      gl.viewport(0, 0, cvs.width, cvs.height);
    }
    resize();
    addEventListener('resize', resize, { passive: true });

    // pause when tab hidden
    let raf = null;
    let running = true;
    const start = performance.now();

    function frame(now) {
      if (!running) return;
      gl.uniform2f(uRes, cvs.width, cvs.height);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, mouse[0], mouse[1]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    document.addEventListener('visibilitychange', () => {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(frame);
      else if (raf) cancelAnimationFrame(raf);
    });
  }

  /* =========================================================
     SCROLL PROGRESS + PARALLAX
     ========================================================= */
  function initScroll() {
    const prog = document.getElementById('scrollProg');
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = Math.max(1, h.scrollHeight - h.clientHeight);
        const sc = h.scrollTop / max;
        if (prog) prog.style.width = sc * 100 + '%';
        ticking = false;
      });
    }
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* =========================================================
     NAV active state
     ========================================================= */
  function initNav() {
    const navLinks = document.querySelectorAll('nav.top a');
    const path = location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach((a) => {
      const href = a.getAttribute('href').split('/').pop().split('#')[0];
      if (href === path || (path === '' && href === 'index.html'))
        a.classList.add('active');
      else a.classList.remove('active');
    });
  }

  /* =========================================================
     LIGHTBOX (gallery zoom)
     ========================================================= */
  function ensureLightbox() {
    let lb = document.getElementById('lightbox');
    if (lb) return lb;
    lb = el('div', 'lightbox');
    lb.id = 'lightbox';
    lb.innerHTML = `<div class="lb-close" aria-label="Close">✕</div><img alt="">`;
    document.body.appendChild(lb);
    const close = () => lb.classList.remove('open');
    lb.addEventListener('click', (e) => {
      if (e.target === lb || e.target.classList.contains('lb-close')) close();
    });
    addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
    return lb;
  }
  function openLightbox(src) {
    const lb = ensureLightbox();
    lb.querySelector('img').src = src;
    lb.classList.add('open');
  }
  window.__dino.openLightbox = openLightbox;

  /* =========================================================
     YEAR
     ========================================================= */
  function initYear() {
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  }

  /* =========================================================
     boot
     ========================================================= */
  function boot() {
    initShader();
    initScroll();
    initNav();
    initYear();
    observeReveals(document);
  }
  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();

/* =========================================================
   RENDERERS (global, called from page inline scripts)
   ========================================================= */
function renderContacts(target) {
  const cg = document.querySelector(target);
  if (!cg || typeof DATA === 'undefined') return;
  cg.innerHTML = '';
  DATA.contacts.forEach((c, i) => {
    const a = document.createElement('a');
    a.className = 'contact-row reveal';
    a.style.transitionDelay = i * 55 + 'ms';
    a.setAttribute('data-brand', c.brand);
    a.href = c.url;
    a.target = '_blank';
    a.rel = 'noopener';
    const fallback = (c.label || '?')[0].toUpperCase();
    a.innerHTML = `
      <div class="contact-icon">
        <img data-src="${ICONS[c.brand] || ''}" alt="${c.label}" loading="lazy"
             onerror="this.style.display='none';this.parentNode.classList.add('no-img');this.parentNode.setAttribute('data-fallback','${fallback}')">
      </div>
      <div class="contact-meta">
        <div class="contact-label">${c.label}</div>
        <div class="contact-nick">${c.nick}</div>
      </div>
      <div class="contact-arrow">→</div>`;
    cg.appendChild(a);
    window.__dino.lazy(a.querySelector('img'));
  });
  window.__dino.observeReveals(cg);
}

function getGameMetric(g) {
  if ('trophy' in g) {
    return {
      value: g.trophy,
      goal: DATA.goalTrophies || 1,
      unit: 'Trophies',
      labelSingular: 'Trophies',
    };
  }
  return {
    value: g.hours || 0,
    goal: DATA.goalHours || 1,
    unit: 'Hours',
    labelSingular: 'Hours',
  };
}

function renderGames(target) {
  const pw = document.querySelector(target);
  if (!pw || typeof DATA === 'undefined') return;
  pw.innerHTML = '';

  // rank by hours played (games without hours go last)
  const sorted = [...DATA.games]
    .map((g) => ({ g, m: getGameMetric(g), hrs: g.hours || 0 }))
    .sort((a, b) => b.hrs - a.hrs);

  const top = sorted.slice(0, 3);

  // visual order on podium: 2nd, 1st, 3rd
  const visualOrder = [top[1], top[0], top[2]].filter(Boolean);

  // fixed pedestal heights by rank (NOT tied to hours)
  const heightFor = (rank) => (rank === 1 ? 150 : rank === 2 ? 112 : 84);

  visualOrder.forEach((entry, i) => {
    const rank = top.indexOf(entry) + 1;
    const { g, m } = entry;
    const col = document.createElement('div');
    col.className = 'podium-col';
    col.setAttribute('data-rank', rank);
    col.style.animation = `hero-in 0.7s ${i * 0.12}s var(--ease) both`;
    col.innerHTML = `
      <div class="podium-info">
        <div class="podium-img">
          <div class="placeholder">${g.name.split(' ')[0].toUpperCase()}</div>
          <img data-src="${g.thumb}" alt="${g.name}" loading="lazy">
        </div>
        <div class="podium-game-name">${g.name}</div>
        <div class="podium-hours">
          <span class="num">${m.value.toLocaleString('cs-CZ')}</span>
          <span class="unit">${m.unit}</span>
        </div>
      </div>
      <div class="podium-stand" style="height:${heightFor(rank)}px">
        <span class="podium-place">${rank}</span>
      </div>`;
    pw.appendChild(col);
    window.__dino.lazy(col.querySelector('img'));
  });
  window.__dino.observeReveals(pw);
}

function renderMusic(target) {
  const mg = document.querySelector(target);
  if (!mg || typeof DATA === 'undefined') return;
  mg.innerHTML = '';
  DATA.music.forEach((s, i) => {
    const a = document.createElement('a');
    a.className = 'song-card reveal';
    a.style.transitionDelay = i * 55 + 'ms';
    a.href = s.url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.innerHTML = `
      <div class="song-thumb">
        <div class="placeholder">♪</div>
        <img data-src="${s.thumb}" alt="" loading="lazy">
        <div class="song-play"><div><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div></div>
      </div>
      <div class="song-meta">
        <div class="song-title">${s.title}</div>
        <div class="song-artist">${s.artist}</div>
      </div>`;
    mg.appendChild(a);
    window.__dino.lazy(a.querySelector('img'));
  });

  // pad to a full grid (8 slots) with empty "coming soon" cards
  const SLOTS = 8;
  for (let i = DATA.music.length; i < SLOTS; i++) {
    const blank = document.createElement('div');
    blank.className = 'song-card song-blank reveal';
    blank.style.transitionDelay = i * 55 + 'ms';
    blank.innerHTML = `
      <div class="song-thumb"><div class="placeholder">+</div></div>
      <div class="song-meta">
        <div class="song-title">Coming soon</div>
        <div class="song-artist">— — —</div>
      </div>`;
    mg.appendChild(blank);
  }
  window.__dino.observeReveals(mg);
}

function renderProjects(target) {
  const pg = document.querySelector(target);
  if (!pg || typeof DATA === 'undefined') return;
  pg.innerHTML = '';
  DATA.projects.forEach((p, i) => {
    const el = document.createElement('div');
    el.className = 'project-card reveal';
    el.style.transitionDelay = i * 90 + 'ms';
    el.style.setProperty('--proj-color', p.color);
    el.innerHTML = `
      <div class="project-head">
        <div class="project-icon">
          <img data-src="${p.icon}" alt="" loading="lazy"
               onerror="this.parentNode.innerHTML='${p.iconLetter || p.name[0]}'">
        </div>
        <div class="project-titles">
          <h3>${p.name}</h3>
          <div class="sub">${p.sub}</div>
        </div>
      </div>
      <div class="project-desc">${p.desc}</div>`;
    el.addEventListener('mousemove', (e) => {
      if (matchMedia('(hover:none)').matches) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `translateY(-6px) perspective(900px) rotateX(${
        -y * 4
      }deg) rotateY(${x * 4}deg)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
    pg.appendChild(el);
    window.__dino.lazy(el.querySelector('img'));
  });
  window.__dino.observeReveals(pg);
}

function renderPricing(target) {
  const pg = document.querySelector(target);
  if (!pg || typeof DATA === 'undefined' || !DATA.pricing) return;
  pg.innerHTML = '';
  DATA.pricing.forEach((p, i) => {
    const el = document.createElement('div');
    el.className = 'pricing-card reveal' + (p.highlight ? ' is-featured' : '');
    el.style.transitionDelay = i * 100 + 'ms';

    const badgeHTML =
      p.highlight && p.badge
        ? `<div class="pricing-badge">★ ${p.badge}</div>`
        : '';
    const featuresHTML = (p.features || [])
      .map((f) => `<li><span class="check">✓</span>${f}</li>`)
      .join('');

    const isCustomPrice = typeof p.price === 'string';
    const hasDiscount =
      !isCustomPrice && p.priceOriginal && p.priceOriginal > p.price;
    const discountPct = hasDiscount
      ? Math.round(((p.priceOriginal - p.price) / p.priceOriginal) * 100)
      : 0;

    let priceHTML;
    if (isCustomPrice) {
      priceHTML = `<div class="pricing-price is-custom"><span class="num">${p.price}</span></div>`;
    } else {
      const saleRow = hasDiscount
        ? `<div class="pricing-sale-row">
             <span class="pricing-price-old">${p.priceOriginal.toLocaleString(
               'cs-CZ'
             )} €</span>
             <span class="pricing-discount">−${discountPct}%</span>
           </div>`
        : '';
      priceHTML = `${saleRow}
        <div class="pricing-price${hasDiscount ? ' is-sale' : ''}">
          <span class="num">${p.price.toLocaleString('cs-CZ')}</span>
          <span class="cur">€</span>
        </div>`;
    }

    const isExternal = /^(https?:|mailto:)/.test(p.url || '');
    const targetAttr = isExternal ? ' target="_blank" rel="noopener"' : '';

    el.innerHTML = `
      ${badgeHTML}
      <div class="pricing-tier">${p.tier}</div>
      <h3 class="pricing-name">${p.name}</h3>
      ${priceHTML}
      <div class="pricing-note">${p.priceNote || ''}</div>
      <ul class="pricing-features">${featuresHTML}</ul>
      <a href="${p.url}" class="pricing-cta"${targetAttr}>
        ${p.cta} <span class="arrow">→</span>
      </a>`;
    pg.appendChild(el);
  });
  window.__dino.observeReveals(pg);
}

function renderHub() {
  if (typeof DATA === 'undefined') return;
  const desc = document.getElementById('hubDesc');
  const link = document.getElementById('hubLink');
  const img = document.getElementById('hubImg');
  if (desc) desc.textContent = DATA.hub.desc;
  if (link) link.href = DATA.hub.url;
  if (img) {
    img.setAttribute('data-src', DATA.hub.image);
    window.__dino.lazy(img);
  }
}

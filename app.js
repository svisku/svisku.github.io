/* ============================================================
   DINOUSEG — app.js
   WebGL plasma shader, lazy image loader w/ skeletons,
   parallax, scroll progress, reveal-on-scroll, renderers.
   ============================================================ */

(function () {
  'use strict';

  const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

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
          { rootMargin: '200px' },
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
    { threshold: 0.12, rootMargin: '0px 0px -50px 0px' },
  );
  function observeReveals(scope) {
    (scope || document)
      .querySelectorAll('.reveal:not(.in)')
      .forEach((el) => revealObserver.observe(el));
  }

  /* =========================================================
     I18N — language (cs / en). Currency derives: cs->czk, en->eur.
     ========================================================= */
  let LANG = (function () {
    try {
      const s = localStorage.getItem('dino-lang');
      if (s === 'cs' || s === 'en') return s;
    } catch (e) {}
    // default from browser
    return (navigator.language || 'en').toLowerCase().startsWith('cs')
      ? 'cs'
      : 'en';
  })();

  const I18N = {
    // nav
    'nav.home': { en: 'Home', cs: 'Domů' },
    'nav.arcade': { en: 'Arcade', cs: 'Hry' },
    'nav.setup': { en: 'Setup', cs: 'Sestava' },
    'nav.webs': { en: 'Webs', cs: 'Weby' },
    // hero (index)
    'hero.sub': { en: 'Gamer & Developer', cs: 'Hráč & Vývojář' },
    'hero.desc': {
      en: 'Clean and fast websites, place where my games, music and setup live. Look around.',
      cs: 'Čisté a rychlé weby, místo, kde žijí moje hry, hudba a sestava. Rozhlédni se.',
    },
    'hero.connect': { en: 'Connect', cs: 'Spojit se' },
    'hero.hire': { en: 'Hire me', cs: 'Najmout' },
    // contacts
    'contacts.title': { en: 'Connect', cs: 'Spojit se' },
    'contacts.desc': {
      en: "Tap any platform to reach me. My accounts are active and I'll get back to you as soon as I can.",
      cs: 'Klikni na jakoukoliv síť a ozvi se mi. Účty mám aktivní a odpovím co nejdřív.',
    },
    // arcade
    'games.title': { en: 'Games', cs: 'Hry' },
    'games.desc': {
      en: 'My top games ranked by hours played.',
      cs: 'Moje nejhranější hry podle odehraných hodin.',
    },
    'music.title': { en: 'Music', cs: 'Hudba' },
    'music.desc': {
      en: 'Tap a thumbnail to listen.',
      cs: 'Klikni na náhled a poslechni si.',
    },
    'music.soon': { en: 'Coming soon', cs: 'Už brzy' },
    'games.tap': { en: 'Tap to view ▸', cs: 'Klikni pro detail ▸' },
    'unit.hours': { en: 'Hours', cs: 'Hodin' },
    'unit.trophies': { en: 'Trophies', cs: 'Trofejí' },
    // setup
    'setup.title': { en: 'My Setup', cs: 'Moje sestava' },
    'setup.desc': {
      en: 'Everything inside my PC and on my desk. Click anything to open it.',
      cs: 'Všechno v mém PC a na stole. Klikni na cokoliv a otevři to.',
    },
    'setup.pc.title': { en: 'Inside the PC', cs: 'Uvnitř PC' },
    'setup.pc.desc': {
      en: 'The components that make the machine run.',
      cs: 'Komponenty, které pohánějí celý stroj.',
    },
    'setup.desk.title': { en: 'Desk & Gear', cs: 'Stůl & vybavení' },
    'setup.desk.desc': {
      en: 'Peripherals, audio, displays and the desk itself.',
      cs: 'Periferie, zvuk, monitory a samotný stůl.',
    },
    // web / hire
    'web.title': { en: 'I build websites', cs: 'Tvořím weby' },
    'web.desc': {
      en: "Clean and fast websites, built for you. Pick a package, message me, and let's make it.",
      cs: 'Čisté a rychlé weby, na míru pro tebe. Vyber balíček, napiš mi a pustíme se do toho.',
    },
    'web.footnote': {
      en: "One-time price for the website. Limited spots... I only take a few projects at a time, so prices won't stay this low forever.",
      cs: 'Jednorázová cena za web. Omezená kapacita... beru jen pár projektů naráz, takže ceny takhle nízké nezůstanou napořád.',
    },
    'extras.title': { en: 'Extra services', cs: 'Doplňkové služby' },
    'extras.desc': {
      en: 'Optional things on top of the website. Want your own address, hosting, or someone to look after it? Only if you want it.',
      cs: 'Nepovinné věci k webu navíc. Chceš vlastní adresu, hosting nebo se o web starat? Jen když budeš chtít.',
    },
    'how.title': { en: 'How it works', cs: 'Jak to funguje' },
    'how.desc': {
      en: "Simple and stress-free, here's exactly what happens from the first message to your website going live.",
      cs: 'Jednoduše a v klidu, tady je přesně, co se stane od první zprávy až po spuštění webu.',
    },
    'extra.per.yr': { en: '/yr', cs: '/rok' },
    'extra.per.mo': { en: '/mo', cs: '/měs' },
    'price.from': { en: 'from', cs: 'od' },
    'price.recommended': { en: 'recommended', cs: 'doporučeno' },
    // footer
    'footer.rights': {
      en: 'Dinouseg. All rights reserved.',
      cs: 'Dinouseg. Všechna práva vyhrazena.',
    },
    'footer.fine': {
      en: 'Design & code by Dinouseg. Unauthorized copying, reproduction or redistribution of any part of this site is prohibited.',
      cs: 'Design & kód Dinouseg. Neoprávněné kopírování, reprodukce nebo šíření jakékoliv části tohoto webu je zakázáno.',
    },
    // lang toggle
    'lang.label': { en: 'Language', cs: 'Jazyk' },
  };

  function t(key) {
    const e = I18N[key];
    return e ? e[LANG] || e.en : key;
  }
  // pick a {en,cs} field, or return as-is if it's a plain string
  function tx(v) {
    if (v && typeof v === 'object' && (v.en || v.cs)) return v[LANG] || v.en;
    return v;
  }
  function curOfLang() {
    return LANG === 'cs' ? 'czk' : 'eur';
  }

  /* fill any element with data-i18n / data-i18n-attr */
  function applyI18n(scope) {
    (scope || document).querySelectorAll('[data-i18n]').forEach((node) => {
      node.textContent = t(node.getAttribute('data-i18n'));
    });
    // <html lang>
    document.documentElement.setAttribute('lang', LANG);
  }

  // expose for renderers
  window.__dino = window.__dino || {};

  // pages register their render fn here so a language switch can re-run it
  let pageRender = null;
  function registerPage(fn) {
    pageRender = fn;
    fn();
  }
  function setLang(next) {
    if (next !== 'cs' && next !== 'en') return;
    if (next === LANG) return;
    LANG = next;
    try {
      localStorage.setItem('dino-lang', LANG);
    } catch (e) {}
    applyI18n(document);
    paintLangToggle();
    if (pageRender) pageRender();
  }
  function paintLangToggle() {
    document
      .querySelectorAll('#langToggle [data-lang]')
      .forEach((o) =>
        o.classList.toggle('on', o.getAttribute('data-lang') === LANG),
      );
  }
  function initLangToggle() {
    const box = document.getElementById('langToggle');
    if (!box) return;
    paintLangToggle();
    box.addEventListener('click', (e) => {
      const opt = e.target.closest('[data-lang]');
      if (opt) setLang(opt.getAttribute('data-lang'));
    });
  }

  /* expose a couple to inline scripts / fallbacks */
  window.__dino = {
    lazy,
    observeReveals,
    el,
    t,
    tx,
    registerPage,
    curOfLang,
    get lang() {
      return LANG;
    },
  };

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
      gl.STATIC_DRAW,
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
    applyI18n(document);
    initLangToggle();
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
  const t = window.__dino.t;
  if ('trophy' in g) {
    return {
      value: g.trophy,
      unit: t('unit.trophies'),
      labelSingular: t('unit.trophies'),
    };
  }
  return {
    value: g.hours || 0,
    unit: t('unit.hours'),
    labelSingular: t('unit.hours'),
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
        <div class="song-title">${window.__dino.t('music.soon')}</div>
        <div class="song-artist">— — —</div>
      </div>`;
    mg.appendChild(blank);
  }
  window.__dino.observeReveals(mg);
}

/* ---------- currency ---------- */
function CURV() {
  return window.__dino.curOfLang();
}
function curSym() {
  return CURV() === 'czk' ? 'Kč' : '€';
}
function amount(v) {
  const cur = CURV();
  const n = typeof v === 'object' && v ? v[cur] : v;
  // thin no-break space as thousands separator → tidy "2 990" without a big gap
  return Number(n).toLocaleString('en-US').replace(/,/g, ' ');
}

function renderPricing(target) {
  const pg = document.querySelector(target);
  if (!pg || typeof DATA === 'undefined' || !DATA.pricing) return;
  pg.innerHTML = '';
  const sym = curSym();
  DATA.pricing.forEach((p, i) => {
    const el = document.createElement('div');
    el.className = 'pricing-card reveal' + (p.highlight ? ' is-featured' : '');
    el.style.transitionDelay = i * 100 + 'ms';

    const badgeHTML =
      p.highlight && p.badge
        ? `<div class="pricing-badge">★ ${window.__dino.tx(p.badge)}</div>`
        : '';
    const featuresHTML = (p.features || [])
      .map((f) => `<li><span class="check">✓</span>${window.__dino.tx(f)}</li>`)
      .join('');

    const cur = (v) => (v ? v[CURV()] : null);
    const hasPrice = !!p.price;
    const hasFrom = !!p.priceFrom;
    const hasDiscount =
      hasPrice && p.priceOriginal && cur(p.priceOriginal) > cur(p.price);
    const discountPct = hasDiscount
      ? Math.round(
          ((cur(p.priceOriginal) - cur(p.price)) / cur(p.priceOriginal)) * 100,
        )
      : 0;

    let priceHTML;
    if (hasPrice) {
      const saleRow = hasDiscount
        ? `<div class="pricing-sale-row">
             <span class="pricing-price-old">${amount(p.priceOriginal)} ${sym}</span>
             <span class="pricing-discount">−${discountPct}%</span>
           </div>`
        : '';
      priceHTML = `${saleRow}
        <div class="pricing-price${hasDiscount ? ' is-sale' : ''}">
          <span class="num">${amount(p.price)}</span>
          <span class="cur">${sym}</span>
        </div>`;
    } else if (hasFrom) {
      priceHTML = `
        <div class="pricing-price">
          <span class="pricing-from">${window.__dino.t('price.from')}</span>
          <span class="num">${amount(p.priceFrom)}</span>
          <span class="cur">${sym}</span>
        </div>`;
    } else {
      priceHTML = `<div class="pricing-price is-custom"><span class="num">Custom</span></div>`;
    }

    const taglineHTML = p.tagline
      ? `<div class="pricing-tagline">${window.__dino.tx(p.tagline)}</div>`
      : '';

    // CTA opens the visitor's mail app, prefilled to dinouseg@gmail.com.
    // Language follows the UI language: cs -> Czech, en -> English.
    let ctaHref, ctaAttr;
    if (p.mailPackage) {
      const mail = DATA.webMail || 'dinouseg@gmail.com';
      let subject, body;
      if (window.__dino.lang === 'cs') {
        subject = `Web na míru — ${p.mailPackage}`;
        body =
          `Dobrý den,\n\n` +
          `mám zájem o web "${p.mailPackage}". Rád/a bych se domluvil/a na detailech.\n\n` +
          `Děkuji,\n`;
      } else {
        subject = `Website inquiry — ${p.mailPackage}`;
        body =
          `Hi,\n\n` +
          `I'm interested in the "${p.mailPackage}" website. I'd love to talk about the details.\n\n` +
          `Thanks,\n`;
      }
      ctaHref = `mailto:${mail}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
      ctaAttr = '';
    } else {
      ctaHref = p.url || '#';
      const ext = /^(https?:|mailto:)/.test(ctaHref);
      ctaAttr = ext ? ' target="_blank" rel="noopener"' : '';
    }

    el.innerHTML = `
      ${badgeHTML}
      <div class="pricing-tier">${p.tier}</div>
      <h3 class="pricing-name">${p.name}</h3>
      ${taglineHTML}
      ${priceHTML}
      <div class="pricing-note">${window.__dino.tx(p.priceNote) || ''}</div>
      <ul class="pricing-features">${featuresHTML}</ul>
      <a href="${ctaHref}" class="pricing-cta"${ctaAttr}>
        ${window.__dino.tx(p.cta)} <span class="arrow">→</span>
      </a>`;
    pg.appendChild(el);
  });
  window.__dino.observeReveals(pg);
}

/* extra paid services (domain / hosting / monthly care) */
function renderWebExtras(target) {
  const wrap = document.querySelector(target);
  if (!wrap || typeof DATA === 'undefined' || !DATA.webExtras) return;
  wrap.innerHTML = '';
  const sym = curSym();
  const tx = window.__dino.tx;
  const t = window.__dino.t;
  DATA.webExtras.forEach((x, i) => {
    const rows = (x.items || [])
      .map((it) => {
        let price;
        if (it.perYear) {
          price = `${amount(it.perYear)} ${sym}<span class="per">${t(
            'extra.per.yr',
          )}</span>`;
        } else {
          price = `${amount(it.perMonth)} ${sym}<span class="per">${t(
            'extra.per.mo',
          )}</span>`;
        }
        return `<li${it.recommended ? ' class="is-rec"' : ''}>
          <span class="extra-label">${it.label}${
            it.recommended ? ` <em>★ ${t('price.recommended')}</em>` : ''
          }</span>
          <span class="extra-price">${price}</span>
        </li>`;
      })
      .join('');
    const card = document.createElement('div');
    card.className = 'extra-card reveal';
    card.style.transitionDelay = i * 90 + 'ms';
    card.innerHTML = `
      <div class="extra-head">
        <h3>${tx(x.name)}</h3>
        <span class="extra-note">${tx(x.note)}</span>
      </div>
      <p class="extra-desc">${tx(x.desc)}</p>
      <ul class="extra-list">${rows}</ul>`;
    wrap.appendChild(card);
  });
  window.__dino.observeReveals(wrap);
}

/* how-it-works steps */
function renderProcess(target) {
  const wrap = document.querySelector(target);
  if (!wrap || typeof DATA === 'undefined' || !DATA.webProcess) return;
  wrap.innerHTML = '';
  DATA.webProcess.forEach((s, i) => {
    const el = document.createElement('div');
    el.className = 'process-step reveal';
    el.style.transitionDelay = i * 80 + 'ms';
    const tx = window.__dino.tx;
    el.innerHTML = `
      <div class="process-num">${s.step}</div>
      <div class="process-body">
        <div class="process-title">${tx(s.title)}</div>
        <div class="process-text">${tx(s.text)}</div>
      </div>`;
    wrap.appendChild(el);
  });
  window.__dino.observeReveals(wrap);
}

/* payment terms box */
function renderPayment(target) {
  const wrap = document.querySelector(target);
  if (!wrap || typeof DATA === 'undefined' || !DATA.webPayment) return;
  const tx = window.__dino.tx;
  const pts = DATA.webPayment.points
    .map((p) => `<li><span class="check">✓</span>${tx(p)}</li>`)
    .join('');
  wrap.innerHTML = `
    <div class="payment-card reveal">
      <h3 class="payment-title">${tx(DATA.webPayment.title)}</h3>
      <ul class="payment-list">${pts}</ul>
    </div>`;
  window.__dino.observeReveals(wrap);
}

function renderSetup(target, section) {
  const grid = document.querySelector(target);
  if (!grid || typeof DATA === 'undefined' || !DATA.setup) return;
  const items = DATA.setup[section] || [];
  grid.innerHTML = '';
  const initialsOf = (name) =>
    name
      .replace(/[^A-Za-z0-9 ]/g, '')
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join('');

  const linkAttrs = (url) =>
    url ? ` href="${url}" target="_blank" rel="noopener"` : '';

  items.forEach((it, i) => {
    const src = 'fotky/setup/' + it.slug + '.webp';
    const isCombo = !!(it.combo || it.parts);
    // combo card = plain div (each half is its own link);
    // single card = anchor when it has a url
    const card = document.createElement(!isCombo && it.url ? 'a' : 'div');
    card.className = 'setup-card reveal' + (isCombo ? ' is-combo' : '');
    card.style.transitionDelay = (i % 12) * 45 + 'ms';
    if (!isCombo && it.url) {
      card.href = it.url;
      card.target = '_blank';
      card.rel = 'noopener';
    }
    if (it.col) card.style.setProperty('--col', it.col);
    if (it.span) card.style.setProperty('--span', it.span);

    let imgBlock;
    let anyHalfLink = false;
    if (isCombo) {
      // build ordered halves [{slug,name,url}]
      let halvesData;
      if (it.parts) {
        halvesData = it.parts.map((c) =>
          typeof c === 'string' ? { slug: c, name: c } : c,
        );
      } else {
        const parts = (Array.isArray(it.combo) ? it.combo : [it.combo]).map(
          (c) => (typeof c === 'string' ? { slug: c, name: c } : c),
        );
        halvesData = [{ slug: it.slug, name: it.name, url: it.url }, ...parts];
      }
      const partsCount = halvesData.length;
      const halves = halvesData
        .map((p) => {
          const tag = p.url ? 'a' : 'div';
          if (p.url) anyHalfLink = true;
          const badge = p.url
            ? '<span class="half-link" aria-hidden="true">↗</span>'
            : '';
          return `
          <${tag} class="split-half"${linkAttrs(p.url)}>
            ${badge}
            <div class="placeholder">${initialsOf(p.name)}</div>
            <img data-src="fotky/setup/${p.slug}.webp" alt="${p.name}" loading="lazy">
            <span class="half-name">${p.name}</span>
          </${tag}>`;
        })
        .join('');
      imgBlock = `
        <div class="setup-img setup-img--split" data-parts="${partsCount}">
          ${halves}
        </div>`;
    } else {
      imgBlock = `
        <div class="setup-img">
          <div class="placeholder">${initialsOf(it.name)}</div>
          <img data-src="${src}" alt="${it.name}" loading="lazy">
        </div>`;
    }

    const showBadge = isCombo ? anyHalfLink : !!it.url;
    const linkBadge =
      showBadge && !isCombo
        ? '<span class="setup-link" aria-hidden="true">↗</span>'
        : '';
    card.innerHTML = `
      ${linkBadge}
      ${imgBlock}
      <div class="setup-meta">
        <div class="setup-type">${window.__dino.tx(it.type)}</div>
        <div class="setup-name">${it.name}</div>
        <div class="setup-desc">${window.__dino.tx(it.desc)}</div>
      </div>`;

    grid.appendChild(card);
    card.querySelectorAll('img').forEach((im) => window.__dino.lazy(im));
  });
  window.__dino.observeReveals(grid);
}

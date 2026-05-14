/* ============================================================================
   DINOUSEG — sdílené globální skripty
   ============================================================================
   OBSAH:
     • STARS CANVAS — animovaná hvězdná obloha v pozadí
     • SCROLL PROGRESS + ACTIVE NAV — proužek nahoře + zvýraznění aktivní stránky
     • REVEAL ON SCROLL — fade-up animace při scrollu
     • YEAR — aktuální rok v patičce
     • RENDERY — funkce pro vykreslení kontaktů, her, hudby, projektů, hubu
                 z dat v data.js
   ============================================================================ */

/* ============================================================================
   STARS CANVAS — kreslí hvězdy na canvas#stars (pozadí)
   ============================================================================
   • Hvězdy poblikávají (sinus animace)
   • Reagují na pohyb myši (parallax)
   • Cca 8% hvězd je modrých, zbytek bílých
   • Pro úpravu hustoty: změň dělitele 9000 (větší = méně hvězd)
   ============================================================================ */
(function () {
  const cvs = document.getElementById('stars');
  if (!cvs) return;
  const ctx = cvs.getContext('2d');
  let stars = [];

  function resize() {
    cvs.width = innerWidth * devicePixelRatio;
    cvs.height = innerHeight * devicePixelRatio;
    cvs.style.width = innerWidth + 'px';
    cvs.style.height = innerHeight + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(devicePixelRatio, devicePixelRatio);
  }

  function makeStars() {
    stars = [];
    // hustota hvězd — uprav dělitele pro víc/méně hvězd
    const count = Math.floor((innerWidth * innerHeight) / 9000);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        z: Math.random() * 1 + 0.2, // hloubka (parallax sila)
        r: Math.random() * 1.3 + 0.2, // velikost hvězdy
        tw: Math.random() * Math.PI * 2, // fáze blikání
        tws: 0.01 + Math.random() * 0.02, // rychlost blikání
        blue: Math.random() < 0.08, // 8% hvězd je modrých
      });
    }
  }

  resize();
  makeStars();
  addEventListener('resize', () => {
    resize();
    makeStars();
  });

  // sledování pozice myši pro parallax efekt
  let mx = innerWidth / 2,
    my = innerHeight / 2;
  addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  function tick() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    const ox = (mx - innerWidth / 2) / 40;
    const oy = (my - innerHeight / 2) / 40;
    for (const s of stars) {
      s.tw += s.tws;
      const a = 0.35 + Math.sin(s.tw) * 0.35; // průhlednost — blikání
      const px = s.x + ox * s.z; // posun s myší
      const py = s.y + oy * s.z;
      // hvězda
      ctx.beginPath();
      ctx.arc(px, py, s.r * s.z, 0, Math.PI * 2);
      ctx.fillStyle = s.blue
        ? `rgba(79,195,255,${a})`
        : `rgba(220,230,255,${a * 0.75})`;
      ctx.fill();
      // glow okolo velkých hvězd
      if (s.r * s.z > 1) {
        ctx.beginPath();
        ctx.arc(px, py, s.r * s.z * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(47,138,255,${a * 0.08})`;
        ctx.fill();
      }
    }
    requestAnimationFrame(tick);
  }
  tick();
})();

/* ============================================================================
   SCROLL PROGRESS + ACTIVE NAV
   ============================================================================
   • Nastavuje šířku proužku nahoře podle pozice scrollu
   • Označí aktivní odkaz v nav podle aktuální URL
   ============================================================================ */
(function () {
  const prog = document.getElementById('scrollProg');
  const navLinks = document.querySelectorAll('nav.top a');

  // aktivní odkaz podle URL
  const path = location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach((a) => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === path || (path === '' && href === 'index.html'))
      a.classList.add('active');
    else a.classList.remove('active');
  });

  // scroll progress bar
  addEventListener(
    'scroll',
    () => {
      if (!prog) return;
      const h = document.documentElement;
      const sc = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      prog.style.width = sc * 100 + '%';
    },
    { passive: true },
  );
})();

/* ============================================================================
   REVEAL ON SCROLL — náběh elementů s třídou .reveal
   ============================================================================
   Když element vjede do viewportu, přidá se mu třída .in
   (CSS pak udělá fade-up animaci, viz styles.css → REVEAL ANIMACE)
   ============================================================================ */
(function () {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
})();

/* ============================================================================
   YEAR — vyplní aktuální rok v patičce (#year)
   ============================================================================ */
(function () {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

/* ============================================================================
   POMOCNÉ — observer pro nově přidané reveal elementy
   (renderery dynamicky tvoří elementy, které je třeba zaregistrovat)
   ============================================================================ */
function observeReveals(selector) {
  document.querySelectorAll(selector).forEach((el) => {
    if (!el.classList.contains('in')) {
      const obs = new IntersectionObserver(
        (ents) => {
          ents.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add('in');
              obs.unobserve(en.target);
            }
          });
        },
        { threshold: 0.1 },
      );
      obs.observe(el);
    }
  });
}

/* ============================================================================
   RENDER: KONTAKTY
   ============================================================================
   Vykreslí seznam kontaktů z DATA.contacts do daného elementu.
   target = CSS selektor cíle (např. '#contactsList')
   ============================================================================ */
function renderContacts(target) {
  const cg = document.querySelector(target);
  if (!cg || typeof DATA === 'undefined') return;
  DATA.contacts.forEach((c, i) => {
    const a = document.createElement('a');
    a.className = 'contact-row reveal';
    a.style.transitionDelay = i * 60 + 'ms'; // postupné objevování
    a.setAttribute('data-brand', c.brand);
    a.href = c.url;
    a.target = '_blank';
    a.rel = 'noopener';
    // Fallback písmeno když fotka loga neexistuje (= první písmeno labelu)
    const fallback = (c.label || '?')[0].toUpperCase();
    a.innerHTML = `
      <div class="contact-icon">
        <img src="${ICONS[c.brand] || ''}" alt="${c.label}"
             onerror="this.style.display='none';this.parentNode.classList.add('no-img');this.parentNode.setAttribute('data-fallback','${fallback}')">
      </div>
      <div class="contact-meta">
        <div class="contact-label">${c.label}</div>
        <div class="contact-nick">${c.nick}</div>
      </div>
      <div class="contact-arrow">→</div>`;
    // spotlight efekt sledující myš
    a.addEventListener('mousemove', (e) => {
      const r = a.getBoundingClientRect();
      a.style.setProperty('--mx', e.clientX - r.left + 'px');
      a.style.setProperty('--my', e.clientY - r.top + 'px');
    });
    cg.appendChild(a);
  });
  observeReveals('.contact-row.reveal');
}

/* ============================================================================
   RENDER: HRY (PODIUM)
   ============================================================================
   Seřadí hry podle PROCENT naplnění cíle a vykreslí podium 2-1-3.
   Hra může mít `hours` (počítá se z DATA.goalHours)
   nebo `trophy` (počítá se z DATA.goalTrophies).
   ============================================================================ */

// Helper — z hry vrátí hodnotu, cíl, jednotku a label
function getGameMetric(g) {
  if ('trophy' in g) {
    return {
      value: g.trophy,
      goal: DATA.goalTrophies || 1,
      unit: 'Trophies',
      labelSingular: 'trofejí',
    };
  }
  return {
    value: g.hours || 0,
    goal: DATA.goalHours || 1,
    unit: 'Hours',
    labelSingular: 'hodin',
  };
}

function renderGames(target) {
  const pw = document.querySelector(target);
  if (!pw || typeof DATA === 'undefined') return;

  // seřadit hry sestupně podle procent naplnění cíle
  const sorted = [...DATA.games].sort((a, b) => {
    const ma = getGameMetric(a),
      mb = getGameMetric(b);
    return mb.value / mb.goal - ma.value / ma.goal;
  });

  // pořadí na podiu: 2. místo vlevo, 1. uprostřed, 3. vpravo
  const podiumOrder = [sorted[1], sorted[0], sorted[2]].filter(Boolean);

  // mapa: název hry → její rank
  const rankMap = new Map(sorted.map((g, i) => [g.name, i + 1]));

  podiumOrder.forEach((g, idx) => {
    const rank = rankMap.get(g.name);
    const m = getGameMetric(g);
    const pct = Math.min(100, (m.value / m.goal) * 100);
    const el = document.createElement('div');
    el.className = 'podium-bar';
    el.setAttribute('data-rank', rank);
    el.style.animation = `fadeUp .9s ${0.2 + idx * 0.12}s both`;
    el.innerHTML = `
      <div class="podium-card">
        <div class="podium-rank">#${rank}</div>
        <div class="podium-img">
          <div class="placeholder">${g.name.split(' ')[0].toUpperCase()}</div>
          <img src="${g.img}" alt="${g.name}" onerror="this.style.display='none'" onload="this.previousElementSibling.style.display='none'">
        </div>
        <div class="podium-game-name">${g.name}</div>
        <div class="podium-hours">
          <span class="num">${m.value.toLocaleString('cs-CZ')}</span>
          <span class="unit">${m.unit}</span>
        </div>
        <div class="podium-bar-fill" style="--pct:${pct}%"></div>
      </div>
      <div class="podium-pedestal">${rank}</div>
    `;
    // kliknutí otevře detail
    el.addEventListener('click', () => openGame(g, rank));
    // 3D tilt efekt na myš
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `translateY(-10px) perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
    pw.appendChild(el);
  });
}

/* otevře detail hry pod podiem */
function openGame(g, rank) {
  const gd = document.getElementById('gameDetail');
  if (!gd) return;
  const m = getGameMetric(g);

  // Galerie: jen položky které mají cestu. Když se obrázek nenačte,
  // slot se schová (žádný placeholder).
  const galleryHTML = (g.gallery || [])
    .filter((path) => path && String(path).trim() !== '')
    .map(
      (path) =>
        `<div class="gd-img"><img src="${path}" alt="" onerror="this.parentNode.style.display='none'"></div>`,
    )
    .join('');

  gd.innerHTML = `
    <div class="game-detail-head">
      <div class="gd-thumb">
        <img src="${g.img}" alt="" onerror="this.style.display='none'">
      </div>
      <div>
        <div class="gd-title">${g.name}</div>
        <div class="gd-sub">Rank #${rank} · ${m.value.toLocaleString('cs-CZ')} ${m.labelSingular}</div>
      </div>
      <div class="gd-close" onclick="closeGame()">✕</div>
    </div>
    <div class="game-detail-body">
      <p>${g.desc}</p>
      <div class="gd-tags">${g.tags.map((t) => `<span class="gd-tag">${t}</span>`).join('')}</div>
      <div class="gd-gallery">${galleryHTML}</div>
    </div>
  `;
  gd.classList.add('open');
  setTimeout(
    () => gd.scrollIntoView({ behavior: 'smooth', block: 'center' }),
    120,
  );
}

/* zavře detail */
function closeGame() {
  const gd = document.getElementById('gameDetail');
  if (gd) gd.classList.remove('open');
}

/* ============================================================================
   RENDER: HUDBA
   ============================================================================
   Vykreslí karty s thumbnaily a play tlačítkem.
   Klik = odkaz na YouTube.
   ============================================================================ */
function renderMusic(target) {
  const mg = document.querySelector(target);
  if (!mg || typeof DATA === 'undefined') return;
  DATA.music.forEach((s, i) => {
    const a = document.createElement('a');
    a.className = 'song-card reveal';
    a.style.transitionDelay = i * 50 + 'ms';
    a.href = s.url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.innerHTML = `
      <div class="song-thumb">
        <div class="placeholder">♪</div>
        <img src="${s.thumb}" alt="" onerror="this.style.display='none'" onload="this.previousElementSibling.style.display='none'">
        <div class="song-play"><div><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div></div>
      </div>
      <div class="song-meta">
        <div class="song-title">${s.title}</div>
        <div class="song-artist">${s.artist}</div>
      </div>
    `;
    mg.appendChild(a);
  });
  observeReveals('.song-card.reveal');
}

/* ============================================================================
   RENDER: PROJEKTY
   ============================================================================
   Karty s ikonou, názvem, podtitulkem a popisem.
   Akcentní barva karty je z DATA.projects[i].color
   ============================================================================ */
function renderProjects(target) {
  const pg = document.querySelector(target);
  if (!pg || typeof DATA === 'undefined') return;
  DATA.projects.forEach((p, i) => {
    const el = document.createElement('div');
    el.className = 'project-card reveal';
    el.style.transitionDelay = i * 100 + 'ms';
    el.style.setProperty('--proj-color', p.color);
    el.innerHTML = `
      <div class="project-head">
        <div class="project-icon">
          <img src="${p.icon}" alt="" onerror="this.parentNode.innerHTML='${p.iconLetter || p.name[0]}'">
        </div>
        <div class="project-titles">
          <h3>${p.name}</h3>
          <div class="sub">${p.sub}</div>
        </div>
      </div>
      <div class="project-desc">${p.desc}</div>
    `;
    // 3D tilt efekt
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `translateY(-6px) perspective(900px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
    pg.appendChild(el);
  });
  observeReveals('.project-card.reveal');
}

/* ============================================================================
   RENDER: WEB / CENÍK
   ============================================================================
   Vykreslí karty cenových balíčků z DATA.pricing.
   Balíček s highlight:true dostane modrý ring + odznak ("Doporučeno").
   ============================================================================ */
function renderPricing(target){
  const pg = document.querySelector(target);
  if(!pg || typeof DATA==='undefined' || !DATA.pricing) return;
  DATA.pricing.forEach((p,i)=>{
    const el = document.createElement('div');
    el.className = 'pricing-card reveal' + (p.highlight ? ' is-featured' : '');
    el.style.transitionDelay = (i*120)+'ms';

    const badgeHTML = p.highlight && p.badge
      ? `<div class="pricing-badge">★ ${p.badge}</div>` : '';

    const featuresHTML = (p.features||[])
      .map(f => `<li><span class="check">✓</span>${f}</li>`)
      .join('');

    // Cena může být číslo (zobrazí se s "Kč") nebo string ("Custom" → bez měny).
    // Když je definován priceOriginal vyšší než price → zobrazí se sleva:
    // přeškrtnutá původní cena + badge s procentem.
    const isCustomPrice = typeof p.price === 'string';
    const hasDiscount   = !isCustomPrice && p.priceOriginal && p.priceOriginal > p.price;
    const discountPct   = hasDiscount
      ? Math.round((p.priceOriginal - p.price) / p.priceOriginal * 100)
      : 0;

    let priceHTML;
    if (isCustomPrice) {
      priceHTML = `<div class="pricing-price is-custom">
                     <span class="num">${p.price}</span>
                   </div>`;
    } else {
      const saleRow = hasDiscount
        ? `<div class="pricing-sale-row">
             <span class="pricing-price-old">${p.priceOriginal.toLocaleString('cs-CZ')} €</span>
             <span class="pricing-discount">−${discountPct}%</span>
           </div>`
        : '';
      priceHTML = `
        ${saleRow}
        <div class="pricing-price${hasDiscount ? ' is-sale' : ''}">
          <span class="num">${p.price.toLocaleString('cs-CZ')}</span>
          <span class="cur">€</span>
        </div>`;
    }

    // Tlačítko: interní odkaz (#něco nebo bez http) bez target="_blank"
    const isExternal = /^(https?:|mailto:)/.test(p.url || '');
    const targetAttr = isExternal ? ' target="_blank" rel="noopener"' : '';

    el.innerHTML = `
      ${badgeHTML}
      <div class="pricing-tier">${p.tier}</div>
      <h3 class="pricing-name">${p.name}</h3>
      ${priceHTML}
      <div class="pricing-note">${p.priceNote||''}</div>
      <ul class="pricing-features">${featuresHTML}</ul>
      <a href="${p.url}" class="pricing-cta"${targetAttr}>
        ${p.cta} <span class="arrow">→</span>
      </a>
    `;

    // 3D tilt + GROW on hover — karta defaultně malá, při hoveru vyroste
    // (scale 1.05) a přidá se translateY + rotace podle pozice myši
    el.addEventListener('mousemove',e=>{
      const r=el.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      el.style.transform = `scale(1.05) translateY(-8px) perspective(900px) rotateX(${-y*4}deg) rotateY(${x*4}deg)`;
    });
    el.addEventListener('mouseleave',()=>{el.style.transform=''});

    pg.appendChild(el);
  });
  observeReveals('.pricing-card.reveal');
}


/* ============================================================================
   RENDER: GAMING HUB
   ============================================================================
   Vyplní popis, URL a obrázek hubu z DATA.hub
   ============================================================================ */
function renderHub() {
  if (typeof DATA === 'undefined') return;
  const desc = document.getElementById('hubDesc');
  const link = document.getElementById('hubLink');
  const img = document.getElementById('hubImg');
  if (desc) desc.textContent = DATA.hub.desc;
  if (link) link.href = DATA.hub.url;
  if (img) {
    img.onload = () => {
      img.style.display = 'block';
      const ph = document.querySelector('.hub-image-wrap .placeholder-big');
      if (ph) ph.style.display = 'none';
    };
    img.src = DATA.hub.image;
  }
}

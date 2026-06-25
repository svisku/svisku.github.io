/* ===================================================================
   DINOUSEG — vykreslení webu z CONFIG + TEXTS
   Vanilla JS. Žádný build. Edituješ js/config.js a obnovíš (F5).
   =================================================================== */

(function () {
  "use strict";

  /* ── Stav jazyka ──────────────────────────────────────────── */
  const STORAGE_KEY = "dinouseg-lang";
  function detectLang() {
    try {
      const url = new URLSearchParams(location.search).get("lang");
      if (url === "cz" || url === "en") return url;
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "cz" || stored === "en") return stored;
    } catch (e) {}
    return "cz"; // primárně CZ
  }
  let lang = detectLang();
  const t = () => TEXTS[lang];

  /* ── Pomocné ──────────────────────────────────────────────── */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const el = (id) => document.getElementById(id);

  /* ── SVG ikony ────────────────────────────────────────────── */
  const ICONS = {
    kick: '<path d="M3 3h5v5h2V5h2V3h7v7h-2v2h-2v2h2v2h2v7h-7v-2h-2v-3H8v5H3V3z"/>',
    discord: '<path d="M19.27 5.33A16.94 16.94 0 0 0 15 4l-.2.38a14.6 14.6 0 0 1 3.86 1.32A13.46 13.46 0 0 0 12 4.6a13.5 13.5 0 0 0-6.66 1.1A14.6 14.6 0 0 1 9.2 4.4L9 4a16.94 16.94 0 0 0-4.27 1.33C2.05 9.3 1.32 13.16 1.68 16.96A17 17 0 0 0 6.9 19.6l.6-.83a11.2 11.2 0 0 1-1.78-.86l.44-.34a12.1 12.1 0 0 0 10.28 0l.44.34c-.56.33-1.16.62-1.78.86l.6.83a17 17 0 0 0 5.22-2.64c.42-4.4-.72-8.23-2.65-11.63ZM8.5 14.6c-1 0-1.84-.94-1.84-2.08S7.47 10.43 8.5 10.43s1.86.94 1.84 2.09c0 1.14-.82 2.08-1.84 2.08Zm7 0c-1.02 0-1.84-.94-1.84-2.08s.81-2.09 1.84-2.09 1.86.94 1.84 2.09c0 1.14-.81 2.08-1.84 2.08Z"/>',
    instagram: '<g fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/></g><circle cx="17.2" cy="6.8" r="1" fill="currentColor"/>',
    youtube: '<path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.77-1.77C19.3 5.1 12 5.1 12 5.1s-7.3 0-8.83.43A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.77 1.77C4.7 18.9 12 18.9 12 18.9s7.3 0 8.83-.43a2.5 2.5 0 0 0 1.77-1.77C23 15.2 23 12 23 12ZM9.8 15.3V8.7l5.7 3.3-5.7 3.3Z"/>',
    steam: '<path d="M12 2a10 10 0 0 0-9.96 9.1l5.37 2.22a2.83 2.83 0 0 1 1.6-.5h.14l2.39-3.46v-.05a3.78 3.78 0 1 1 3.78 3.78h-.09l-3.4 2.43v.12a2.84 2.84 0 0 1-5.66.3L2.3 14.1A10 10 0 1 0 12 2Zm-3.2 15.18 1.23.5a2.13 2.13 0 1 0 1.32-3.93l-1.27-.53a2.13 2.13 0 0 1-1.28 3.96Zm9.3-7.9a2.52 2.52 0 1 0-2.52 2.51 2.52 2.52 0 0 0 2.52-2.51Zm-4.4 0a1.89 1.89 0 1 1 1.89 1.88 1.89 1.89 0 0 1-1.89-1.88Z"/>',
    xbox: '<path d="M12 2a10 10 0 0 1 6.2 2.16C16 5.4 13.7 7.7 12 9.3 10.3 7.7 8 5.4 5.8 4.16A10 10 0 0 1 12 2ZM4.16 5.8C5.9 7.2 8.8 10.2 10.5 12c-2 2-5 5.2-6.7 6.9A10 10 0 0 1 4.16 5.8Zm15.68 0a10 10 0 0 1 .36 13.1C18.5 17.2 15.5 14 13.5 12c1.7-1.8 4.6-4.8 6.34-6.2ZM12 14.7c1.7 1.6 4 3.9 6.2 5.14a10 10 0 0 1-12.4 0C8 18.6 10.3 16.3 12 14.7Z"/>',
    roblox: '<path d="M5.2 2 2 18.8 18.8 22 22 5.2 5.2 2Zm5.1 7.4 4.3.82-.82 4.3-4.3-.82.82-4.3Z"/>',
    email: '<g fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6" stroke-linecap="round" stroke-linejoin="round"/></g>',
    arrow: '<g fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14m-6-6 6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></g>',
  };
  const svg = (name, cls) =>
    `<svg class="${cls || ""}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">${ICONS[name] || ""}</svg>`;

  /* ── Discord URL (sdílené) ────────────────────────────────── */
  const discord = (CONFIG.discord && CONFIG.discord.url) || "";

  /* ── Sekce: HERO ──────────────────────────────────────────── */
  // tlačítko ve stylu "vase weby" (nabíjecí + rotující tečka po obvodu)
  function genBtn(label, href, opts) {
    opts = opts || {};
    const ext = opts.external ? 'target="_blank" rel="noopener noreferrer"' : "";
    const arrow = opts.arrow === false ? "" :
      `<svg class="gen-btn__arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M13 6l6 6-6 6"/></svg>`;
    const cls = "gen-btn" + (opts.solid ? " gen-btn--solid" : "");
    return `<a class="${cls}" href="${esc(href)}" ${ext}>
      <span class="dots_border" aria-hidden="true"></span>
      <span class="text_button">${esc(label)}</span>${arrow}
    </a>`;
  }

  function heroHTML() {
    const x = t();
    const s = CONFIG.stats;
    const folPct = s.followersMax > 0 ? Math.min(Math.round((s.followers / s.followersMax) * 100), 100) : 0;
    const hrsPct = s.hoursMax > 0 ? Math.min(Math.round((s.hoursStreamed / s.hoursMax) * 100), 100) : 0;
    const strPct = s.streakMax > 0 ? Math.min(Math.round((s.streak / s.streakMax) * 100), 100) : 0;

    // 3 statistiky: číslo + label + bar (hodnota / max, bary se hýbou samy)
    const trust = `
      <p class="hero-trust-title reveal">${esc(x.stats.goalsTitle)}</p>
      <div class="hero-trust reveal">
        <div class="ht">
          <b data-count="${s.followers}">0</b>
          <span class="ht-label">${esc(x.stats.followers)}</span>
          <span class="ht-bar"><i data-fill="${folPct}"></i></span>
        </div>
        <div class="ht">
          <b data-count="${s.hoursStreamed}">0</b>
          <span class="ht-label">${esc(x.stats.hours)}</span>
          <span class="ht-bar"><i data-fill="${hrsPct}"></i></span>
        </div>
        <div class="ht ht--streak">
          <b data-count="${s.streak}">0</b>
          <span class="ht-label">${esc(x.stats.streak)}</span>
          <span class="ht-bar"><i data-fill="${strPct}"></i></span>
        </div>
      </div>`;

    const community = discord ? genBtn(x.hero.ctaCommunity, discord, { external: true, arrow: false }) : "";

    return `
    <section id="top" class="hero">
      <img class="hero-bg-logo" src="logo.png" alt="" aria-hidden="true" />
      <div class="shell hero-inner">
        <h1 class="font-display">dino<span class="accent">useg</span></h1>
        <p class="hero-tagline">${esc(x.hero.tagline)}</p>
        <div class="hero-cta">
          ${community}
          ${genBtn(x.hero.ctaWatch, CONFIG.site.kickUrl, { external: true, solid: true })}
        </div>
        ${trust}
      </div>
    </section>`;
  }

  /* ── Sekce: PROGRAM ───────────────────────────────────────── */
  function scheduleHTML() {
    const x = t().schedule, days = t().days;
    const vacs = CONFIG.vacations.length
      ? `<div class="vac-row reveal">${CONFIG.vacations.map((v) =>
          `<span class="vac">🌴 ${esc(lang === "cz" ? v.labelCz : v.labelEn)} · ${esc(v.from)}–${esc(v.to)}</span>`).join("")}</div>`
      : "";
    const rows = CONFIG.schedule.map((s) => {
      const name = days[s.day];
      if (s.type === "off") {
        return `<div class="srow off">
          <span class="srow-day font-display">${esc(name)}</span>
          <span class="srow-time">${esc(x.off)}</span>
          <span class="srow-cat"></span>
        </div>`;
      }
      const cat = lang === "cz" ? s.categoryCz : s.categoryEn;
      return `<div class="srow">
        <span class="srow-day font-display">${esc(name)}</span>
        <span class="srow-time">${esc(s.from)}<span class="dash">–</span>${esc(s.to)}</span>
        <span class="srow-cat">${cat ? esc(cat) : ""}</span>
      </div>`;
    }).join("");
    return `
    <section id="program" class="section"><div class="shell">
      <div class="reveal"><h2 class="section-title font-display">${esc(x.title)}</h2><p class="section-sub">${esc(x.subtitle)}</p></div>
      ${vacs}
      <div class="sched reveal">${rows}</div>
    </div></section>`;
  }

  /* ── Sekce: HRY ───────────────────────────────────────────── */
  /* ── Marquee (sociální pás) ───────────────────────────────── */
  // Marquee — barevný klikatelný pás sociálek (bez log).
  // Klik na položku → přenese na profil. Barva podle stránky.
  function marqueeHTML() {
    const seg = () => CONFIG.socials.map((s) => {
      const has = (s.url || "").trim().length > 0;
      const ext = has && !s.url.startsWith("mailto:");
      const c1 = s.color || "#53fc18";
      const style = `--soc:${c1};--soc2:${s.color2 || c1}`;
      if (has) {
        return `<a class="mq-item" href="${esc(s.url)}" ${ext ? 'target="_blank" rel="noopener noreferrer"' : ""} style="${style}"><span>${esc(s.label)}</span></a><i class="mq-sep">◆</i>`;
      }
      return `<span class="mq-item mq-item--off" style="${style}"><span>${esc(s.label)}</span></span><i class="mq-sep">◆</i>`;
    }).join("");
    // tři kopie pro plynulou nekonečnou smyčku (track se posune o 1/3 a vrátí — bez prázdného místa)
    return `<div class="marquee"><div class="marquee__track">${seg()}${seg()}${seg()}</div></div>`;
  }

  /* ── Sekce: KOMUNITA ──────────────────────────────────────── */
  function communityHTML() {
    const x = t().community;
    const inner = `
      <span class="halo"></span>
      <img class="community-logo" src="logo.png" alt="" aria-hidden="true" />
      <div class="community-inner">
        <div class="txt"><span class="community-label">${svg("discord")}${esc(x.title)}</span><p>${esc(x.text)}</p></div>
        <span class="community-go">
          ${svg("discord")}
          <span>${esc(discord ? x.cta : t().soon)}</span>
          ${discord ? `<svg class="cgo-arrow" viewBox="0 0 24 24" fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M13 6l6 6-6 6"/></svg>` : ""}
        </span>
      </div>`;
    // Klik na CELÝ button (kartu) → URL. Bez URL = neklikatelné.
    const card = discord
      ? `<a class="nu-card community community--link" href="${esc(discord)}" target="_blank" rel="noopener noreferrer">${inner}</a>`
      : `<div class="nu-card community community--off">${inner}</div>`;
    return `
    <section id="komunita" class="section"><div class="shell">
      <div class="reveal">${card}</div>
    </div></section>`;
  }

  /* ── Sekce: ODKAZY ────────────────────────────────────────── */
  /* ── Render celé stránky ──────────────────────────────────── */
  function render() {
    document.documentElement.lang = lang === "cz" ? "cs" : "en";

    // nav texty
    document.querySelectorAll("[data-t]").forEach((node) => {
      const path = node.getAttribute("data-t").split(".");
      let v = t(); path.forEach((p) => (v = v[p]));
      node.textContent = v;
    });

    // lang tlačítko
    el("langCurrent").textContent = lang.toUpperCase();
    el("langOther").textContent = lang === "cz" ? "EN" : "CZ";

    // footer
    el("footerRights").textContent = `© ${new Date().getFullYear()} dinouseg. ${t().footer.rights}`;
    const mail = el("footerMail");
    mail.textContent = CONFIG.site.email;
    mail.href = "mailto:" + CONFIG.site.email;

    // hlavní obsah
    el("app").innerHTML =
      heroHTML() + marqueeHTML() + scheduleHTML() + communityHTML();

    setupReveal();
    setupCounters();
  }

  /* ── Reveal při scrollu ───────────────────────────────────── */
  function setupReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en, i) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "-60px", threshold: 0.05 });
    els.forEach((e, i) => { e.style.transitionDelay = (i % 5) * 0.05 + "s"; io.observe(e); });
  }

  /* ── Animovaná počítadla + progress bary ──────────────────── */
  function setupCounters() {
    const nums = document.querySelectorAll("[data-count]");
    const fills = document.querySelectorAll("[data-fill]");
    if (!("IntersectionObserver" in window)) {
      nums.forEach((n) => (n.textContent = (+n.dataset.count).toLocaleString("cs-CZ") + (n.dataset.suffix || "")));
      fills.forEach((f) => (f.style.width = f.dataset.fill + "%"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const node = en.target;
        if (node.dataset.fill !== undefined) { node.style.width = node.dataset.fill + "%"; }
        else { animateCount(node); }
        io.unobserve(node);
      });
    }, { rootMargin: "-40px" });
    nums.forEach((n) => io.observe(n));
    fills.forEach((f) => io.observe(f));
  }
  function animateCount(node) {
    const target = +node.dataset.count, suffix = node.dataset.suffix || "";
    if (target === 0) { node.textContent = "0" + suffix; return; }
    const dur = 1800, start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      node.textContent = Math.round(eased * target).toLocaleString("cs-CZ") + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ── Nav scroll efekt ─────────────────────────────────────── */
  function setupNav() {
    const nav = el("nav");
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ── Přepínač jazyka ──────────────────────────────────────── */
  function setupLang() {
    el("langBtn").addEventListener("click", () => {
      lang = lang === "cz" ? "en" : "cz";
      try {
        localStorage.setItem(STORAGE_KEY, lang);
        const u = new URL(location.href); u.searchParams.set("lang", lang);
        history.replaceState({}, "", u.toString());
      } catch (e) {}
      render();
    });
  }

  /* ── Mobilní menu (hamburger) ─────────────────────────────── */
  function setupNavToggle() {
    const nav = el("nav"), btn = el("navToggle"), links = el("navLinks");
    if (!btn || !nav || !links) return;
    const close = () => { nav.classList.remove("nav-open"); btn.setAttribute("aria-expanded", "false"); };
    const toggle = () => {
      const open = nav.classList.toggle("nav-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    };
    btn.addEventListener("click", toggle);
    // klik na odkaz / mimo / Esc → zavři
    links.addEventListener("click", (e) => { if (e.target.closest("a")) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
    window.addEventListener("resize", () => { if (window.innerWidth > 720) close(); });
  }

  /* ── Start ────────────────────────────────────────────────── */
  function init() {
    el("nav").hidden = false;
    el("app").hidden = false;
    el("footer").hidden = false;
    render();
    setupNav();
    setupLang();
    setupNavToggle();
    // schovej skeleton
    const sk = el("skeleton");
    if (sk) { sk.style.opacity = "0"; setTimeout(() => sk.remove(), 250); }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

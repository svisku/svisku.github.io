/* ===================================================================
   DINOUSEG — stránka KOMPONENTY / SETUP (setup.html)
   Vykresluje CONFIG.setup. Edituješ js/config.js a obnovíš (F5).
   =================================================================== */

(function () {
  "use strict";

  /* ── Stav jazyka (sdílený klíč s hlavní stránkou) ──────────── */
  const STORAGE_KEY = "dinouseg-lang";
  function detectLang() {
    try {
      const url = new URLSearchParams(location.search).get("lang");
      if (url === "cz" || url === "en") return url;
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "cz" || stored === "en") return stored;
    } catch (e) {}
    return "cz";
  }
  let lang = detectLang();
  const t = () => TEXTS[lang];

  /* ── Pomocné ──────────────────────────────────────────────── */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const el = (id) => document.getElementById(id);

  /* ── Sekce: SETUP ─────────────────────────────────────────── */
  // jeden díl = karta (div). Hlavní url je na kartě (data-href, klik řeší JS),
  // part odkazy jsou normální <a> a samy zastaví probublání → fungují zvlášť.
  // (žádné <a> v <a>, žádný overlay co by parts blokoval).
  const IMG_BASE = "fotky/setup/";
  function partCard(it) {
    const type = lang === "cz" ? it.typeCz : it.typeEn;
    const desc = lang === "cz" ? it.descCz : it.descEn;
    const has = (it.url || "").trim().length > 0;

    const bg = it.slug
      ? `<span class="setup-bg" style="background-image:url('${esc(IMG_BASE + it.slug)}.webp')" aria-hidden="true"></span>`
      : "";

    const parts = (it.parts || []).map((p) =>
      `<a class="setup-part" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">${esc(p.name)}</a>`
    ).join("");
    const partsHTML = parts ? `<div class="setup-parts">${parts}</div>` : "";

    const arrow = has
      ? `<span class="setup-link"><svg class="setup-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M13 6l6 6-6 6"/></svg></span>`
      : "";

    const attrs = has
      ? ` data-href="${esc(it.url)}" role="link" tabindex="0" aria-label="${esc(it.name)}"`
      : "";

    return `<div class="setup-item nu-card${has ? "" : " setup-item--off"}"${attrs}>
      ${bg}
      <div class="setup-body">
        ${type ? `<span class="setup-type">${esc(type)}</span>` : ""}
        <h4 class="setup-name font-display">${esc(it.name)}</h4>
        ${desc ? `<p class="setup-desc">${esc(desc)}</p>` : ""}
        ${partsHTML}
      </div>
      ${arrow}
    </div>`;
  }

  // klik na kartu → otevři hlavní produkt; klik na part chip → ten part (sám)
  function bindSetupCards() {
    document.querySelectorAll(".setup-item[data-href]").forEach((card) => {
      const open = () => window.open(card.dataset.href, "_blank", "noopener,noreferrer");
      card.addEventListener("click", (e) => {
        if (e.target.closest(".setup-part")) return; // part řeší vlastní odkaz
        open();
      });
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      });
    });
  }

  function group(items, title, sub) {
    if (!items || !items.length) return "";
    return `
      <div class="reveal setup-group-head">
        <h3 class="section-title section-title--sm font-display">${esc(title)}</h3>
        <p class="section-sub">${esc(sub)}</p>
      </div>
      <div class="setup-grid reveal">${items.map(partCard).join("")}</div>`;
  }

  function setupHTML() {
    const x = t().setup;
    const data = CONFIG.setup || {};
    const hasAny = (data.pc && data.pc.length) || (data.desk && data.desk.length);

    const body = hasAny
      ? group(data.pc, x.pcTitle, x.pcSub) + group(data.desk, x.deskTitle, x.deskSub)
      : `<p class="setup-empty reveal">${esc(x.empty)}</p>`;

    const backArrow = `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m6 6-6-6 6-6"/></svg>`;

    return `
    <section id="setup" class="section section--setup"><div class="shell">
      ${body}
      <div class="reveal setup-back-wrap">
        <a class="setup-back" href="index.html#top">${backArrow}<span>${esc(x.back)}</span></a>
      </div>
    </div></section>`;
  }

  /* ── Render ───────────────────────────────────────────────── */
  function render() {
    document.documentElement.lang = lang === "cz" ? "cs" : "en";

    document.querySelectorAll("[data-t]").forEach((node) => {
      const path = node.getAttribute("data-t").split(".");
      let v = t(); path.forEach((p) => (v = v[p]));
      node.textContent = v;
    });

    el("langCurrent").textContent = lang.toUpperCase();
    el("langOther").textContent = lang === "cz" ? "EN" : "CZ";

    el("footerRights").textContent = `© ${new Date().getFullYear()} dinouseg. ${t().footer.rights}`;
    const mail = el("footerMail");
    mail.textContent = CONFIG.site.email;
    mail.href = "mailto:" + CONFIG.site.email;

    el("app").innerHTML = setupHTML();
    bindSetupCards();
    setupReveal();
  }

  /* ── Reveal při scrollu ───────────────────────────────────── */
  function setupReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "-60px", threshold: 0.05 });
    els.forEach((e, i) => { e.style.transitionDelay = (i % 5) * 0.05 + "s"; io.observe(e); });
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
    const sk = el("skeleton");
    if (sk) { sk.style.opacity = "0"; setTimeout(() => sk.remove(), 250); }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

/* ===================================================================
   DINOUSEG — analytika (bez cookies, bez consent banneru)
   Načte se jen když je v js/config.js vyplněná služba.
   Respektuje Do-Not-Track a běží jen na produkční doméně.
   =================================================================== */

(function () {
  "use strict";
  var a = (window.CONFIG && CONFIG.analytics) || {};

  // nesnímej na localhost / náhledech ani když má uživatel DNT
  var host = location.hostname;
  var isLocal = host === "localhost" || host === "127.0.0.1" || host === "" || location.protocol === "file:";
  var dnt = navigator.doNotTrack === "1" || window.doNotTrack === "1";
  if (isLocal || dnt) return;

  function load(src, attrs) {
    var s = document.createElement("script");
    s.src = src; s.defer = true;
    Object.keys(attrs || {}).forEach(function (k) { s.setAttribute(k, attrs[k]); });
    document.head.appendChild(s);
  }

  // Plausible — cookieless, GDPR-friendly
  if (a.plausibleDomain) {
    load("https://plausible.io/js/script.js", { "data-domain": a.plausibleDomain });
  }

  // GoatCounter — zdarma pro osobní weby (oficiální CDN gc.zgo.at)
  if (a.goatCounter) {
    load("https://gc.zgo.at/count.js", { "data-goatcounter": "https://" + a.goatCounter + ".goatcounter.com/count" });
  }
})();

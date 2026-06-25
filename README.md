# dinouseg — streaming web

Tmavý, minimalistický web pro streamovací kariéru na Kicku.
**Čistý HTML / CSS / JavaScript** — žádný build, žádný framework. Otevřeš a funguje.
CZ / EN přepínání. Hostuje se na Vercelu (statika).

---

## Struktura

```
index.html          → kostra stránky
css/style.css        → všechny styly (Kick téma, dark, animace)
js/config.js         → ★ TADY UPRAVUJEŠ VŠECHNO (data + texty)
js/main.js           → vykreslí web z configu (nešahat, pokud nemusíš)
logo.png             → logo (použité všude)
sitemap.xml, robots.txt, site.webmanifest → SEO
vercel.json          → nastavení hostingu
```

---

## Jak něco změnit

Otevři **`js/config.js`**, uprav, ulož, obnov stránku v prohlížeči (F5).

| Chci změnit… | Kde v config.js |
|---|---|
| Sledující + z kolika (bar) | `stats.followers` a `stats.followersMax` |
| Nastreamováno + z kolika (bar) | `stats.hoursStreamed` a `stats.hoursMax` |
| Program Po–Ne (časy, kategorie, volno) | `schedule` |
| Dovolená / volno nálepky | `vacations` |
| Sociální pás (odkazy + barvy) | `socials` |
| Discord (komunita button) | `discord.url` |
| Sestava / na čem streamuju | `gear` |
| Doména, e-mail, Kick URL | `site` |
| Texty CZ/EN | `TEXTS` (dole v config.js) |
| Logo | nahraď soubor `logo.png` |

### Jak fungují bary u statistik
Bar pod číslem = `hodnota / max`. Měníš `followersMax` / `hoursMax`:
- `followers: 10`, `followersMax: 20` → bar v půlce
- `followers: 10`, `followersMax: 10` → bar plný
- `followers: 10`, `followersMax: 100` → bar skoro prázdný

### Doplnit odkazy
V `socials` jsou některé `url: ""` prázdné (zobrazí se v pásu šedě) — doplň:
- **Discord** → `discord.url`: `https://discord.gg/TVUJ_KOD`
- **Steam** → `https://steamcommunity.com/id/dinouseg`
- **Xbox** → `https://account.xbox.com/profile?gamertag=dinouseg`
- **Roblox** → `https://www.roblox.com/users/ID/profile`

Prázdný odkaz se zobrazí jako „Brzy" a nedá se kliknout — žádná rozbitá URL.

### Dovolená nálepka — příklad
V `vacations` odkomentuj / přidej:
```js
{ from: "29.9.", to: "30.1.", labelCz: "Volno", labelEn: "Off" },
```

---

## Otevřít lokálně (na svém PC)

Stačí **dvakrát kliknout na `index.html`** → otevře se v prohlížeči.

> Pokud by se něco nenačetlo (kvůli `file://`), spusť mini server:
> ```
> python -m http.server 8000
> ```
> a otevři `http://localhost:8000`.

---

## Deploy na Vercel

### A) přes web (nejjednodušší, bez příkazů)
1. Jdi na **vercel.com** → přihlas se.
2. **Add New → Project**.
3. Buď napoj GitHub repo, **nebo** přetáhni celou složku do Vercelu (drag & drop deploy).
4. Vercel pozná statický web → **Deploy**. Hotovo.
5. **Settings → Domains** → přidej `dinouseg.eu` (nebo subdoménu).

### B) přes GitHub (auto-deploy při každé změně)
1. Vytvoř **nové prázdné repo** na github.com (např. `dinouseg-stream`).
   > ⚠️ NE do `svisku.github.io` — to je staré portfolio a GitHub Pages neumí tento setup správně cacheovat. Nové repo.
2. Nahraj:
   ```
   git init
   git add .
   git commit -m "dinouseg stream web"
   git branch -M main
   git remote add origin https://github.com/UZIVATEL/dinouseg-stream.git
   git push -u origin main
   ```
3. Na Vercelu **Import** to repo → Deploy. Každý další `git push` web sám aktualizuje.

> Po nastavení finální domény změň `site.url` v `js/config.js` (kvůli SEO / sitemap),
> a uprav `sitemap.xml` + `robots.txt` (jen URL).

---

## Hotové
- ✅ Program Po–Ne s kategoriemi + volno/dovolená nálepky
- ✅ Hry: hraju / v plánu / dohrané (prázdný stav)
- ✅ Statistiky: followers, % z cíle, nastreamováno (animovaná počítadla)
- ✅ Discord highlight + sítě (IG, YT, Steam, Xbox, Roblox, Gmail)
- ✅ CZ/EN přepínání (uloží se, primárně CZ)
- ✅ Loading skeleton + plynulé scroll animace
- ✅ SEO: meta, OpenGraph, sitemap, robots, manifest
- ✅ Kick barvy (černá + #53fc18), logo všude, custom design

## Dodáš později
- Sestava → `gear`
- Finální Discord / Steam / Xbox / Roblox odkazy → `socials`
- Reálná čísla followers → `stats`

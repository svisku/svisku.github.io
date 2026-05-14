/* ============================================================================
   DINOUSEG — HLAVNÍ DATOVÝ SOUBOR
   ============================================================================
   ZDE UPRAVUJEŠ VŠECHEN OBSAH WEBU:
     • kontakty (odkazy, nicky)
     • hry (hodiny, popisky, screenshoty)
     • hudba (názvy songů, odkazy na YouTube)
     • projekty (DinBot, Deconomy…)
     • Gaming HUB (popis, odkaz)
   ============================================================================ */

const DATA = {
  /* ==========================================================================
     KONTAKTY — sociální sítě, herní platformy, e-mail
     ==========================================================================
     Každý kontakt má:
       brand → identifikátor (určuje barvu a SVG ikonu, neměň pokud nepřidáváš novou)
       label → název platformy (zobrazí se malým)
       nick  → tvůj nick / e-mail (zobrazí se velkým)
       url   → kam vede kliknutí (přidej svůj reálný odkaz)
     ========================================================================== */
  contacts: [
    {
      brand: 'steam',
      label: 'Steam',
      nick: 'Dinouseg',
      url: 'https://steamcommunity.com/id/Dinouseg/',
    },
    {
      brand: 'discord',
      label: 'Discord',
      nick: 'dinouseg',
      url: 'https://discord.com/users/1066483005234888804',
    },
    {
      brand: 'tidal',
      label: 'Tidal',
      nick: 'Dinouseg',
      url: 'https://tidal.com/artist/59508796',
    },
    {
      brand: 'instagram',
      label: 'Instagram',
      nick: '@dinouseg',
      url: 'https://instagram.com/dinouseg',
    },
    {
      brand: 'xbox',
      label: 'Xbox',
      nick: 'Dinouseg',
      url: 'https://account.xbox.com/profile?gamertag=YOUR_GAMERTAG',
    },
    {
      brand: 'roblox',
      label: 'Roblox',
      nick: 'Dinouseg',
      url: 'https://www.roblox.com/users/4658779447/profile',
    },
    {
      brand: 'youtube',
      label: 'YouTube',
      nick: '@Dinouseg',
      url: 'https://youtube.com/@YOUR_YOUTUBE',
    },
    {
      brand: 'gmail',
      label: 'Gmail',
      nick: 'dinouseg@gmail.com',
      url: 'mailto:dinouseg@gmail.com',
    },
  ],

  /* ==========================================================================
     HRY — žebříček nejhranějších her
     ==========================================================================
     goalHours    = cílový počet hodin (lišta a žebříček se vůči němu počítají)
     goalTrophies = cílový počet trofejí (pro hry, kde se měří trofeje místo hodin)
                    Pořadí 1./2./3. se počítá podle procent naplnění cíle,
                    takže můžeš mít hry s hours i hry s trophy vedle sebe.
     ==========================================================================
     Každá hra má tyto pole:
       name    → název hry
       hours   → počet odehraných hodin (POUŽIJ TOTO NEBO trophy, ne obě)
       trophy  → počet trofejí (alternativa k hours; jednotka se zobrazí jako TROFEJÍ)
       tags    → tagy zobrazené v detailu
       img     → cesta k hlavnímu obrázku hry (do složky fotky/)
       desc    → popis hry v detailu (lze použít <strong>tučně</strong>)
       gallery → pole CEST k obrázkům v galerii detailu.
                 Pokud cesta chybí nebo obrázek se nenačte, slot bude prázdný
                 (žádný placeholder).
     ========================================================================== */
  goalHours: 1000,
  goalTrophies: 200000,
  games: [
    {
      name: 'Minecraft',
      hours: 7800,
      tags: ['Survival', 'Economy', 'Developer'],
      img: 'fotky/minecraft.png',
      desc: '<strong>Minecraft</strong> is game I played the most. I was at my peak during the quarantine on <strong>Halmine</strong>.',
      gallery: [
        'fotky/deconomy1.png',
        'fotky/deconomy2.png',
        'fotky/deconomy3.png',
        'fotky/deconomy4.png',
      ],
    },
    {
      name: 'FiveM',
      hours: 850,
      tags: ['TrinityRP', 'VertexRP', 'Military'],
      img: 'fotky/fivem.png',
      desc: 'I started sweating <strong>FiveM</strong> in September 2025, and after a break in January, I have Comeback on <strong>VertexRP</strong>.',
      gallery: [
        'fotky/fivem1.png',
        'fotky/fivem2.png',
        'fotky/fivem3.png',
        'fotky/fivem4.png',
      ],
    },
    {
      name: 'Brawl Stars',
      trophy: 17000,
      tags: ['Mobile', 'Strategy', 'Competitive'],
      img: 'fotky/brawlstars.png',
      desc: '<strong>Brawl Stars</strong> is a game I play with my buddies at school.',
      gallery: [
        'fotky/brawlstars1.png',
        'fotky/brawlstars2.png',
        'fotky/brawlstars3.png',
        'fotky/brawlstars4.png',
      ],
    },
  ],

  /* ==========================================================================
     HUDBA — playlist (5 tracků v jednom řádku)
     ==========================================================================
     Každý track:
       title  → název písničky
       artist → interpret
       thumb  → cesta k obrázku obalu (do složky fotky/)
       url    → odkaz na YouTube
     ========================================================================== */
  music: [
    {
      title: 'HAY LUPITA',
      artist: 'LOMIIEL',
      thumb: 'fotky/song1.jpg',
      url: 'https://www.youtube.com/watch?v=-82WWzgQgaw&list=RD-82WWzgQgaw&start_radio=1',
    },
    {
      title: 'Te Quería Ver',
      artist: 'Alemán, Neton Vega',
      thumb: 'fotky/song2.jpg',
      url: 'https://www.youtube.com/watch?v=Yjwmq5_vilc&list=RDYjwmq5_vilc&start_radio=1',
    },
    {
      title: ' +57',
      artist: 'KAROL G, Feid, DFZM',
      thumb: 'fotky/song3.jpg',
      url: 'https://www.youtube.com/watch?v=5r5UePOgMQU&list=RD5r5UePOgMQU&start_radio=1',
    },
    {
      title: 'Q U E V A S H A C E R H O Y ?',
      artist: 'Omar Courtz',
      thumb: 'fotky/song4.jpg',
      url: 'https://www.youtube.com/watch?v=oD9rgl6kgWA&list=RDoD9rgl6kgWA&start_radio=1',
    },
    {
      title: 'MAMAZOTA',
      artist: 'ARLENE MC',
      thumb: 'fotky/song5.jpg',
      url: 'https://www.youtube.com/watch?v=n1Ttq-YzFU4&list=RDn1Ttq-YzFU4&start_radio=1',
    },
  ],

  /* ==========================================================================
     PROJEKTY — tvoje práce / vlastní vývoj
     ==========================================================================
     Každý projekt:
       name       → název projektu
       sub        → krátký podtitulek (typ projektu)
       color      → akcentní barva karty (hex)
       desc       → delší popis
       icon       → cesta k ikoně (do složky fotky/)
       iconLetter → záložní písmeno když chybí ikona
     ========================================================================== */
  projects: [
    {
      name: 'DinBot',
      sub: 'Discord Bot',
      color: '#5865F2',
      desc: 'A custom-programmed Discord bot for moderating my Discord server',
      icon: 'fotky/dinbot.png',
      iconLetter: 'D',
    },
    {
      name: 'Deconomy',
      sub: 'Minecraft Server',
      color: '#5cb85c',
      desc: 'A Survival Economy Minecraft server for my friends with tons of plugins ~ it took over six months to build',
      icon: 'fotky/deconomy.png',
      iconLetter: 'D',
    },
  ],

  /* ==========================================================================
     WEB — pricing packages
     ==========================================================================
     3 packages side-by-side. One can have highlight:true → it gets emphasized.
     Each package:
       tier          → short label above name (Basic / Standard / Premium)
       name          → package name (large)
       price         → number (currency added automatically) OR string ("Custom")
                       If price is a string, currency is hidden.
       priceOriginal → original price BEFORE discount (optional).
                       When set and > price, a "sale" badge with strikethrough
                       original price is shown.
       priceNote     → short note below price ("one-time" / "by agreement")
       features      → list of what the package includes (rendered with ✓)
       cta           → button label
       url           → where the button leads
                       (default: index.html#kontakty — sends user to contacts)
       highlight     → true for the recommended package (pulsing glow + badge)
       badge         → badge text when highlight is true
     ========================================================================== */
  pricing: [
    {
      tier: 'Basic',
      name: 'One-Pager',
      priceOriginal: 159,
      price: 129,
      priceNote: 'one-time',
      features: [
        'Single-page static website',
        'Fully responsive (mobile & desktop)',
        'Dark mode design',
        'Your info, contacts & socials',
        'Basic hover animations',
      ],
      cta: "I'm interested",
      url: 'index.html#kontakty',
      highlight: false,
    },
    {
      tier: 'Standard',
      name: 'Portfolio',
      priceOriginal: 399,
      price: 239,
      priceNote: 'one-time',
      features: [
        'Multi-page website',
        'Smooth scroll & hover animations',
        'Custom fonts and color palette',
        'Image gallery + social cards',
        'Contact section with form',
        'SEO optimization',
        'Custom domain setup',
        '14 days of free support',
      ],
      cta: "I'm interested",
      url: 'index.html#kontakty',
      highlight: true,
      badge: 'Most popular',
    },
    {
      tier: 'Premium',
      name: 'All-in-One',
      price: 'Custom',
      priceNote: 'by agreement',
      features: [
        'Built exactly the way you want it',
        'Premium effects (stars, lava lamp, glassmorphism)',
        'Editable data files — update content yourself',
        'Animated transitions & micro-interactions',
        'Custom illustrations or designs',
        'Custom domain + full deployment',
        'Priority support & free updates',
      ],
      cta: "Let's talk",
      url: 'index.html#kontakty',
      highlight: false,
    },
  ],

  /* ==========================================================================
     GAMING HUB — tvůj uzavřený Discord server
     ==========================================================================
       image → cesta k velkému obrázku (do složky fotky/)
       url   → Discord invite odkaz
       desc  → popis komunity
     ========================================================================== */
  hub: {
    image: 'fotky/hub.jpg',
    url: 'https://discord.gg/NkPKnqQEHQ',
    desc: "Gaming HUB is a closed community of my closest friends. Membership isn't guaranteed it's reserved for a select few.",
  },
};

/* ============================================================================
   IKONY KONTAKTŮ — cesty k obrázkům log
   ============================================================================
   Sem nahraj svoje fotky log do složky fotky/ a uprav cesty.
   Klíč musí odpovídat brand v contacts: výše.
   Doporučený formát: čtvercový PNG s průhledným pozadím (např. 128×128 px).
   Když fotka chybí, zobrazí se první písmeno názvu jako fallback.
   ============================================================================ */
const ICONS = {
  discord: 'fotky/discord_logo.png',
  roblox: 'fotky/roblox_logo.png',
  tidal: 'fotky/tidal_logo.png',
  steam: 'fotky/steam_logo.png',
  instagram: 'fotky/instagram_logo.png',
  xbox: 'fotky/xbox_logo.png',
  youtube: 'fotky/youtube_logo.png',
  gmail: 'fotky/gmail_logo.png',
};

/* ===================================================================
   DINOUSEG — KONFIGURACE WEBU
   Tady upravuješ VŠECHNO: rozvrh, dovolenou, čísla, odkazy, hry.
   Ulož soubor a obnov stránku v prohlížeči (F5). Hotovo.
   =================================================================== */

const CONFIG = {
  /* ── ZÁKLAD ──────────────────────────────────────────────── */
  site: {
    nick: 'dinouseg',
    url: 'https://dinouseg.eu', // finální doména (kvůli SEO)
    email: 'dinouseg@gmail.com', // hlavní kontakt
    kickUrl: 'https://kick.com/dinouseg',
  },

  /* ── ANALYTIKA (bez cookies, bez consent banneru) ─────────────
     Vyber JEDNU službu a vyplň. Prázdné = vypnuto.
     • Plausible:  zadej doménu do plausibleDomain (např. 'dinouseg.eu').
       (potřebuješ účet na plausible.io nebo self-host)
     • GoatCounter: zadej svůj kód do goatCounter (např. 'dinouseg'
       → načte https://dinouseg.goatcounter.com). Zdarma pro osobní weby.
     Obě jsou GDPR-friendly: neukládají cookies ani osobní data.        */
  analytics: {
    plausibleDomain: '', // např. 'dinouseg.eu'
    goatCounter: 'dinouseg', // tvůj kód → https://dinouseg.goatcounter.com
  },

  /* ── STATISTIKY (ruční čísla — měň kdykoliv) ───────────────
     Bar pod číslem = hodnota / max. Měň max podle sebe:
       followers 10 z followersMax 20  → bar v půlce
       followers 10 z followersMax 10  → bar plný
       followers 10 z followersMax 100 → bar skoro prázdný    */
  stats: {
    followers: 5, // počet sledujících na Kicku
    followersMax: 10, // z kolika (cíl/maximum pro bar)
    hoursStreamed: 10.1, // celkem nastreamováno (hodiny)
    hoursMax: 30, // z kolika (maximum pro bar)
    streak: 3, // streak — kolik dní/streamů v řadě
    streakMax: 30, // z kolika (cíl/maximum pro bar)
  },

  /* ── PROGRAM Po–Ne ───────────────────────────────────────────
     type: "stream" = vysíláš | "off" = volno
     Časy ve formátu "12:00". category = co se v tu dobu děje.   */
  schedule: [
    {
      day: 'mon',
      type: 'stream',
      from: '12:00',
      to: '20:00',
      categoryCz: 'Hry',
      categoryEn: 'Games',
    },
    {
      day: 'tue',
      type: 'stream',
      from: '18:00',
      to: '20:00',
      categoryCz: 'IRL',
      categoryEn: 'IRL',
    },
    {
      day: 'wed',
      type: 'stream',
      from: '18:00',
      to: '22:00',
      categoryCz: 'Hry',
      categoryEn: 'Games',
    },
    { day: 'thu', type: 'off' },
    {
      day: 'fri',
      type: 'stream',
      from: '18:00',
      to: '00:00',
      categoryCz: 'Hry s přáteli',
      categoryEn: 'Games w/ friends',
    },
    {
      day: 'sat',
      type: 'stream',
      from: '14:00',
      to: '00:00',
      categoryCz: 'Hry',
      categoryEn: 'Games',
    },
    {
      day: 'sun',
      type: 'stream',
      from: '14:00',
      to: '22:00',
      categoryCz: 'Chill / Variety',
      categoryEn: 'Chill / Variety',
    },
  ],

  /* ── DOVOLENÁ / VOLNO (nálepky přes rozvrh) ──────────────────
     Příklad: { from: "29.9.", to: "30.1.", labelCz: "Volno", labelEn: "Off" }
     Necháš prázdné [] = žádná nálepka.                          */
  vacations: [
    // { from: "29.9.", to: "30.1.", labelCz: "Volno", labelEn: "Off" },
  ],

  /* ── HRY ─────────────────────────────────────────────────────
     Tři skupiny. noteCz/noteEn = malá poznámka (nepovinné).      */
  games: {
    // Dohrané — zatím prázdné (web ukáže hezký prázdný stav)
    finished: [],

    // V plánu zahrát / dohrát
    planned: [
      { name: 'Cyberpunk 2077', noteCz: 'Dohrát DLC', noteEn: 'Finish DLC' },
      { name: 'Sea of Thieves', noteCz: 'Tall Tales', noteEn: 'Tall Tales' },
    ],

    // Aktuálně hraju na streamu
    playing: [
      { name: 'Minecraft', noteCz: 'Survival', noteEn: 'Survival' },
      { name: 'Roblox', noteCz: 'Deathmatch', noteEn: 'Deathmatch' },
      { name: 'FiveM', noteCz: 'Když mám náladu', noteEn: 'When in the mood' },
    ],
  },

  /* ── ODKAZY ──────────────────────────────────────────────────
     url prázdné "" = zobrazí se "Brzy" a nedá se kliknout.
     Doplň později nick/kód.                                      */
  /* color = začátek přechodu, color2 = konec přechodu (text má gradient).
     Když color2 vynecháš, použije se color (jednolitá barva).            */
  socials: [
    {
      id: 'kick',
      label: 'Kick',
      url: 'https://kick.com/dinouseg',
      color: '#53fc18',
      color2: '#0ce86b',
    },
    {
      id: 'instagram',
      label: 'Instagram',
      url: 'https://instagram.com/dinouseg',
      color: '#feda75',
      color2: '#962fbf',
    },
    {
      id: 'youtube',
      label: 'YouTube',
      url: 'https://youtube.com/@dinouseg',
      color: '#ff4d4d',
      color2: '#cc0000',
    },
    {
      id: 'steam',
      label: 'Steam',
      url: 'https://steamcommunity.com/id/Dinouseg/',
      color: '#66c0f4',
      color2: '#1b6fb3',
    }, // doplň profil URL
    { id: 'xbox', label: 'Xbox', url: '', color: '#3fd35a', color2: '#107c10' }, // doplň gamertag URL
    {
      id: 'roblox',
      label: 'Roblox',
      url: '',
      color: '#ff4a40',
      color2: '#b3160c',
    }, // doplň profil URL
    {
      id: 'email',
      label: 'Gmail',
      url: 'mailto:dinouseg@gmail.com',
      color: '#fbbc05',
      color2: '#ea4335',
    },
  ],

  /* ── DISCORD (komunita) ──────────────────────────────────────
     Doplň invite kód. Klik na celý button → tahle URL.          */
  discord: {
    url: 'https://discord.gg/hXmWSaf4Xe', // např. "https://discord.gg/TVUJKOD"
  },

  /* ── SETUP / KOMPONENTY (stránka setup.html) ─────────────────
     Dvě skupiny: pc (sestava) + desk (stůl a periferie).
     Položka:
       name      = název dílu
       typeCz/En = krátký štítek (Procesor, Klávesnice…)
       descCz/En = popisek
       url       = odkaz na produkt (klik na kartu); prázdné = neklikatelné
       parts[]   = další díly v komboo: { name, url }  (klikatelné štítky)
     Přidej/uber položky jak chceš.                               */
  setup: {
    pc: [
      {
        slug: 'ryzen5600',
        name: 'Ryzen 5 5600 + Endorfy Fera 5',
        typeCz: 'Procesor & chladič',
        typeEn: 'Processor & cooler',
        descCz: '6-jádrový / 12-vlákenný procesor, mozek sestavy udržovaný v chladu chladičem Endorfy Fera.',
        descEn: '6-core / 12-thread CPU, the brain of the build kept cool by an Endorfy Fera tower air cooler.',
        url: 'https://www.alza.cz/amd-ryzen-5-5600-d7082021.htm',
        parts: [
          { name: 'Endorfy Fera 5', url: 'https://www.alza.cz/endorfy-fera-5-dual-fan-d7617316.htm' },
        ],
      },
      {
        slug: 'rx6700xt',
        name: 'Sapphire Pulse RX 6700 XT',
        typeCz: 'Grafická karta',
        typeEn: 'Graphics card',
        descCz: '12 GB videopaměti pro hraní her.',
        descEn: '12 GB GPU pushing the pixels for gaming.',
        url: 'https://www.alza.cz/sapphire-pulse-radeon-rx-6700-xt-12g-d6386172.htm',
      },
      {
        slug: 'b450plus',
        name: 'ASUS TUF Gaming B450-PLUS II',
        typeCz: 'Základní deska',
        typeEn: 'Motherboard',
        descCz: 'Deska, na kterou se všechno připojuje.',
        descEn: 'The board everything plugs into.',
        url: 'https://www.alza.cz/asus-tuf-gaming-b450-plus-ii-d6219598.htm',
      },
      {
        slug: 'furyram',
        name: 'Kingston FURY 32 GB DDR4 3200',
        typeCz: 'Operační paměť',
        typeEn: 'Memory',
        descCz: '32 GB CL16 dual-channel kit.',
        descEn: '32 GB CL16 dual-channel kit.',
        url: 'https://www.alza.cz/kingston-fury-32gb-kit-ddr4-3200mhz-cl16-beast-black-d6633224.htm',
      },
      {
        slug: 'seasonic650',
        name: 'Seasonic G12 GM-650 Gold',
        typeCz: 'Zdroj',
        typeEn: 'Power supply',
        descCz: '650 W 80+ Gold, polo-modulární.',
        descEn: '650 W 80+ Gold, semi-modular.',
        url: 'https://www.alza.cz/seasonic-g12-gm-650-gold-v1-5-d12671790.htm',
      },
      {
        slug: 'fluctus120',
        name: 'Fluctus 140 3× + Focus 2 White',
        typeCz: 'Ventilátor & skříň',
        typeEn: 'Case fan & case',
        descCz: 'Skříň ve které to všechno je a ventilátory uvnitř ní.',
        descEn: 'Three Endorfy Fluctus 140 fans for airflow, and the Fractal Design Focus 2 case they’re mounted in.',
        url: 'https://www.alza.cz/endorfy-stratus-140-pwm-d7805978.htm',
        parts: [
          { name: 'Fractal Design Focus 2 White', url: 'https://www.alza.cz/fractal-design-focus-2-white-tg-clear-tint-d7362332.htm' },
        ],
      },
      {
        slug: 'sn570',
        name: 'WD SN570 2 TB + Toshiba 1 TB',
        typeCz: 'Úložiště',
        typeEn: 'Storage',
        descCz: 'Rychlý WD Blue SN570 2 TB NVMe + 1 TB Toshiba HDD pro úložiště navíc.',
        descEn: 'Fast WD Blue SN570 2 TB NVMe + 1 TB Toshiba HDD for extra storage.',
        url: 'https://www.alza.cz/wd-blue-sn570-2tb-d7006640.htm',
        parts: [
          { name: 'Toshiba MQ01ABD100 1 TB', url: 'https://pevne-disky.heureka.cz/toshiba-1tb-2_5-sataii-5400rpm-8mb-mq01abd100/#prehled/' },
        ],
      },
    ],
    desk: [
      {
        slug: 'aoc24',
        name: 'AOC Q24G2A · Arm · Light Bar',
        typeCz: 'Hlavní monitor',
        typeEn: 'Main monitor setup',
        descCz: 'Hlavní QHD herní monitor na rameni AlzaErgo Arm AR1.1, osvětlený světlem AlzaPower LML-120.',
        descEn: 'Main QHD gaming monitor on an AlzaErgo Arm AR1.1, lit by an AlzaPower LML-120 light bar.',
        url: 'https://www.alza.cz/24-aoc-q24g2a-bk-d7870150.htm',
        parts: [
          { name: 'AlzaPower LML-120 Light Bar', url: 'https://www.alza.cz/alzapower-lml-120-monitor-light-bar-5w-51cm-cerne-d12406731.htm' },
          { name: 'AlzaErgo Arm AR1.1', url: 'https://www.alza.cz/alzaergo-arm-ar1-1-cerny-d6306708.htm' },
        ],
      },
      {
        slug: 'crg50',
        name: 'Samsung CRG50 + Riser',
        typeCz: 'Monitor & podstavec',
        typeEn: 'Monitor & riser',
        descCz: 'Zakřivený FHD sekundární monitor na podstavci AlzaErgo Riser ER160WB.',
        descEn: 'Curved FHD secondary monitor sitting on an AlzaErgo Riser ER160WB.',
        url: 'https://www.alza.cz/24-samsung-c24rg50-d5597534.htm',
        parts: [
          { name: 'AlzaErgo Riser ER160WB', url: 'https://www.alza.cz/alzaergo-riser-er160wb-cerny-d5608243.htm' },
        ],
      },
      {
        slug: 'dell27',
        name: 'Dell P2414H 24"',
        typeCz: 'Monitor',
        typeEn: 'Monitor',
        descCz: 'Třetí monitor, protože jich nikdy není dost.',
        descEn: 'Third monitor because there are never enough.',
        url: 'https://www.alza.cz/24-dell-p2414h-professional-d476517.htm',
      },
      {
        slug: 'akko5075b',
        name: 'Akko 5075B + Geekboy Keycaps',
        typeCz: 'Klávesnice',
        typeEn: 'Keyboard',
        descCz: 'Akko 5075B Plus Dracula Castle (V3 Pro Cream Yellow) s vlastní sadou Geekboy keycapů.',
        descEn: 'Akko 5075B Plus Dracula Castle (V3 Pro Cream Yellow) wearing a custom Geekboy keycap set.',
        url: 'https://www.alza.cz/akko-5075b-plus-dracula-castle-d12738073.htm',
        parts: [
          { name: 'Geekboy Keycaps', url: 'https://www.alza.cz/dark-project-x-geekboy-keycaps-d12755903.htm' },
        ],
      },
      {
        slug: 'g305',
        name: 'Logitech G305',
        typeCz: 'Myš',
        typeEn: 'Mouse',
        descCz: 'Lehká bezdrátová herní myš.',
        descEn: 'Lightweight wireless gaming mouse.',
        url: 'https://www.alza.cz/logitech-g305-recoil-cerna-d5285988.htm',
      },
      {
        slug: 'numcalc',
        name: 'CONNECT IT NumCALC',
        typeCz: 'Numerická klávesnice',
        typeEn: 'Numpad',
        descCz: 'Nízkonákladový streamdeck pro zkratky a makra.',
        descEn: 'Low-budget streamdeck for binds and macros.',
        url: 'https://www.alza.cz/connect-it-numcalc-ckb-0060-bk-cerna-d5506514.htm',
      },
      {
        slug: 'g29',
        name: 'Logitech G29',
        typeCz: 'Závodní volant',
        typeEn: 'Racing wheel',
        descCz: 'Volant s force-feedbackem + pedály.',
        descEn: 'Force-feedback wheel + pedals.',
        url: 'https://www.alza.cz/gaming/logitech-g29-driving-force-d2905113.htm',
      },
      {
        slug: 'dt770',
        name: 'Beyerdynamic DT 770 Pro 80Ω',
        typeCz: 'Sluchátka',
        typeEn: 'Headphones',
        descCz: 'Uzavřená studiová sluchátka.',
        descEn: 'Closed-back studio headphones.',
        url: 'https://www.alza.cz/beyerdynamic-dt-770-pro-80-ohm-d5485134.htm',
      },
      {
        slug: 'fifinet669',
        name: 'FIFINE T669',
        typeCz: 'Mikrofon',
        typeEn: 'Microphone',
        descCz: 'USB kondenzátorový mikrofon s ramenem.',
        descEn: 'USB condenser mic with arm.',
        url: 'https://www.alza.cz/fifine-t669-d6297954.htm',
      },
      {
        slug: 'quest3',
        name: 'Meta Quest 3 (128 GB)',
        typeCz: 'VR headset',
        typeEn: 'VR headset',
        descCz: 'Mixed-reality headset pro hraní.',
        descEn: 'Mixed-reality headset for gaming.',
        url: 'https://www.alza.cz/gaming/meta-quest-3-128-gb-d7962773.htm',
      },
      {
        slug: 'tplinkswitch',
        name: 'TP-Link LiteWave LS105G',
        typeCz: 'Síťový switch',
        typeEn: 'Network switch',
        descCz: '5-portový gigabitový switch.',
        descEn: '5-port gigabit switch.',
        url: 'https://www.alza.cz/tp-link-litewave-ls105g-d5711597.htm',
      },
      {
        slug: 'presidentchair',
        name: 'IDEA President',
        typeCz: 'Kancelářská židle',
        typeEn: 'Office chair',
        descCz: 'Židle, která je starší jak já.',
        descEn: 'Chair that’s older than me.',
        url: 'https://www.alza.cz/idea-nabytek-kancelarske-kreslo-president-cerne-d12924855.htm',
      },
      {
        slug: 'bekanttop',
        name: 'IKEA BEKANT 160×80',
        typeCz: 'Stůl',
        typeEn: 'Desk',
        descCz: 'Postavený stůl s deskou a rámem BEKANT.',
        descEn: 'Built desk with a BEKANT tabletop and frame.',
        url: 'https://www.ikea.com/gb/en/p/bekant-table-top-white-60253184/',
        parts: [
          { name: 'IKEA BEKANT Frame', url: 'https://www.ikea.com.tr/en/product/bekant-black-160x80-cm-underframe-for-table-top-30252906' },
        ],
      },
    ],
  },
};

/* ===================================================================
   PŘEKLADY CZ / EN  (texty webu)
   =================================================================== */
const TEXTS = {
  cz: {
    nav: { program: 'Program', komponenty: 'Komponenty', komunita: 'Komunita' },
    hero: {
      live: 'Streamuju na Kicku',
      tagline: '',
      ctaWatch: 'Sledovat na Kicku',
      ctaCommunity: 'Připojit se na Discord',
    },
    info: {
      title: 'O streamu',
      whatLabel: 'Co streamuju',
      what: 'Hry, IRL a variety — Minecraft, Roblox, FiveM a další.',
      whenLabel: 'Kdy',
      when: 'Skoro každý den, večery a víkendy.',
      whereLabel: 'Kde',
      where: 'Kick — kick.com/dinouseg',
    },
    schedule: {
      title: 'Program',
      subtitle: 'Týdenní rozvrh — co se kdy děje.',
      off: 'Volno',
      category: 'Kategorie',
    },
    setup: {
      title: 'Komponenty',
      subtitle: 'Na čem streamuju a tvořím — celá sestava a stůl.',
      pcTitle: 'PC sestava',
      pcSub: 'Vnitřnosti — díly, ze kterých je počítač.',
      deskTitle: 'Stůl & periferie',
      deskSub: 'Co mám na stole a kolem něj.',
      empty: 'Doplním brzy.',
      back: 'Zpět na hlavní',
    },
    games: {
      title: 'Hry',
      playing: 'Aktuálně hraju',
      planned: 'V plánu',
      finished: 'Dohrané',
      emptyFinished: 'Zatím nic dohraného — sleduj, co přibude.',
    },
    stats: {
      goalsTitle: 'Cíle tohoto měsíce',
      followers: 'sledujících',
      hours: 'hodin streamováno',
      streak: 'stream streak',
    },
    community: {
      title: 'Komunita',
      text: 'Discord je domov komunity — chat, hry a oznámení streamů.',
      cta: 'Vstoupit na Discord',
    },
    links: {
      title: 'Najdeš mě tady',
      subtitle: 'Všechny moje sítě a kontakt.',
    },
    footer: { rights: 'Všechna práva vyhrazena.' },
    soon: 'Brzy',
    days: {
      mon: 'Pondělí',
      tue: 'Úterý',
      wed: 'Středa',
      thu: 'Čtvrtek',
      fri: 'Pátek',
      sat: 'Sobota',
      sun: 'Neděle',
    },
  },
  en: {
    nav: { program: 'Schedule', komponenty: 'Setup', komunita: 'Community' },
    hero: {
      live: 'Streaming on Kick',
      tagline: '',
      ctaWatch: 'Watch on Kick',
      ctaCommunity: 'Join the Discord',
    },
    info: {
      title: 'About the stream',
      whatLabel: 'What I stream',
      what: 'Games, IRL and variety — Minecraft, Roblox, FiveM and more.',
      whenLabel: 'When',
      when: 'Almost daily, evenings and weekends.',
      whereLabel: 'Where',
      where: 'Kick — kick.com/dinouseg',
    },
    schedule: {
      title: 'Schedule',
      subtitle: 'Weekly plan — what happens and when.',
      off: 'Off',
      category: 'Category',
    },
    setup: {
      title: 'Setup',
      subtitle: 'What I stream and build on — the full rig and desk.',
      pcTitle: 'PC build',
      pcSub: 'The guts — parts the machine is made of.',
      deskTitle: 'Desk & peripherals',
      deskSub: 'What sits on and around the desk.',
      empty: 'Coming soon.',
      back: 'Back to home',
    },
    games: {
      title: 'Games',
      playing: 'Currently playing',
      planned: 'Planned',
      finished: 'Finished',
      emptyFinished: 'Nothing finished yet — stay tuned.',
    },
    stats: {
      goalsTitle: 'Goals this month',
      followers: 'followers',
      hours: 'hours streamed',
      streak: 'stream streak',
    },
    community: {
      title: 'Community',
      text: 'Discord is the home of the community — chat, games and stream alerts.',
      cta: 'Enter the Discord',
    },
    links: { title: 'Find me here', subtitle: 'All my socials and contact.' },
    footer: { rights: 'All rights reserved.' },
    soon: 'Soon',
    days: {
      mon: 'Monday',
      tue: 'Tuesday',
      wed: 'Wednesday',
      thu: 'Thursday',
      fri: 'Friday',
      sat: 'Saturday',
      sun: 'Sunday',
    },
  },
};

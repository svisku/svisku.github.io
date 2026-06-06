/* Data layer. Optimized WebP images live in category folders:
   fotky/thumbnails/ (games, songs, logos), fotky/setup/ (setup parts).
   `thumb` = small preview (lists/cards), `img`/`full` = larger detail view. */
const IMG = 'fotky/thumbnails/';

const DATA = {
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
      url: 'https://tidal.com/browse/user/Dinouseg',
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
      url: 'https://account.xbox.com/profile?gamertag=dinouseg',
    },
    {
      brand: 'roblox',
      label: 'Roblox',
      nick: 'Dinouseg',
      url: 'https://www.roblox.com/users/Dinouseg/profile',
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

  games: [
    { name: 'Minecraft', hours: 7800, thumb: IMG + 'minecraft.thumb.webp' },
    { name: 'FiveM', hours: 850, thumb: IMG + 'fivem.thumb.webp' },
    { name: 'Roblox', hours: 2500, thumb: IMG + 'roblox_logo.webp' },
  ],

  music: [
    {
      title: 'HAY LUPITA',
      artist: 'LOMIIEL',
      thumb: IMG + 'song6.thumb.webp',
      url: 'https://youtu.be/-82WWzgQgaw?si=6vRq7A-tVuBUjE9v',
    },
    {
      title: 'Te Quería Ver',
      artist: 'Alemán, Neton Vega',
      thumb: IMG + 'song5.thumb.webp',
      url: 'https://youtu.be/Yjwmq5_vilc?si=ERT56Vvv4i3o07tL',
    },
    {
      title: 'Soy la Más Mala de España',
      artist: 'Bb trickz, Bryant LR',
      thumb: IMG + 'song2.thumb.webp',
      url: 'https://youtu.be/U1mB27TuDBo?si=9thsQnZtqT5vMqwn',
    },
    {
      title: 'Candy',
      artist: 'Plan B',
      thumb: IMG + 'song3.thumb.webp',
      url: 'https://youtu.be/9FWgcBfs5A0?si=ZQXVmuWwrd9HHphN',
    },
    {
      title: 'Vamos A La Playa (Brainkick & Diztorted Bootleg)',
      artist: 'Dinouseg',
      thumb: IMG + 'song1.thumb.webp',
      url: 'https://on.soundcloud.com/arQ2HsTJPUc3RdHqoU',
    },
    {
      title: 'Stadium Slowtempo',
      artist: 'ijgenweis & EQUAL2',
      thumb: IMG + 'song4.thumb.webp',
      url: 'https://youtu.be/CaefJtURU64?si=3A29nJ9K_b3sCDVp',
    },
    {
      title: 'Mr Saxobeat (180er HardTekk Edit)',
      artist: 'AZRAEL [K-M-R]',
      thumb: IMG + 'song7.thumb.webp',
      url: 'https://on.soundcloud.com/QTOuphuvpHSO6DZUoO',
    },
    {
      title: 'Till the End',
      artist: 'overrated',
      thumb: IMG + 'song8.thumb.webp',
      url: 'https://youtu.be/B8M_AotiI-w?si=W879Zhds5Sgd-Q9Y',
    },
  ],

  // Prices carry both currencies. czk = rounded down (a touch cheaper),
  // eur = rounded up. Currency follows the UI language (cs->czk, en->eur).
  pricing: [
    {
      tier: 'Basic',
      name: 'One-Pager',
      tagline: {
        en: 'A simple one-page website.',
        cs: 'Jednoduchý web na jedné stránce.',
      },
      priceOriginal: { eur: 189, czk: 4490 },
      price: { eur: 129, czk: 2990 },
      priceNote: { en: 'one-time', cs: 'jednorázově' },
      features: [
        { en: 'One page, everything on it', cs: 'Jedna stránka, vše na ní' },
        {
          en: 'Looks great on phone & desktop',
          cs: 'Skvěle vypadá na mobilu i PC',
        },
        { en: 'Modern design', cs: 'Moderní design' },
        { en: 'Your info, links & socials', cs: 'Tvé info, odkazy a sítě' },
        { en: 'Smooth hover effects', cs: 'Plynulé hover efekty' },
        { en: 'Ready in just a few days', cs: 'Hotovo během pár dní' },
      ],
      cta: { en: "I'm interested", cs: 'Mám zájem' },
      mailPackage: 'One-Pager',
      highlight: false,
    },
    {
      tier: 'Standard',
      name: 'Portfolio',
      tagline: {
        en: 'A full custom website. The one most people pick.',
        cs: 'Plnohodnotný web na míru. Nejčastější volba.',
      },
      priceOriginal: { eur: 449, czk: 9990 },
      price: { eur: 279, czk: 6490 },
      priceNote: { en: 'one-time', cs: 'jednorázově' },
      features: [
        { en: 'Multiple pages', cs: 'Více stránek' },
        { en: 'Custom design made for you', cs: 'Design na míru jen pro tebe' },
        {
          en: 'Animations & smooth scrolling',
          cs: 'Animace a plynulé scrollování',
        },
        { en: 'Photo galleries & cards', cs: 'Fotogalerie a karty' },
        { en: 'Contact form', cs: 'Kontaktní formulář' },
        {
          en: 'Built to rank on Google (SEO)',
          cs: 'Připraveno na Google (SEO)',
        },
        {
          en: 'Week of free changes after launch',
          cs: 'Týden úprav zdarma po spuštění',
        },
      ],
      cta: { en: "I'm interested", cs: 'Mám zájem' },
      mailPackage: 'Portfolio',
      highlight: true,
      badge: { en: 'Best value', cs: 'Nejvýhodnější' },
    },
    {
      tier: 'Premium',
      name: 'Custom',
      tagline: {
        en: 'Built exactly how you want it.',
        cs: 'Postavený přesně jak chceš.',
      },
      priceFrom: { eur: 499, czk: 11990 },
      priceNote: { en: 'from · by agreement', cs: 'od · dle domluvy' },
      features: [
        { en: 'Anything you can imagine', cs: 'Cokoliv si vymyslíš' },
        {
          en: '3D, shaders & advanced animations',
          cs: '3D, shadery a pokročilé animace',
        },
        {
          en: 'Custom graphics & illustrations',
          cs: 'Vlastní grafika a ilustrace',
        },
        {
          en: 'You can edit the content yourself',
          cs: 'Obsah si můžeš upravovat sám',
        },
        {
          en: 'Priority support & free updates',
          cs: 'Přednostní podpora a aktualizace zdarma',
        },
        {
          en: 'Whatever your project needs',
          cs: 'Cokoliv tvůj projekt potřebuje',
        },
      ],
      cta: { en: "Let's talk", cs: 'Pojďme to probrat' },
      mailPackage: 'Custom',
      highlight: false,
    },
  ],

  // email used by the "I'm interested" buttons (opens default mail app)
  webMail: 'dinouseg@gmail.com',

  // extra paid services, not included in the website price.
  // czk = real price (incl. VAT), eur = rounded up. Domain prices are the
  // STABLE yearly price (incl. 21% VAT) — same every year, no first-year promo.
  webExtras: [
    {
      name: { en: 'Domain', cs: 'Doména' },
      note: { en: 'Your web address', cs: 'Tvoje adresa webu' },
      desc: {
        en: 'Your own address like yourname.cz. I set it up and you just pay the yearly price.',
        cs: 'Vlastní adresa jako tvojejmeno.cz. Nastavím ji a ty platíš jen roční cenu.',
      },
      items: [
        { label: '.eu', perYear: { czk: 200, eur: 9 } },
        { label: '.cz', perYear: { czk: 200, eur: 9 } },
        { label: '.com', perYear: { czk: 500, eur: 21 } },
      ],
    },
    {
      name: { en: 'Hosting', cs: 'Hosting' },
      note: { en: 'Where the site lives', cs: 'Kde web běží' },
      desc: {
        en: 'The space your website runs on. Paid once a year, pick a plan and I handle the setup.',
        cs: 'Prostor, na kterém web běží. Platí se jednou ročně, vyber plán a o nastavení se postarám.',
      },
      items: [
        { label: 'Basic', perYear: { czk: 790, eur: 32 } },
        {
          label: 'Standard',
          perYear: { czk: 1490, eur: 60 },
          recommended: true,
        },
        { label: 'Premium', perYear: { czk: 2990, eur: 120 } },
      ],
    },
    {
      name: { en: 'Monthly care', cs: 'Měsíční péče' },
      note: { en: 'I look after it', cs: 'Starám se o web' },
      desc: {
        en: 'I keep the site updated, online and make small changes whenever you need. Pay monthly, cancel anytime.',
        cs: 'Udržuji web aktuální, online a dělám drobné změny, kdykoliv potřebuješ. Platba měsíčně, lze zrušit kdykoliv.',
      },
      items: [{ label: 'Care plan', perMonth: { czk: 199, eur: 8 } }],
    },
  ],

  // how it works + payment terms
  webProcess: [
    {
      step: 1,
      title: { en: 'Tell me your idea', cs: 'Řekni mi svůj nápad' },
      text: {
        en: 'Pick a package and message me. We go over what you want and what it should do.',
        cs: 'Vyber balíček a napiš mi. Probereme, co chceš a co má web umět.',
      },
    },
    {
      step: 2,
      title: { en: 'I build it', cs: 'Postavím to' },
      text: {
        en: 'I design and code your website from scratch — no templates.',
        cs: 'Navrhnu a naprogramuji web od nuly — žádné šablony.',
      },
    },
    {
      step: 3,
      title: { en: 'You try it live', cs: 'Vyzkoušíš si to naživo' },
      text: {
        en: 'I put it online so you can open it on your phone or computer and click around.',
        cs: 'Pustím web online, abys ho mohl otevřít na mobilu i počítači a proklikat si ho.',
      },
    },
    {
      step: 4,
      title: { en: 'We fine-tune it', cs: 'Doladíme to' },
      text: {
        en: "Tell me anything you'd like changed. I keep tweaking until you're happy.",
        cs: 'Řekni, co chceš změnit. Ladím to, dokud nebudeš spokojený.',
      },
    },
    {
      step: 5,
      title: { en: 'Go live', cs: 'Spuštění' },
      text: {
        en: 'We sort out domain and hosting, you pay, and your website goes live for real.',
        cs: 'Vyřešíme doménu a hosting, zaplatíš a web jde naostro online.',
      },
    },
  ],

  webPayment: {
    title: { en: 'Good to know', cs: 'Dobré vědět' },
    points: [
      {
        en: 'You pay to my bank account — by transfer.',
        cs: 'Platíš na můj bankovní účet — převodem.',
      },
      {
        en: 'You pay for the website once, plus domain and hosting if you want them.',
        cs: 'Za web platíš jednou, plus doménu a hosting, pokud je chceš.',
      },
      {
        en: "I don't send invoices or payment receipts.",
        cs: 'Nevystavuji faktury ani potvrzení o platbě.',
      },
      {
        en: 'Your site goes live as soon as the payment lands.',
        cs: 'Web jde online, jakmile dorazí platba.',
      },
    ],
  },

  // My setup. img -> fotky/setup/<slug>.webp
  // Add product links in the `url` fields below (paste between the quotes).
  // Combo cards: each half has its own url — clicking a half opens that link.
  setup: {
    pc: [
      {
        slug: 'ryzen5600',
        url: 'https://www.alza.cz/amd-ryzen-5-5600-d7082021.htm',
        combo: {
          slug: 'fera5',
          name: 'Endorfy Fera 5',
          url: 'https://www.alza.cz/endorfy-fera-5-dual-fan-d7617316.htm',
        },
        name: 'Ryzen 5 5600 + Endorfy Fera 5',
        type: { en: 'Processor & cooler', cs: 'Procesor & chladič' },
        desc: {
          en: '6-core / 12-thread CPU, the brain of the build kept cool by an Endorfy Fera tower air cooler.',
          cs: '6-jádrový / 12-vlákenný procesor, mozek sestavy udržovaný v chladu chladičem Endorfy Fera.',
        },
      },
      {
        slug: 'rx6700xt',
        url: 'https://www.alza.cz/sapphire-pulse-radeon-rx-6700-xt-12g-d6386172.htm',
        name: 'Sapphire Pulse RX 6700 XT',
        type: { en: 'Graphics card', cs: 'Grafická karta' },
        desc: {
          en: '12 GB GPU pushing the pixels for gaming.',
          cs: '12 GB videopaměti ovládací karty pro hraní her.',
        },
      },
      {
        slug: 'b450plus',
        url: 'https://www.alza.cz/asus-tuf-gaming-b450-plus-ii-d6219598.htm',
        name: 'ASUS TUF Gaming B450-PLUS II',
        type: { en: 'Motherboard', cs: 'Základní deska' },
        desc: {
          en: 'The board everything plugs into.',
          cs: 'Deska, na kterou se všechno připojuje.',
        },
      },
      {
        slug: 'furyram',
        url: 'https://www.alza.cz/kingston-fury-32gb-kit-ddr4-3200mhz-cl16-beast-black-d6633224.htm',
        name: 'Kingston FURY 32 GB DDR4 3200',
        type: { en: 'Memory', cs: 'Operační paměť' },
        desc: {
          en: '32 GB CL16 dual-channel kit.',
          cs: '32 GB CL16 dual-channel kit.',
        },
      },
      {
        slug: 'seasonic650',
        url: 'https://www.alza.cz/seasonic-g12-gm-650-gold-v1-5-d12671790.htm',
        name: 'Seasonic G12 GM-650 Gold',
        type: { en: 'Power supply', cs: 'Zdroj' },
        desc: {
          en: '650 W 80+ Gold, semi-modular.',
          cs: '650 W 80+ Gold, polo-modulární.',
        },
      },
      {
        slug: 'fluctus120',
        url: 'https://www.alza.cz/endorfy-stratus-140-pwm-d7805978.htm',
        combo: {
          slug: 'focus2',
          name: 'Fractal Design Focus 2 White',
          url: 'https://www.alza.cz/fractal-design-focus-2-white-tg-clear-tint-d7362332.htm',
        },
        name: 'Fluctus 140 3x + Focus 2 White',
        type: { en: 'Case fan & case', cs: 'Ventilátor & skříň' },
        desc: {
          en: 'Three Endorfy Fluctus 140 fans for airflow, and the Fractal Design Focus 2 case they’re mounted in.',
          cs: 'Skříň ve které to všechno je a ventilátory uvnitř ní.',
        },
      },
      {
        slug: 'sn570',
        url: 'https://www.alza.cz/wd-blue-sn570-2tb-d7006640.htm',
        col: 4,
        span: 6,
        combo: {
          slug: 'toshiba1tb',
          name: 'Toshiba MQ01ABD100 1 TB',
          url: 'https://pevne-disky.heureka.cz/toshiba-1tb-2_5-sataii-5400rpm-8mb-mq01abd100/#prehled/',
        },
        name: 'WD SN570 2 TB + Toshiba 1 TB',
        type: { en: 'Storage', cs: 'Úložiště' },
        desc: {
          en: 'Fast WD Blue SN570 2 TB NVMe + 1 TB Toshiba HDD for extra storage.',
          cs: 'Rychlý WD Blue SN570 2 TB NVMe + 1 TB Toshiba HDD pro uložistě navíc',
        },
      },
    ],
    desk: [
      // === displays row: AOC combo (1-6) | CRG50 combo (7-12) ===
      {
        slug: 'aoc24',
        col: 1,
        span: 6,
        parts: [
          {
            slug: 'lightbar',
            name: 'AlzaPower LML-120 Light Bar',
            url: 'https://www.alza.cz/alzapower-lml-120-monitor-light-bar-5w-51cm-cerne-d12406731.htm',
          },
          {
            slug: 'aoc24',
            name: 'AOC Q24G2A 24"',
            url: 'https://www.alza.cz/24-aoc-q24g2a-bk-d7870150.htm',
          },
          {
            slug: 'ergoarm',
            name: 'AlzaErgo Arm AR1.1',
            url: 'https://www.alza.cz/alzaergo-arm-ar1-1-cerny-d6306708.htm',
          },
        ],
        name: 'AOC Q24G2A · Arm · Light Bar',
        type: { en: 'Main monitor setup', cs: 'Hlavní monitor' },
        desc: {
          en: 'Main QHD gaming monitor on an AlzaErgo Arm AR1.1, lit by an AlzaPower LML-120 light bar.',
          cs: 'Hlavní QHD herní monitor na rameni AlzaErgo Arm AR1.1, osvětlený světlem AlzaPower LML-120.',
        },
      },
      {
        slug: 'crg50',
        url: 'https://www.alza.cz/24-samsung-c24rg50-d5597534.htm',
        col: 7,
        span: 6,
        combo: {
          slug: 'riser',
          name: 'AlzaErgo Riser ER160WB',
          url: 'https://www.alza.cz/alzaergo-riser-er160wb-cerny-d5608243.htm?evt=ac&pos=1&sqid=Algolia_d6bfb482bf8cb5ca8a950920bdd6ab99',
        },
        name: 'Samsung CRG50 + Riser',
        type: { en: 'Monitor & riser', cs: 'Monitor & podstavec' },
        desc: {
          en: 'Curved FHD secondary monitor sitting on an AlzaErgo Riser ER160WB.',
          cs: 'Zakřivený FHD sekundární monitor na podstavci AlzaErgo Riser ER160WB.',
        },
      },
      // === keyboard row: dell (1-3) | keyboard combo (4-9) | mouse (10-12) ===
      {
        slug: 'dell27',
        url: 'https://www.alza.cz/24-dell-p2414h-professional-d476517.htm',
        col: 1,
        span: 3,
        name: '27" Dell p2414h',
        type: { en: 'Monitor', cs: 'Monitor' },
        desc: {
          en: 'Third monitor because there are never enough.',
          cs: 'Třetí monitor protože jich nikdy není dost.',
        },
      },
      {
        slug: 'akko5075b',
        url: 'https://www.alza.cz/akko-5075b-plus-dracula-castle-d12738073.htm',
        col: 4,
        span: 6,
        combo: {
          slug: 'geekboykeycaps',
          name: 'Geekboy Keycaps',
          url: 'https://www.alza.cz/dark-project-x-geekboy-keycaps-d12755903.htm?kampan=adwacc_prislusenstvi-pro-ittv_pla_all_obecna-css_klavesnice_c_9247814__DPnklav01&gad_source=1&gad_campaignid=10821168645&gclid=CjwKCAjwxITRBhBYEiwA6mZm7bK7rDUENm_rIkLUKp-k4MQ6BInXKHNVk3RSB13WJujKXCezgrx1JBoCc7MQAvD_BwE',
        },
        name: 'Akko 5075B + Geekboy Keycaps',
        type: { en: 'Keyboard', cs: 'Klávesnice' },
        desc: {
          en: 'Akko 5075B Plus Dracula Castle (V3 Pro Cream Yellow) wearing a custom Geekboy keycap set.',
          cs: 'Akko 5075B Plus Dracula Castle (V3 Pro Cream Yellow) s vlastní sadou Geekboy keycapů.',
        },
      },
      {
        slug: 'g305',
        url: 'https://www.alza.cz/logitech-g305-recoil-cerna-d5285988.htm?evt=ac&pos=1&sqid=Algolia_1a20de36012a3669be06e3fb34334ec8',
        col: 10,
        span: 3,
        name: 'Logitech G305',
        type: { en: 'Mouse', cs: 'Myš' },
        desc: {
          en: 'Lightweight wireless gaming mouse.',
          cs: 'Lehká bezdrátová herní myš.',
        },
      },
      // === PYRAMID top (4 wide): numpad | wheel | headphones | mic ===
      {
        slug: 'numcalc',
        url: 'https://www.alza.cz/connect-it-numcalc-ckb-0060-bk-cerna-d5506514.htm?kampan=adwacc_prislusenstvi-pro-ittv_pla_all_obecna-css_klavesnice_c_9247814__JD765x1a&gad_source=1&gad_campaignid=10821168645&gclid=CjwKCAjwxITRBhBYEiwA6mZm7R7P-NyhxBTGUIxL2Ds5b_eQAYwk3Tu9Y59JEw1RSsN8BAFqtNo74RoCHiAQAvD_BwE',
        col: 1,
        span: 3,
        name: 'CONNECT IT NumCALC',
        type: { en: 'Numpad', cs: 'Numerická klávesnice' },
        desc: {
          en: 'Lowbudget streamdeck for binds and macros.',
          cs: 'Nízkonákladový streamdeck pro zkratky a makra.',
        },
      },
      {
        slug: 'g29',
        url: 'https://www.alza.cz/gaming/logitech-g29-driving-force-d2905113.htm?evt=ac&pos=2&sqid=Algolia_03bc1320a7ec90ca368cf3bb744b975a',
        col: 4,
        span: 3,
        name: 'Logitech G29',
        type: { en: 'Racing wheel', cs: 'Závodní volant' },
        desc: {
          en: 'Force-feedback wheel + pedals',
          cs: 'Volant s force-feedbackem + pedály',
        },
      },
      {
        slug: 'dt770',
        url: 'https://www.alza.cz/beyerdynamic-dt-770-pro-80-ohm-d5485134.htm?evt=ac&pos=1&sqid=Algolia_04273475f4dc67ee27173b286c31cbcf',
        col: 7,
        span: 3,
        name: 'Beyerdynamic DT 770 Pro 80Ω',
        type: { en: 'Headphones', cs: 'Sluchátka' },
        desc: {
          en: 'Closed-back studio headphones.',
          cs: 'Uzavřené studiové sluchátka.',
        },
      },
      {
        slug: 'fifinet669',
        url: 'https://www.alza.cz/fifine-t669-d6297954.htm?evt=ac&pos=1&sqid=Algolia_5f4b0cf098f505d22ead73e0cb043539',
        col: 10,
        span: 3,
        name: 'FIFINE T669',
        type: { en: 'Microphone', cs: 'Mikrofon' },
        desc: {
          en: 'USB condenser mic with arm.',
          cs: 'USB kondenzátorový mikrofon s ramenem.',
        },
      },
      // === PYRAMID middle (3 centered): quest | switch | chair ===
      {
        slug: 'quest3',
        url: 'https://www.alza.cz/gaming/meta-quest-3-128-gb-d7962773.htm',
        col: 2,
        span: 3,
        name: 'Meta Quest 3 (128 GB)',
        type: { en: 'VR headset', cs: 'VR headset' },
        desc: {
          en: 'Mixed-reality headset for gaming.',
          cs: 'Mixed-reality headset pro hraní.',
        },
      },
      {
        slug: 'tplinkswitch',
        url: 'https://www.alza.cz/tp-link-litewave-ls105g-d5711597.htm',
        col: 5,
        span: 3,
        name: 'TP-Link LiteWave LS105G',
        type: { en: 'Network switch', cs: 'Síťový switch' },
        desc: {
          en: '5-port gigabit switch.',
          cs: '5-portový gigabitový switch.',
        },
      },
      {
        slug: 'presidentchair',
        url: 'https://www.alza.cz/idea-nabytek-kancelarske-kreslo-president-cerne-d12924855.htm?evt=ac&pos=1&sqid=Algolia_54d4d6194b7cae943cc5a851e98f1265',
        col: 8,
        span: 3,
        name: 'IDEA President',
        type: { en: 'Office chair', cs: 'Kancelářská židle' },
        desc: {
          en: 'Chair that’s older than me.',
          cs: 'Židle která je starší jak já.',
        },
      },
      // === PYRAMID bottom (centered): desk ===
      {
        slug: 'bekanttop',
        url: 'https://www.ikea.com/gb/en/p/bekant-table-top-white-60253184/',
        col: 4,
        span: 6,
        combo: {
          slug: 'bekantframe',
          name: 'IKEA BEKANT Frame',
          url: 'https://www.ikea.com.tr/en/product/bekant-black-160x80-cm-underframe-for-table-top-30252906',
        },
        name: 'IKEA BEKANT 160×80',
        type: { en: 'Desk', cs: 'Stůl' },
        desc: {
          en: 'Built desk with a BEKANT tabletop and frame.',
          cs: 'Postavený stůl s deskou a rámem BEKANT.',
        },
      },
    ],
  },
};

const ICONS = {
  discord: IMG + 'discord_logo.webp',
  roblox: IMG + 'roblox_logo.webp',
  tidal: IMG + 'tidal_logo.webp',
  steam: IMG + 'steam_logo.webp',
  instagram: IMG + 'instagram_logo.webp',
  xbox: IMG + 'xbox_logo.webp',
  youtube: IMG + 'youtube_logo.webp',
  gmail: IMG + 'gmail_logo.webp',
};

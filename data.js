/* Data layer. Images point at fotky/opt/ optimized WebP.
   `thumb` = small preview (lists/cards), `img`/`full` = larger detail view. */
const IMG = 'fotky/opt/';

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

  goalHours: 1000,
  goalTrophies: 200000,
  games: [
    {
      name: 'Minecraft',
      hours: 7800,
      tags: ['Survival', 'Economy', 'Developer'],
      thumb: IMG + 'minecraft.thumb.webp',
      img: IMG + 'minecraft.webp',
      desc: '<strong>Minecraft</strong> is the game I played the most. I was at my peak during the quarantine on <strong>Halmine</strong>.',
      gallery: [
        { thumb: IMG + 'deconomy1.thumb.webp', full: IMG + 'deconomy1.webp' },
        { thumb: IMG + 'deconomy2.thumb.webp', full: IMG + 'deconomy2.webp' },
        { thumb: IMG + 'deconomy3.thumb.webp', full: IMG + 'deconomy3.webp' },
        { thumb: IMG + 'deconomy4.thumb.webp', full: IMG + 'deconomy4.webp' },
      ],
    },
    {
      name: 'FiveM',
      hours: 850,
      tags: ['TrinityRP', 'VertexRP', 'Military'],
      thumb: IMG + 'fivem.thumb.webp',
      img: IMG + 'fivem.webp',
      desc: 'I started sweating <strong>FiveM</strong> in September 2025, and after a break in January, I made a comeback on <strong>VertexRP</strong>.',
      gallery: [
        { thumb: IMG + 'fivem1.thumb.webp', full: IMG + 'fivem1.webp' },
        { thumb: IMG + 'fivem2.thumb.webp', full: IMG + 'fivem2.webp' },
        { thumb: IMG + 'fivem3.thumb.webp', full: IMG + 'fivem3.webp' },
        { thumb: IMG + 'fivem4.thumb.webp', full: IMG + 'fivem4.webp' },
      ],
    },
    {
      name: 'Roblox',
      hours: 2500,
      tags: ['Sandbox', 'Multiplayer'],
      thumb: IMG + 'roblox_logo.webp',
      img: IMG + 'roblox_logo.webp',
      desc: '<strong>Roblox</strong> — countless hours across all kinds of games.',
      gallery: [],
    },
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

  projects: [
    {
      name: 'DinBot',
      sub: 'Discord Bot',
      color: '#5865F2',
      desc: 'A custom-programmed Discord bot for moderating my Discord server.',
      icon: IMG + 'dinbot.webp',
      iconLetter: 'D',
    },
    {
      name: 'Deconomy',
      sub: 'Minecraft Server',
      color: '#5cb85c',
      desc: 'A Survival Economy Minecraft server for my friends with tons of plugins — it took over six months to build.',
      icon: IMG + 'deconomy.webp',
      iconLetter: 'D',
    },
  ],

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
        'Premium effects (shaders, parallax, glassmorphism)',
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

  hub: {
    image: IMG + 'hub.webp',
    url: 'https://discord.gg/NkPKnqQEHQ',
    desc: "Gaming HUB is a closed community of my closest friends. Membership isn't guaranteed — it's reserved for a select few.",
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

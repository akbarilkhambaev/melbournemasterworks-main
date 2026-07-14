/**
 * Единственный источник правды по контактам и навигации.
 * Меняете телефон здесь — он меняется в шапке, подвале, формах и schema.org.
 */

export const site = {
  name: 'Melbourne Masterworks',
  tagline: 'Roofing & Restoration',
  url: 'https://www.melbournemasterworks.com.au',

  // На старом сайте в подвале стояло «+61 404 404 4996» — на цифру длиннее,
  // чем австралийский мобильный. В tel:-ссылке было верное число, его и берём.
  // TODO(клиент): подтвердить номер.
  phone: {
    display: '0404 404 996',
    international: '+61 404 404 996',
    href: 'tel:+61404404996',
  },

  email: 'info@melbournemasterworks.com.au',

  address: {
    street: '787 Park Street',
    suburb: 'Brunswick',
    state: 'VIC',
    postcode: '3056',
    country: 'AU',
    full: '787 Park Street, Brunswick, VIC 3056',
  },

  // TODO(клиент): подтвердить часы работы.
  hours: [
    { days: 'Monday – Friday', time: '7:00 am – 5:00 pm' },
    { days: 'Saturday', time: '8:00 am – 2:00 pm' },
    { days: 'Sunday', time: 'Closed' },
  ],

  stats: [
    { value: 10, suffix: '+', label: 'Years on Melbourne roofs' },
    { value: 500, suffix: '+', label: 'Roofs restored' },
    { value: 10, suffix: ' yr', label: 'Workmanship warranty' },
    { value: 100, suffix: '%', label: 'Licensed & insured' },
  ],
} as const

export const nav = [
  { label: 'Home', to: '/' },
  {
    label: 'Services',
    to: '/services',
    children: [
      { label: 'Roof restorations', to: '/services/restorations' },
      { label: 'Roof repairs', to: '/services/repairs' },
      { label: 'Gutter replacements', to: '/services/gutters' },
    ],
  },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Areas', to: '/areas' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
] as const

export interface Service {
  slug: string
  to: string
  title: string
  /** Заголовок страницы для поиска: ключевой запрос + город */
  seoTitle: string
  seoDescription: string
  /** H1 страницы услуги */
  heading: string
  short: string
  photoCategory: string
  hero: string
  intro: string
  benefits: string[]
  steps: { title: string; text: string }[]
  faqs: { q: string; a: string }[]
}

export const services: Service[] = [
  {
    slug: 'restorations',
    to: '/services/restorations',
    title: 'Roof restorations',
    seoTitle: 'Tile & Concrete Roof Restoration',
    seoDescription:
      'Tile and concrete roof restoration in Melbourne: clean, re-bed, flexible re-point, three-coat membrane. Fixed price, 10-year workmanship warranty.',
    heading: 'Roof restoration in Melbourne',
    short:
      'Your roof taken back to bare tile, rebuilt at the ridge, then sealed with a three-coat membrane in the colour you choose. The house lifts from the street — and stays watertight for a decade.',
    photoCategory: 'restoration',
    hero: 'restoration-14',
    intro:
      'A restoration gives a sound but weathered roof another twenty years, at a fraction of what a replacement costs. We strip off the moss and lichen, rebuild the ridge capping properly, replace every broken tile, and finish with a sealed, UV-stable membrane engineered for Melbourne summers and Melbourne rain.',
    benefits: [
      'High-pressure clean back to bare tile',
      'Every cracked or slipped tile replaced',
      'Ridge capping re-bedded and flexible-pointed',
      'Primer plus two coats of premium membrane',
      'Colour matched to your home',
      '10-year workmanship warranty',
    ],
    steps: [
      {
        title: 'Clean',
        text: 'Every tile pressure-washed back to bare surface — moss, lichen and decades of grime gone in a day.',
      },
      {
        title: 'Repair',
        text: 'Cracked and slipped tiles swapped out, valleys cleared, ridge capping stripped and re-bedded in fresh mortar.',
      },
      {
        title: 'Point',
        text: 'Flexible pointing over the new bedding, so the caps move with the roof instead of cracking off in the next heatwave.',
      },
      {
        title: 'Seal',
        text: 'A sealer plus two coats of membrane, sprayed and back-rolled, in the colour you picked from the chart.',
      },
    ],
    faqs: [
      {
        q: 'How long does a roof restoration take?',
        a: 'Three to five working days for most Melbourne homes, depending on the size of the roof and how much repair the tiles need. Weather can add a day — we will not coat a roof that is not bone dry, because that coating would not last.',
      },
      {
        q: 'Is restoring cheaper than replacing my roof?',
        a: 'Substantially. If the tiles and battens are structurally sound, a restoration typically costs a fraction of a full replacement and adds many years to the life of the roof. We will tell you honestly if yours is past saving.',
      },
      {
        q: 'Will a restoration fix my leak?',
        a: 'Usually. Most leaks we see start at cracked pointing, broken tiles or failed valleys — all of which a restoration rebuilds. If the problem is structural, we say so before quoting a restoration rather than after.',
      },
      {
        q: 'What colours can I choose?',
        a: 'The full membrane range: charcoal, monument, slate, heritage reds and traditional terracotta. We bring the chart on site so you can hold it against the brickwork.',
      },
    ],
  },
  {
    slug: 'repairs',
    to: '/services/repairs',
    title: 'Roof repairs',
    seoTitle: 'Roof Repairs & Leak Detection',
    seoDescription:
      'Roof leak repairs in Melbourne: leak detection, cracked tiles, ridge re-pointing, valleys and flashing. Photographed inspection, fixed price up front.',
    heading: 'Roof repairs in Melbourne',
    short:
      'Leaks traced to their real source instead of guessed at. Cracked tiles, failed pointing and rusted valleys rebuilt properly — and never a full roof you did not need.',
    photoCategory: 'repairs',
    hero: 'repairs-04',
    intro:
      'Not every roof needs a restoration. When one thing has failed, we find it, fix it, and leave. We photograph what is actually up there and show you before a single tool comes out — so you pay to solve a real problem, not somebody’s guess.',
    benefits: [
      'Leak detection and tracing',
      'Cracked and slipped tiles replaced',
      'Ridge capping re-bedded and re-pointed',
      'Rusted and blocked valleys renewed',
      'Flashing and chimney sealing',
      'Storm damage and emergency call-outs',
    ],
    steps: [
      {
        title: 'Inspect',
        text: 'We get on the roof and find the actual source. Leaks almost never start where the stain appears on your ceiling.',
      },
      {
        title: 'Report',
        text: 'You get the photographs and a fixed price before anyone picks up a tool. No obligation to go ahead.',
      },
      {
        title: 'Repair',
        text: 'The failed section is rebuilt with matching materials — not smeared over with sealant and called done.',
      },
      {
        title: 'Verify',
        text: 'We flood-test the repair where it makes sense, then send you the after photos for your records.',
      },
    ],
    faqs: [
      {
        q: 'There is a stain on my ceiling — is it definitely the roof?',
        a: 'Not always. Condensation, plumbing and overflowing gutters leave almost identical stains. That is exactly why we inspect and photograph before quoting instead of assuming.',
      },
      {
        q: 'Can you match my old tiles?',
        a: 'Nearly always. We hold stock of the common Melbourne profiles and can source discontinued ones. If a tile genuinely cannot be matched, we tell you rather than fitting something that does not fit.',
      },
      {
        q: 'Do you do emergency repairs after a storm?',
        a: 'Yes. Call us — for an active leak we will get a temporary cover on to stop the water, then schedule the permanent fix.',
      },
      {
        q: 'What does a roof repair cost?',
        a: 'It depends entirely on what has failed. A small pointing repair is a modest job; a rebuilt valley is more. Either way you get a fixed price up front — no hourly rate, no surprises on the invoice.',
      },
    ],
  },
  {
    slug: 'gutters',
    to: '/services/gutters',
    title: 'Gutter replacements',
    seoTitle: 'Gutter Replacement & Fascia Capping',
    seoDescription:
      'Colorbond gutter replacement, downpipes and fascia capping in Melbourne. Correct fall, downpipes sized to your roof, timber capped for good.',
    heading: 'Gutter replacement in Melbourne',
    short:
      'Colorbond guttering, downpipes and fascia capping sized for real Melbourne downpours — so water leaves your roof instead of finding its way into your walls.',
    photoCategory: 'gutters',
    hero: 'gutters-02',
    intro:
      'Guttering is the least glamorous part of a roof and the most expensive to ignore. Rusted-through runs, sagging brackets and undersized downpipes push water back under the tiles and into the eaves, and the damage shows up in the plaster long before you look up. We replace the lot in Colorbond, colour-matched to the roof.',
    benefits: [
      'Colorbond guttering in your choice of colour',
      'Correct fall, so water actually drains',
      'Downpipes sized to the roof catchment',
      'Fascia capped — no more painting timber',
      'Leaf guard for gum-tree properties',
      'Old guttering removed and taken away',
    ],
    steps: [
      {
        title: 'Measure',
        text: 'We calculate the roof catchment area so the gutter and downpipes are sized for a real Melbourne downpour, not a drizzle.',
      },
      {
        title: 'Strip',
        text: 'Old guttering comes off and we inspect the fascia timber underneath. That is where rot hides, and where most quotes stop looking.',
      },
      {
        title: 'Cap',
        text: 'Fascia capped in Colorbond, so the timber is sealed and you never have to paint it again.',
      },
      {
        title: 'Install',
        text: 'New gutters hung to a proper fall, downpipes connected to stormwater, and the site swept clean.',
      },
    ],
    faqs: [
      {
        q: 'Do my gutters need replacing, or just cleaning?',
        a: 'Rust holes, sagging between brackets, water spilling over the front edge in rain and staining down the wall below all point to replacement. If the metal is still sound, a clean and re-hang may be all you need — and we will say so.',
      },
      {
        q: 'Should I get leaf guard?',
        a: 'If there is a gum tree or a pine anywhere near the roof, yes. It pays for itself in cleaning visits, and in fire-prone areas it keeps embers out of the gutter.',
      },
      {
        q: 'Can you match my roof colour?',
        a: 'Yes — the full Colorbond range. We bring samples so you can hold them against the roof and the brickwork before deciding.',
      },
      {
        q: 'What if the fascia timber is rotten?',
        a: 'It has to be replaced before capping, and we will show you the photos and quote it separately. Capping over rot just hides it for a few years.',
      },
    ],
  },
]

export const getService = (slug: string) => services.find((s) => s.slug === slug)

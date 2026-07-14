/**
 * Зоны обслуживания.
 *
 * TODO(клиент): вычитать списки и убрать районы, куда вы не выезжаете —
 * это заявление о вашем бизнесе, а не факт из кода.
 *
 * Каждый пригород получает собственную страницу (/areas/brunswick и т.д.).
 * Люди гуглят не «roof restoration», а «roof restoration Brunswick», и одна
 * общая страница такой запрос не выигрывает.
 *
 * ВАЖНО про наполнение этих страниц. Пятьдесят страниц, отличающихся только
 * названием города, Google считает дорвеями и выкидывает из выдачи. Поэтому у
 * каждого региона здесь есть свой честный контекст: какие дома там стоят, какие
 * крыши на них и что с ними обычно не так. Страницы пригородов одного региона
 * похожи между собой (что правда — дома там действительно похожие), но регионы
 * друг на друга не похожи совсем.
 */
export interface AreaGroup {
  region: string
  blurb: string
  /** Что за дома и крыши в этом районе — реальная фактура, не вода */
  housing: string
  /** Типичная беда местных крыш */
  problem: string
  /** Категория фото, которая уместнее всего для этого района */
  photoCategory: string
  suburbs: string[]
}

export const areaGroups: AreaGroup[] = [
  {
    region: 'Inner North',
    blurb:
      'Our home patch. Tight streets, period homes and a lot of original terracotta that has never been re-pointed.',
    housing:
      'Victorian and Edwardian homes with original terracotta tile, plus a wave of 1970s brick veneer between them.',
    problem:
      'Ridge capping that has never been touched since the house was built. The mortar has gone to powder, and the caps move underfoot.',
    photoCategory: 'terracotta',
    suburbs: [
      'Brunswick',
      'Coburg',
      'Preston',
      'Northcote',
      'Thornbury',
      'Fitzroy',
      'Carlton',
      'Reservoir',
      'Pascoe Vale',
      'Fairfield',
    ],
  },
  {
    region: 'Eastern Suburbs',
    blurb:
      'Post-war brick homes with concrete tile roofs — the classic candidates for a full restoration rather than a replacement.',
    housing:
      'Post-war and 1960s brick homes under concrete tile. Structurally sound roofs wearing a coating that gave up a decade ago.',
    problem:
      'The tiles have gone porous and chalky. They hold moss through winter, and the colour has faded to grey no matter what it started as.',
    photoCategory: 'restoration',
    suburbs: [
      'Box Hill',
      'Doncaster',
      'Balwyn',
      'Camberwell',
      'Blackburn',
      'Ringwood',
      'Glen Waverley',
      'Mount Waverley',
      'Templestowe',
      'Nunawading',
    ],
  },
  {
    region: 'Western Suburbs',
    blurb:
      'Newer estates and older weatherboards alike. Exposed western weather is hard on ridge pointing and guttering.',
    housing:
      'Weatherboard cottages next to brand-new estate housing, with very little shelter between them and the western weather.',
    problem:
      'Wind-driven rain gets under lifted tiles, and ridge pointing cracks years earlier than it should on an exposed block.',
    photoCategory: 'restoration',
    suburbs: [
      'Footscray',
      'Sunshine',
      'Werribee',
      'Point Cook',
      'Altona',
      'Yarraville',
      'Caroline Springs',
      'Melton',
      'Tarneit',
      'Williamstown',
    ],
  },
  {
    region: 'Southern & Bayside',
    blurb: 'Salt air accelerates rust in gutters and valleys — we see a lot of premature corrosion down here.',
    housing:
      'Bayside brick and rendered homes, plenty of metal roofing, and a lot of guttering that is younger than it looks.',
    problem:
      'Salt air eats metal from the inside out. Valleys and gutters rust through years before they would anywhere else in Melbourne.',
    photoCategory: 'gutters',
    suburbs: [
      'Brighton',
      'Bentleigh',
      'Cheltenham',
      'Sandringham',
      'Mordialloc',
      'Frankston',
      'Mentone',
      'Caulfield',
      'St Kilda',
      'Elsternwick',
    ],
  },
  {
    region: 'Northern Growth Corridor',
    blurb:
      'Newer builds where the original roof coating is starting to chalk and the ridge caps are due for their first re-point.',
    housing:
      'Estate housing built in the last twenty years — big roofs, simple lines, mostly concrete tile and Colorbond.',
    problem:
      'The builder-grade coating is chalking, and the ridge caps are hitting the age where the original bedding lets go.',
    photoCategory: 'metal',
    suburbs: [
      'Craigieburn',
      'Epping',
      'Mernda',
      'South Morang',
      'Bundoora',
      'Greensborough',
      'Mill Park',
      'Wollert',
      'Roxburgh Park',
      'Sunbury',
    ],
  },
]

/** «Box Hill» → «box-hill» */
export const slugify = (suburb: string) =>
  suburb
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export interface Suburb {
  name: string
  slug: string
  group: AreaGroup
  /** Соседи по региону — для перелинковки между страницами */
  neighbours: { name: string; slug: string }[]
}

export const suburbs: Suburb[] = areaGroups.flatMap((group) =>
  group.suburbs.map((name) => ({
    name,
    slug: slugify(name),
    group,
    neighbours: group.suburbs
      .filter((other) => other !== name)
      .slice(0, 6)
      .map((other) => ({ name: other, slug: slugify(other) })),
  })),
)

export const getSuburb = (slug: string) => suburbs.find((s) => s.slug === slug)

export const allSuburbs = areaGroups.flatMap((g) => g.suburbs).sort()

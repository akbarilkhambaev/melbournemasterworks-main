import manifest from '~/data/photos.gen.json'

export interface Photo {
  slug: string
  width: number
  height: number
  widths: number[]
  category: string
  label: string
  alt: string
  lqip: string
}

const photos = manifest as unknown as Record<string, Photo>

export const getPhoto = (slug: string): Photo | undefined => photos[slug]

/** Все фото категории, в порядке имён (restoration-01, -02, …) */
export const photosByCategory = (category: string): Photo[] =>
  Object.values(photos)
    .filter((p) => p.category === category)
    .sort((a, b) => a.slug.localeCompare(b.slug))

/** Категории для фильтра галереи. Кадры «до/после» живут в своей секции. */
export const galleryCategories = [
  { key: 'restoration', label: 'Roof restoration' },
  { key: 'terracotta', label: 'Terracotta' },
  { key: 'metal', label: 'Metal & Colorbond' },
  { key: 'gutters', label: 'Gutters & fascia' },
  { key: 'repairs', label: 'Repairs' },
] as const

export const galleryPhotos = (): Photo[] =>
  galleryCategories.flatMap((c) => photosByCategory(c.key))

/**
 * Конвейер изображений: assets/photos/*.jpg → public/img/*.{avif,webp} в 4 ширинах
 * + манифест с реальными размерами и размытой заглушкой (LQIP) для каждой картинки.
 *
 * Запускается автоматически перед сборкой. Уже собранное не пересобирает.
 *
 *   npm run images          # инкрементально
 *   npm run images -- --force
 */
import { mkdir, readdir, writeFile, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { resolve, join, parse } from 'node:path'
import sharp from 'sharp'

const SRC = resolve('assets/photos')
const OUT = resolve('public/img')
const MANIFEST = resolve('app/data/photos.gen.json')

const WIDTHS = [400, 800, 1200, 1600]
const FORCE = process.argv.includes('--force')

/** Категория выводится из имени файла — оно же задано на импорте. */
const CATEGORIES = {
  restoration: {
    label: 'Roof restoration',
    alt: (n) => `Concrete tile roof restored and resprayed in charcoal, Melbourne — project ${n}`,
  },
  repairs: {
    label: 'Repairs & re-pointing',
    alt: (n) => `Weathered tile roof with cracked ridge pointing and moss, before repair — project ${n}`,
  },
  terracotta: {
    label: 'Terracotta tile',
    alt: (n) => `Restored terracotta tile roof with fresh ridge capping, Melbourne — project ${n}`,
  },
  metal: {
    label: 'Metal & Colorbond',
    alt: (n) => `Colorbond metal roof after restoration and resealing, Melbourne — project ${n}`,
  },
  gutters: {
    label: 'Gutters & fascia',
    alt: (n) => `New guttering and fascia capping installed on a Melbourne home — project ${n}`,
  },
  ba: {
    label: 'Before & after',
    alt: () => 'Roof before and after restoration by Melbourne Masterworks',
  },
}

/** Кадры «до/после» описываем поимённо — обобщённая подпись тут врёт. */
const BA_ALT = {
  'ba-terracotta-before': 'Faded, moss-stained terracotta tile roof before restoration',
  'ba-terracotta-after': 'The same roof after restoration, resprayed in charcoal',
  'ba-hip-before': 'Weathered terracotta hip roof with worn ridge capping before restoration',
  'ba-hip-after': 'The same hip roof after full restoration in charcoal',
  'ba-metal-before': 'Corrugated metal roof with surface rust before restoration',
}

const isFresh = async (out, srcMtime) => {
  if (FORCE || !existsSync(out)) return false
  return (await stat(out)).mtimeMs >= srcMtime
}

await mkdir(OUT, { recursive: true })

const files = (await readdir(SRC)).filter((f) => /\.jpe?g$/i.test(f)).sort()
const manifest = {}
let encoded = 0
let skipped = 0

for (const file of files) {
  const slug = parse(file).name
  const srcPath = join(SRC, file)
  const srcMtime = (await stat(srcPath)).mtimeMs

  const image = sharp(srcPath).rotate() // rotate() применяет EXIF-ориентацию и срезает метаданные
  const { width, height } = await image.metadata()

  const widths = WIDTHS.filter((w) => w <= width)
  if (!widths.includes(width) && widths.length < WIDTHS.length) widths.push(width)

  for (const w of widths) {
    // Черепица — высокочастотная текстура, она плохо жмётся. Субдискретизация
    // цветности 4:2:0 режет вес вдвое, а на фото глазом не видна.
    for (const [format, options] of [
      ['avif', { quality: 44, effort: 6, chromaSubsampling: '4:2:0' }],
      ['webp', { quality: 72, smartSubsample: true }],
    ]) {
      const out = join(OUT, `${slug}-${w}.${format}`)
      if (await isFresh(out, srcMtime)) {
        skipped++
        continue
      }
      await sharp(srcPath).rotate().resize({ width: w }).toFormat(format, options).toFile(out)
      encoded++
    }
  }

  // Размытая заглушка прямо в HTML: картинка не «прыгает» и не мигает белым
  const lqipBuffer = await sharp(srcPath).rotate().resize({ width: 20 }).webp({ quality: 30 }).toBuffer()

  const [category] = slug.split('-')
  const index = Number(slug.match(/(\d+)$/)?.[1] ?? 0)

  manifest[slug] = {
    slug,
    width,
    height,
    widths,
    category,
    label: CATEGORIES[category]?.label ?? '',
    alt: BA_ALT[slug] ?? CATEGORIES[category]?.alt(index) ?? '',
    lqip: `data:image/webp;base64,${lqipBuffer.toString('base64')}`,
  }
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')

const counts = Object.values(manifest).reduce((acc, p) => {
  acc[p.category] = (acc[p.category] ?? 0) + 1
  return acc
}, {})

console.log(`Изображений: ${files.length} | закодировано: ${encoded}, из кэша: ${skipped}`)
console.log('По категориям:', counts)

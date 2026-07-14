/**
 * Скачивает нужные начертания шрифтов и кладёт их рядом с сайтом.
 *
 * Зачем вручную, а не модулем. @nuxt/fonts помимо современных woff2-сабсетов
 * добавляет legacy-объявления в формате woff — без unicode-range и со всеми
 * алфавитами сразу, по 140 КБ каждое. Браузер выбирает именно их (они идут
 * последними и покрывают все символы), и сабсеты по 10–24 КБ не используются.
 * Итог: 490 КБ шрифтов на англоязычном сайте.
 *
 * Здесь мы забираем только woff2, только латиницу и только те начертания,
 * которые реально применяются в вёрстке.
 *
 *   node scripts/fetch-fonts.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const OUT_DIR = resolve('public/fonts')
const CSS_OUT = resolve('app/assets/css/fonts.css')

/**
 * Вариативные шрифты: один файл на весь диапазон начертаний вместо отдельного
 * файла на каждое. Inter 400/500/600 тремя файлами весил 141 КБ; одним
 * вариативным — вдвое меньше, и промежуточные веса тоже становятся доступны.
 */
const FAMILIES = [
  { name: 'Manrope', range: '700..800', weights: '700 800' },
  { name: 'Inter', range: '400..600', weights: '400 600' },
]

// Современный User-Agent — иначе Google отдаёт legacy-формат вместо woff2
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'

await mkdir(OUT_DIR, { recursive: true })

const blocks = []

for (const { name, range, weights } of FAMILIES) {
  const query = `family=${name}:wght@${range}&display=swap&subset=latin`
  const res = await fetch(`https://fonts.googleapis.com/css2?${query}`, {
    headers: { 'User-Agent': UA },
  })

  if (!res.ok) throw new Error(`Google Fonts вернул ${res.status} для ${name}`)
  const css = await res.text()

  const faces = css.match(/@font-face\s*\{[^}]*\}/g) ?? []

  for (const face of faces) {
    // Берём только латиницу: остальные диапазоны на этом сайте не нужны
    const range = face.match(/unicode-range:\s*([^;]+);/)?.[1]?.trim()
    if (!range || !range.includes('U+0000-00FF')) continue

    const url = face.match(/url\(([^)]+)\)\s*format\('woff2'\)/)?.[1]
    if (!url) continue

    const weight = weights
    const file = `${name.toLowerCase()}-var.woff2`
    const font = await fetch(url, { headers: { 'User-Agent': UA } })
    const bytes = Buffer.from(await font.arrayBuffer())
    await writeFile(resolve(OUT_DIR, file), bytes)

    blocks.push({ name, weight, file, range, size: bytes.length })
  }
}

const css = [
  '/* Файл собирается скриптом scripts/fetch-fonts.mjs — руками не править. */',
  '/* Только woff2, только латиница, только используемые начертания. */',
  '',
  ...blocks.map(({ name, weight, file, range }) =>
    [
      '@font-face {',
      `  font-family: '${name}';`,
      '  font-style: normal;',
      `  font-weight: ${weight};`,
      // swap: текст виден системным шрифтом сразу, а не через полсекунды пустоты
      '  font-display: swap;',
      `  src: url('/fonts/${file}') format('woff2');`,
      `  unicode-range: ${range};`,
      '}',
    ].join('\n'),
  ),
  '',
].join('\n')

await writeFile(CSS_OUT, css)

const total = blocks.reduce((sum, b) => sum + b.size, 0)
console.log(`Начертаний: ${blocks.length}, всего ${(total / 1024).toFixed(0)} КБ`)
blocks.forEach((b) => console.log(`  ${b.file.padEnd(20)} ${(b.size / 1024).toFixed(0)} КБ`))

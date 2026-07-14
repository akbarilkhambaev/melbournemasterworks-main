/**
 * Разовый импорт: берёт оригиналы из папки-источника, даёт им осмысленные имена,
 * режет коллажи «до/после» на отдельные кадры и складывает всё в assets/photos/.
 * Дальше с assets/photos/ работает process-images.mjs — оригиналы больше не нужны.
 *
 *   node scripts/ingest-photos.mjs ~/Downloads/Rasimla
 */
import { mkdir, copyFile, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { resolve, join } from 'node:path'
import sharp from 'sharp'

const SRC = resolve(process.argv[2] ?? `${process.env.HOME}/Downloads/Rasimla`)
const OUT = resolve('assets/photos')

/** Оригинал → новое имя. Категории разобраны глазами по всем 52 кадрам. */
const RENAME = {
  // Восстановленная черепица charcoal — основная витрина работ
  'photo_2025-12-27_19-25-56.jpg': 'restoration-01.jpg',
  'photo_2026-04-03_18-59-08.jpg': 'restoration-02.jpg',
  'photo_2026-04-03_18-59-09 (2).jpg': 'restoration-03.jpg',
  'photo_2026-04-03_18-59-09.jpg': 'restoration-04.jpg',
  'photo_2026-04-03_18-59-17.jpg': 'restoration-05.jpg',
  'photo_2026-04-03_18-59-27.jpg': 'restoration-06.jpg',
  'photo_2026-04-03_18-59-29.jpg': 'restoration-07.jpg',
  'photo_2026-04-03_18-59-32.jpg': 'restoration-08.jpg',
  'photo_2026-04-03_18-59-39.jpg': 'restoration-09.jpg',
  'photo_2026-04-03_18-59-42.jpg': 'restoration-10.jpg',
  'photo_2026-04-03_18-59-43.jpg': 'restoration-11.jpg',
  'photo_2026-04-03_18-59-44.jpg': 'restoration-12.jpg',
  'photo_2026-04-03_18-59-45.jpg': 'restoration-13.jpg',
  'photo_2026-05-02_15-37-03.jpg': 'restoration-14.jpg',
  'photo_2026-05-02_15-37-15.jpg': 'restoration-15.jpg',
  'photo_2026-05-02_15-37-19.jpg': 'restoration-16.jpg',
  'photo_2026-05-02_15-37-27.jpg': 'restoration-17.jpg',
  'photo_2026-05-02_15-37-30.jpg': 'restoration-18.jpg',
  'photo_2026-05-02_15-37-36.jpg': 'restoration-19.jpg',

  // Изношенные крыши: треснувший раствор конька, мох, грязь — это страница ремонта
  'photo_2026-04-22_18-57-00.jpg': 'repairs-01.jpg',
  'photo_2026-04-22_18-57-03.jpg': 'repairs-02.jpg',
  'photo_2026-04-22_18-57-05.jpg': 'repairs-03.jpg',
  'photo_2026-04-22_18-57-10.jpg': 'repairs-04.jpg',
  'photo_2026-04-22_18-57-12.jpg': 'repairs-05.jpg',
  'photo_2026-04-22_18-57-15.jpg': 'repairs-06.jpg',
  'photo_2026-04-22_18-57-19.jpg': 'repairs-07.jpg',
  'photo_2026-04-22_18-57-22.jpg': 'repairs-08.jpg',
  'photo_2026-04-22_18-57-25.jpg': 'repairs-09.jpg',
  'photo_2026-04-22_18-57-29.jpg': 'repairs-10.jpg',

  // Терракота
  'photo_2026-04-23_20-33-04.jpg': 'terracotta-01.jpg',
  'photo_2026-04-23_20-33-05.jpg': 'terracotta-02.jpg',
  'photo_2026-04-23_20-33-06.jpg': 'terracotta-03.jpg',
  'photo_2026-04-23_20-33-07.jpg': 'terracotta-04.jpg',

  // Металл / Colorbond
  'photo_2026-04-23_20-55-51.jpg': 'metal-01.jpg',
  'photo_2026-04-24_17-48-59.jpg': 'metal-02.jpg',
  'photo_2026-04-24_17-49-00.jpg': 'metal-03.jpg',
  'photo_2026-04-30_19-38-12.jpg': 'metal-04.jpg',
  'photo_2026-04-30_19-38-15.jpg': 'metal-05.jpg',
  'photo_2026-04-30_19-38-17.jpg': 'metal-06.jpg',
  'photo_2026-04-30_19-38-21.jpg': 'metal-07.jpg',
  'photo_2026-04-30_19-38-24.jpg': 'metal-08.jpg',
  'photo_2026-04-30_19-38-26.jpg': 'metal-09.jpg',
  'photo_2026-04-30_19-38-31.jpg': 'metal-10.jpg',

  // Желоба, фасции, водостоки
  'photo_2026-02-16_21-37-25.jpg': 'gutters-01.jpg',
  'photo_2026-04-23_21-08-06.jpg': 'gutters-02.jpg',
  'photo_2026-04-23_21-08-10.jpg': 'gutters-03.jpg',
  'photo_2026-04-23_21-08-15.jpg': 'gutters-04.jpg',
  'photo_2026-04-23_21-08-19.jpg': 'gutters-05.jpg',
  'photo_2026-04-23_21-08-25.jpg': 'gutters-06.jpg',

  // «До» для сравнения с metal-02/03 — та же крыша, ржавая, до покраски
  'photo_2026-04-24_17-48-57.jpg': 'ba-metal-before.jpg',
}

/**
 * Коллажи, которые клиент сам собрал как «до/после».
 * Режем на два honest-кадра: одна и та же крыша, один и тот же ракурс.
 */
const COLLAGES = [
  {
    file: 'photo_2026-04-23_21-18-36.jpg', // 554×554, две панели друг над другом
    crops: [
      { name: 'ba-terracotta-before.jpg', left: 4, top: 4, width: 546, height: 266 },
      { name: 'ba-terracotta-after.jpg', left: 4, top: 284, width: 546, height: 266 },
    ],
  },
  {
    file: 'photo_2026-04-23_21-19-32.jpg', // 1024×384, две панели рядом
    crops: [
      { name: 'ba-hip-before.jpg', left: 2, top: 2, width: 504, height: 380 },
      { name: 'ba-hip-after.jpg', left: 518, top: 2, width: 504, height: 380 },
    ],
  },
]

if (!existsSync(SRC)) {
  console.error(`Папка с оригиналами не найдена: ${SRC}`)
  process.exit(1)
}

await mkdir(OUT, { recursive: true })

let copied = 0
for (const [from, to] of Object.entries(RENAME)) {
  await copyFile(join(SRC, from), join(OUT, to))
  copied++
}

let cut = 0
for (const { file, crops } of COLLAGES) {
  for (const { name, ...region } of crops) {
    await sharp(join(SRC, file)).extract(region).toFile(join(OUT, name))
    cut++
  }
}

const total = (await readdir(OUT)).filter((f) => f.endsWith('.jpg')).length
console.log(`Скопировано: ${copied}, нарезано из коллажей: ${cut}, всего в assets/photos: ${total}`)

const known = new Set(Object.keys(RENAME))
const skipped = (await readdir(SRC)).filter((f) => f.endsWith('.jpg') && !known.has(f))
const collageFiles = new Set(COLLAGES.map((c) => c.file))
const orphans = skipped.filter((f) => !collageFiles.has(f))
if (orphans.length) console.warn(`Не разобраны (проверь вручную): ${orphans.join(', ')}`)

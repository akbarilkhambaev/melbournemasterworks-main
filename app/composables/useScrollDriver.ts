/**
 * Один-единственный слушатель прокрутки на весь сайт.
 *
 * Было: шапка, кнопка звонка, таймлайн и каждый параллакс-элемент вешали свой
 * слушатель и в каждом кадре дёргали getBoundingClientRect. Браузер вынужден
 * пересчитывать layout по нескольку раз за кадр (forced reflow) — на слабом
 * телефоне это и есть заикание.
 *
 * Стало: одна подписка, один rAF, геометрия элементов считается один раз
 * (и заново только при ресайзе). В кадре остаётся чистая арифметика.
 */
type Subscriber = (scrollY: number, viewportH: number) => void

const subscribers = new Set<Subscriber>()
const layoutHandlers = new Set<() => void>()

let started = false
let ticking = false
let scrollY = 0
let viewportH = 0

const flush = () => {
  subscribers.forEach((fn) => fn(scrollY, viewportH))
  ticking = false
}

const onScroll = () => {
  scrollY = window.scrollY
  if (ticking) return
  ticking = true
  requestAnimationFrame(flush)
}

const onResize = () => {
  viewportH = window.innerHeight
  // Геометрия могла поехать — просим всех пересчитать кэш
  layoutHandlers.forEach((fn) => fn())
  onScroll()
}

const start = () => {
  if (started) return
  started = true
  scrollY = window.scrollY
  viewportH = window.innerHeight
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize, { passive: true })

  // Шрифты и ленивые картинки догружаются и сдвигают страницу — после этого
  // кэш геометрии протухает, поэтому пересчитываем ещё раз
  window.addEventListener('load', onResize, { once: true })
  document.fonts?.ready.then(onResize)
}

/** Подписаться на прокрутку. Колбэк вызывается не чаще одного раза за кадр. */
export const onScrollFrame = (fn: Subscriber) => {
  onMounted(() => {
    start()
    subscribers.add(fn)
    fn(window.scrollY, window.innerHeight)
  })
  onBeforeUnmount(() => subscribers.delete(fn))
}

/** Пересчитать кэш геометрии: при ресайзе и после загрузки шрифтов/картинок. */
export const onLayoutChange = (fn: () => void) => {
  onMounted(() => {
    start()
    layoutHandlers.add(fn)
    fn()
  })
  onBeforeUnmount(() => layoutHandlers.delete(fn))
}

export const prefersReducedMotion = () =>
  import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches

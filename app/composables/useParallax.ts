/**
 * Параллакс без единого замера layout в кадре.
 *
 * Позиция элемента на странице (offsetTop, height) считается один раз и
 * кэшируется. В кадре остаётся арифметика от scrollY — ни одного
 * getBoundingClientRect, значит ни одного forced reflow.
 */
export const useParallax = (el: Ref<HTMLElement | null>, speed = 0.15) => {
  let top = 0
  let height = 0
  let enabled = false

  const measure = () => {
    const node = el.value
    if (!node) return

    // На узких экранах параллакс режем вдвое: на маленькой высоте сильный
    // сдвиг читается как «картинка дёргается», а не как глубина.
    enabled = !prefersReducedMotion()

    let offset = 0
    let current: HTMLElement | null = node
    while (current) {
      offset += current.offsetTop
      current = current.offsetParent as HTMLElement | null
    }
    top = offset
    height = node.offsetHeight
  }

  const apply = (scrollY: number, viewportH: number) => {
    const node = el.value
    if (!node || !enabled || !height) return

    const centre = top + height / 2 - (scrollY + viewportH / 2)
    const range = viewportH / 2 + height / 2
    const progress = Math.max(-1, Math.min(1, centre / range))

    const factor = viewportH < 700 ? 0.5 : 1
    node.style.setProperty('--parallax-y', `${progress * speed * factor * -100}px`)
  }

  onLayoutChange(measure)
  onScrollFrame(apply)
}

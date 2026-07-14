/**
 * Аналитика и цели.
 *
 * Смысл не в том, чтобы «поставить счётчик», а в том, чтобы вы могли ответить
 * на один вопрос: окупается ли сайт. Поэтому считаем не просмотры, а действия,
 * которые приносят деньги, — звонок и отправленную заявку.
 *
 * Если NUXT_PUBLIC_GA_ID не задан, скрипт не грузится вовсе: на локальной
 * машине и в тестах никакой лишней сети и никакого мусора в вашей статистике.
 */
type EventParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export const trackEvent = (name: string, params: EventParams = {}) => {
  if (!import.meta.client) return
  window.gtag?.('event', name, params)
}

/** Цели, ради которых сайт вообще существует */
export const analytics = {
  /** Клик по номеру телефона — самый ценный тип обращения */
  phoneClick: (source: string) => trackEvent('phone_click', { source, value: 1 }),

  /** Форма ушла на сервер и вернулась успехом */
  leadSubmitted: (source: string, service?: string) =>
    trackEvent('generate_lead', { source, service: service || 'not specified', value: 1 }),

  /** Форму начали заполнять, но ещё не отправили — видно, где люди отваливаются */
  leadStarted: (source: string) => trackEvent('lead_started', { source }),

  /** Ошибка отправки: если таких много, вы теряете заявки и об этом узнаете */
  leadFailed: (source: string, reason: string) => trackEvent('lead_failed', { source, reason }),

  /** Человек дотянул слайдер «до/после» — сильный сигнал интереса */
  beforeAfterUsed: (project: string) => trackEvent('before_after_used', { project }),

  /** Открыл фото в галерее */
  galleryOpened: (category: string) => trackEvent('gallery_opened', { category }),
}

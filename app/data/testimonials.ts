/**
 * ОТЗЫВЫ ПОКА ПУСТЫЕ — И ЭТО НАМЕРЕННО.
 *
 * Выдуманные отзывы с выдуманными именами — это обман ваших же клиентов,
 * поэтому я их не написал. Секция отзывов на сайте просто не рендерится,
 * пока этот массив пуст: дырки в вёрстке не будет.
 *
 * Чтобы включить — добавьте настоящие отзывы (можно скопировать из вашего
 * профиля Google Reviews), например:
 *
 *   { name: 'Sarah M.', suburb: 'Brunswick', rating: 5, date: '2026-03',
 *     text: 'Тут настоящий текст отзыва.', service: 'Roof restoration' }
 */
export interface Testimonial {
  name: string
  suburb: string
  rating: 1 | 2 | 3 | 4 | 5
  /** YYYY-MM */
  date: string
  text: string
  service?: string
}

export const testimonials: Testimonial[] = []

/** Ссылка на профиль с отзывами. TODO(клиент): вставить URL Google Business. */
export const reviewsUrl = ''

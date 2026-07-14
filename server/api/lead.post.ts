import nodemailer from 'nodemailer'

/**
 * Приём заявок напрямую через SMTP (Zoho).
 *
 * Работает, только когда сайт крутится на Node-хостинге. При статическом
 * экспорте серверной части нет вовсе, и этот файл в сборку не попадает —
 * тогда заявки идут через внешний сервис (NUXT_PUBLIC_FORM_MODE=web3forms).
 *
 * Подводные камни Zoho, на которых обычно спотыкаются:
 *  · Пароль от почты не подойдёт, если включена двухфакторная аутентификация.
 *    Нужен отдельный app password (Zoho Mail → Security → App Passwords).
 *  · Поле From обязано совпадать с логином SMTP. Подставить туда адрес клиента
 *    нельзя — Zoho отклонит письмо. Адрес клиента кладём в Reply-To, чтобы вы
 *    могли ответить одной кнопкой.
 *  · Датацентр у Zoho свой в каждом регионе: австралийский аккаунт живёт на
 *    smtp.zoho.com.au, и на smtp.zoho.com он не авторизуется.
 */
interface Lead {
  name?: string
  phone?: string
  email?: string
  service?: string
  message?: string
  source?: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<Lead>(event)
  const config = useRuntimeConfig()

  const name = body.name?.trim() ?? ''
  const phone = body.phone?.trim() ?? ''
  const digits = phone.replace(/\D/g, '')

  // Валидация на сервере обязательна: клиентскую боты просто обходят
  if (name.length < 2 || digits.length < 8 || digits.length > 12) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid name or phone number' })
  }

  if (!config.smtpHost || !config.smtpUser || !config.smtpPass) {
    throw createError({ statusCode: 500, statusMessage: 'Mail transport is not configured' })
  }

  const port = Number(config.smtpPort) || 465
  const secure = config.smtpSecure
    ? String(config.smtpSecure).toLowerCase() === 'true'
    : port === 465

  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port,
    // 465 — SSL с самого начала, 587 — STARTTLS уже внутри соединения
    secure,
    auth: { user: config.smtpUser, pass: config.smtpPass },
  })

  await transporter.sendMail({
    // From обязан быть равен логину, иначе Zoho отвергнет письмо
    from: `"Melbourne Masterworks website" <${config.smtpUser}>`,
    to: config.leadRecipient || config.smtpUser,
    // Отвечаете клиенту прямо из почты, не копируя адрес руками
    replyTo: body.email || undefined,
    subject: `New enquiry — ${name} (${body.source ?? 'Website'})`,
    text: [
      `Name:    ${name}`,
      `Phone:   ${phone}`,
      `Email:   ${body.email || '—'}`,
      `Service: ${body.service || 'Not specified'}`,
      `Page:    ${body.source ?? 'Website'}`,
      '',
      body.message || '(no message)',
    ].join('\n'),
  })

  return { ok: true }
})

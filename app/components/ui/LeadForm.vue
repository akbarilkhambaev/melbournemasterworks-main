<script setup lang="ts">
/**
 * Форма заявки. На старом сайте она молча теряла каждый лид: слала POST на
 * /api/sendMail.php, которого не существовало ни в проекте, ни на хостинге.
 *
 * Здесь: валидация до отправки, honeypot против ботов, честные состояния
 * (отправляю / отправлено / ошибка) и один настраиваемый эндпоинт —
 * внешний сервис для статики или свой серверный роут для Node-хостинга.
 */
import { services } from '~/data/services'
import { site } from '~/data/site'

const props = withDefaults(
  defineProps<{
    /** Попадает в письмо: видно, с какой страницы пришла заявка */
    source?: string
    compact?: boolean
  }>(),
  { source: 'Website', compact: false },
)

const config = useRuntimeConfig()

/**
 * Форма просила пять полей сразу — это главный тормоз заявок. Обязательных
 * оставили два (имя и телефон), остальное человек раскрывает сам, если хочет.
 * Позвонить нам достаточно имени и номера.
 */
const expanded = ref(false)

const form = reactive({
  name: '',
  phone: '',
  email: '',
  service: '',
  message: '',
  /** Honeypot: человек это поле не видит и не заполнит, бот — заполнит */
  company: '',
})

const errors = reactive<Record<string, string>>({})
const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')
const errorMessage = ref('')

// Видно, сколько людей начали заполнять форму и не дошли до конца
const started = ref(false)
const onFirstInput = () => {
  if (started.value) return
  started.value = true
  analytics.leadStarted(props.source)
}

const validate = () => {
  Object.keys(errors).forEach((key) => delete errors[key])

  if (form.name.trim().length < 2) errors.name = 'Please tell us your name'

  // Австралийский номер: 8–12 цифр, плюс, пробелы и скобки допускаем
  const digits = form.phone.replace(/\D/g, '')
  if (digits.length < 8 || digits.length > 12) errors.phone = 'Enter a valid phone number'

  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email))
    errors.email = 'That email address does not look right'

  return Object.keys(errors).length === 0
}

const submit = async () => {
  if (status.value === 'sending') return
  if (!validate()) return

  // Бот заполнил скрытое поле — делаем вид, что всё прошло, и молча выходим
  if (form.company) {
    status.value = 'sent'
    return
  }

  status.value = 'sending'
  errorMessage.value = ''

  const payload = {
    name: form.name.trim(),
    phone: form.phone.trim(),
    email: form.email.trim(),
    service: form.service,
    message: form.message.trim(),
    source: props.source,
  }

  try {
    if (config.public.formMode === 'server') {
      await $fetch('/api/lead', { method: 'POST', body: payload })
    } else {
      if (!config.public.web3formsKey) {
        throw new Error(
          'Form is not configured yet — set NUXT_PUBLIC_WEB3FORMS_KEY (see .env.example)',
        )
      }
      await $fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: {
          access_key: config.public.web3formsKey,
          subject: `New enquiry from ${payload.source} — ${payload.name}`,
          from_name: 'Melbourne Masterworks website',
          ...payload,
        },
      })
    }

    status.value = 'sent'
    analytics.leadSubmitted(props.source, form.service)
    Object.assign(form, { name: '', phone: '', email: '', service: '', message: '', company: '' })
  } catch (error) {
    status.value = 'error'
    analytics.leadFailed(props.source, error instanceof Error ? error.message.slice(0, 80) : 'unknown')
    errorMessage.value =
      error instanceof Error && error.message.includes('not configured')
        ? error.message
        : `Something went wrong. Please call us on ${site.phone.display} instead.`
  }
}

const fieldClass =
  'w-full rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-ink-faint focus:border-brand-500 focus:ring-4 focus:ring-brand-500/12'
</script>

<template>
  <form novalidate class="relative" @submit.prevent="submit" @input.once="onFirstInput">
    <!-- Успех перекрывает форму, а не прячется где-то внизу мелким шрифтом -->
    <Transition
      enter-active-class="transition duration-500 ease-out-soft"
      enter-from-class="opacity-0 scale-95"
      leave-active-class="transition duration-300"
      leave-to-class="opacity-0"
    >
      <div
        v-if="status === 'sent'"
        class="absolute inset-0 z-10 grid place-items-center rounded-card bg-white/95 p-8 text-center backdrop-blur-sm"
      >
        <div>
          <div class="mx-auto grid size-16 place-items-center rounded-full bg-success/12 text-success">
            <Icon name="check" class="size-8" />
          </div>
          <h3 class="mt-5 text-h3">Thanks — we've got it</h3>
          <p class="mt-2 text-ink-soft">
            We'll call you back shortly. If it's urgent, ring us on
            <a :href="site.phone.href" class="font-semibold text-brand-700 underline">
              {{ site.phone.display }}</a
            >.
          </p>
          <button
            type="button"
            class="mt-6 text-sm font-semibold text-brand-600 underline underline-offset-4"
            @click="status = 'idle'"
          >
            Send another enquiry
          </button>
        </div>
      </div>
    </Transition>

    <div :class="['grid gap-4', compact ? '' : 'sm:grid-cols-2']">
      <div :class="compact ? '' : 'sm:col-span-1'">
        <label for="lead-name" class="mb-1.5 block text-sm font-semibold text-brand-900">
          Name <span class="text-danger">*</span>
        </label>
        <input
          id="lead-name"
          v-model="form.name"
          type="text"
          autocomplete="name"
          placeholder="Jane Smith"
          :class="[fieldClass, errors.name && 'border-danger focus:border-danger focus:ring-danger/12']"
          :aria-invalid="Boolean(errors.name)"
          :aria-describedby="errors.name ? 'lead-name-error' : undefined"
        />
        <p v-if="errors.name" id="lead-name-error" class="mt-1.5 text-sm text-danger">
          {{ errors.name }}
        </p>
      </div>

      <div :class="compact ? '' : 'sm:col-span-1'">
        <label for="lead-phone" class="mb-1.5 block text-sm font-semibold text-brand-900">
          Phone <span class="text-danger">*</span>
        </label>
        <input
          id="lead-phone"
          v-model="form.phone"
          type="tel"
          inputmode="tel"
          autocomplete="tel"
          placeholder="0400 000 000"
          :class="[fieldClass, errors.phone && 'border-danger focus:border-danger focus:ring-danger/12']"
          :aria-invalid="Boolean(errors.phone)"
          :aria-describedby="errors.phone ? 'lead-phone-error' : undefined"
        />
        <p v-if="errors.phone" id="lead-phone-error" class="mt-1.5 text-sm text-danger">
          {{ errors.phone }}
        </p>
      </div>

      <div :class="compact ? '' : 'sm:col-span-2'">
        <label for="lead-service" class="mb-1.5 block text-sm font-semibold text-brand-900">
          What do you need?
        </label>
        <select id="lead-service" v-model="form.service" :class="fieldClass">
          <option value="">Not sure yet — please advise</option>
          <option v-for="service in services" :key="service.slug" :value="service.title">
            {{ service.title }}
          </option>
        </select>
      </div>

      <!-- Необязательное прячем: два поля заполняют, пять — бросают -->
      <template v-if="expanded">
        <div :class="compact ? '' : 'sm:col-span-2'">
          <label for="lead-email" class="mb-1.5 block text-sm font-semibold text-brand-900">
            Email <span class="font-normal text-ink-faint">(optional)</span>
          </label>
          <input
            id="lead-email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            placeholder="jane@example.com"
            :class="[fieldClass, errors.email && 'border-danger focus:border-danger focus:ring-danger/12']"
            :aria-invalid="Boolean(errors.email)"
            :aria-describedby="errors.email ? 'lead-email-error' : undefined"
          />
          <p v-if="errors.email" id="lead-email-error" class="mt-1.5 text-sm text-danger">
            {{ errors.email }}
          </p>
        </div>

        <div :class="compact ? '' : 'sm:col-span-2'">
          <label for="lead-message" class="mb-1.5 block text-sm font-semibold text-brand-900">
            Tell us about the roof <span class="font-normal text-ink-faint">(optional)</span>
          </label>
          <textarea
            id="lead-message"
            v-model="form.message"
            rows="3"
            placeholder="Single storey tile roof, a few cracked tiles and the gutters overflow when it rains…"
            :class="fieldClass"
          />
        </div>
      </template>

      <button
        v-else
        type="button"
        :class="[
          'flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700',
          compact ? '' : 'sm:col-span-2',
        ]"
        @click="expanded = true"
      >
        <Icon name="plus" class="size-4" />
        Add email or describe the roof
      </button>
    </div>

    <!-- Honeypot: скрыт от людей, но не через display:none, иначе боты его вычисляют -->
    <div class="absolute -left-[9999px] size-0 overflow-hidden" aria-hidden="true">
      <label for="lead-company">Company</label>
      <input id="lead-company" v-model="form.company" type="text" tabindex="-1" autocomplete="off" />
    </div>

    <p v-if="status === 'error'" class="mt-4 rounded-xl bg-danger/8 px-4 py-3 text-sm text-danger">
      {{ errorMessage }}
    </p>

    <button
      type="submit"
      :disabled="status === 'sending'"
      class="group mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-700 px-6 py-4 font-display font-bold text-white shadow-glow transition-all duration-300 ease-out-soft hover:-translate-y-0.5 hover:bg-brand-600 active:translate-y-0 disabled:cursor-wait disabled:opacity-70"
    >
      <span
        v-if="status === 'sending'"
        class="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
      />
      {{ status === 'sending' ? 'Sending…' : 'Book my free inspection' }}
      <Icon name="arrow-right" class="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    </button>

    <p class="mt-3 text-center text-xs text-ink-faint">
      No obligation, no pressure. We never share your details.
    </p>
  </form>
</template>

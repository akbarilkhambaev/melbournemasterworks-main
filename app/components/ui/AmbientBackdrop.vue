<script setup lang="ts">
/**
 * Фоновый слой: два мягких световых пятна и зерно.
 *
 * Всё держится на transform и opacity — композитор уносит это на GPU, поэтому
 * анимация не стоит ни одного пересчёта layout. Зерно — один встроенный SVG
 * turbulence, без картинки и без сетевого запроса.
 *
 * pointer-events: none, aria-hidden — слой чисто декоративный и не мешает
 * ни клику, ни скринридеру.
 */
withDefaults(defineProps<{ tone?: 'light' | 'dark' }>(), { tone: 'light' })
</script>

<template>
  <div class="ambient" :class="`ambient--${tone}`" aria-hidden="true">
    <span class="ambient__orb ambient__orb--a" />
    <span class="ambient__orb ambient__orb--b" />
    <span class="ambient__grain" />
  </div>
</template>

<style>
.ambient {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

/* Световые пятна: медленно дышат и расходятся */
.ambient__orb {
  position: absolute;
  border-radius: 9999px;
  filter: blur(90px);
  will-change: transform;
}

.ambient__orb--a {
  inline-size: 34rem;
  block-size: 34rem;
  inset-block-start: -12rem;
  inset-inline-start: -8rem;
  animation: orb-a 24s var(--ease-in-out-soft) infinite alternate;
}

.ambient__orb--b {
  inline-size: 28rem;
  block-size: 28rem;
  inset-block-start: 20%;
  inset-inline-end: -10rem;
  animation: orb-b 30s var(--ease-in-out-soft) infinite alternate;
}

.ambient--light .ambient__orb--a {
  background: radial-gradient(circle, rgb(59 130 246 / 0.16), transparent 68%);
}

.ambient--light .ambient__orb--b {
  background: radial-gradient(circle, rgb(245 158 11 / 0.14), transparent 68%);
}

.ambient--dark .ambient__orb--a {
  background: radial-gradient(circle, rgb(96 165 250 / 0.2), transparent 68%);
}

.ambient--dark .ambient__orb--b {
  background: radial-gradient(circle, rgb(245 158 11 / 0.16), transparent 68%);
}

/* Зерно: убирает «пластиковость» плоской заливки */
.ambient__grain {
  position: absolute;
  inset: -50%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E");
  opacity: 0.5;
  mix-blend-mode: overlay;
  animation: grain 8s steps(6) infinite;
  will-change: transform;
}

.ambient--dark .ambient__grain {
  opacity: 0.3;
}

@keyframes orb-a {
  to {
    transform: translate3d(8rem, 4rem, 0) scale(1.15);
  }
}

@keyframes orb-b {
  to {
    transform: translate3d(-6rem, -5rem, 0) scale(1.1);
  }
}

/* Зерно «шевелится» — иначе читается как грязь на экране, а не как плёнка */
@keyframes grain {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  20% {
    transform: translate3d(-3%, 2%, 0);
  }
  40% {
    transform: translate3d(2%, -3%, 0);
  }
  60% {
    transform: translate3d(-2%, -2%, 0);
  }
  80% {
    transform: translate3d(3%, 1%, 0);
  }
}

/* Цена вопроса.
   blur(90px) на большом круге и зерно с mix-blend-mode — это два лишних прохода
   композитора на всю площадь секции. На десктопе они бесплатны, на бюджетном
   Android съедают кадры. Поэтому на мобиле: зерно убираем совсем, пятна делаем
   меньше, слабее размытыми и неподвижными. Визуально теряется мало, кадры —
   ничего. */
@media (max-width: 1023px) {
  .ambient__grain {
    display: none;
  }

  .ambient__orb {
    filter: blur(60px);
    animation: none;
    will-change: auto;
  }

  .ambient__orb--a {
    inline-size: 22rem;
    block-size: 22rem;
  }

  .ambient__orb--b {
    inline-size: 18rem;
    block-size: 18rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ambient__orb,
  .ambient__grain {
    animation: none !important;
  }
}
</style>

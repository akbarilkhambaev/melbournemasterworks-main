<template>
  <div class="flex min-h-svh flex-col">
    <SiteHeader />

    <!-- Отступ снизу на мобиле — под липкую полосу со звонком -->
    <main class="flex-1 pb-20 lg:pb-0">
      <slot />
    </main>

    <SiteFooter />
    <CallBar />
  </div>
</template>

<template>
  <div class="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--fg)] transition-colors duration-300">
    <AppHeader />
    <main class="flex-1 w-full px-4 sm:px-6 lg:px-8 py-12">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<template>
  <div class="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--fg)] transition-colors duration-300">
    <AppHeader />
    <main class="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

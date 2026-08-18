<script setup lang="ts">
const config = useRuntimeConfig()
</script>

<template>
  <footer class="border-t border-[var(--border)] py-8">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 text-center text-sm text-[var(--muted)]">
      <p>© 2026 {{ config.public.siteName }}. 使用 Nuxt 4 构建.</p>
    </div>
  </footer>
</template>

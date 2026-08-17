<script setup lang="ts">
const colorMode = useColorMode()

function toggle() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button
    type="button"
    aria-label="切换主题"
    class="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
    @click="toggle"
  >
    <div class="i-ph-sun text-lg dark:hidden" />
    <div class="i-ph-moon text-lg hidden dark:block" />
  </button>
</template>

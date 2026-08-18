<script setup lang="ts">
const config = useRuntimeConfig()

useHead({
  htmlAttrs: {
    lang: 'zh-CN',
  },
  titleTemplate: (titleChunk) =>
    titleChunk && titleChunk !== config.public.siteName
      ? `${titleChunk} - ${config.public.siteName}`
      : config.public.siteName,
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  ],
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

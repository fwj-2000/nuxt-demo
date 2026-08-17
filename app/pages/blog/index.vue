<script setup lang="ts">
const { data: posts } = await useBlogPosts()

useHead({
  title: '博客',
})

useSeoMeta({
  title: '博客文章列表',
  description: '所有博客文章列表，涵盖 Nuxt、Vue、前端工程化和 SEO 等主题。',
})
</script>

<template>
  <div>
    <header class="mb-10">
      <h1 class="text-3xl sm:text-4xl font-bold tracking-tight mb-4">博客</h1>
      <p class="text-[var(--muted)]">共 {{ posts?.length || 0 }} 篇文章</p>
    </header>

    <div v-if="posts?.length">
      <BlogCard v-for="post in posts" :key="post._path" :article="post" />
    </div>
    <p v-else class="text-[var(--muted)]">暂无文章。</p>
  </div>
</template>

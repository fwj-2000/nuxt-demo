<script setup lang="ts">
const { data: posts } = await useBlogPosts()

useHead({
  title: '首页',
})

useSeoMeta({
  title: 'NuxtSSR',
  description: '一个使用 Nuxt 4 构建的技术博客，记录前端学习与工程实践。',
  ogTitle: 'NuxtSSR',
  ogDescription: '一个使用 Nuxt 4 构建的技术博客，记录前端学习与工程实践。',
  ogType: 'website',
})
</script>

<template>
  <div>
    <section class="mb-16">
      <h1 class="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
        记录学习，分享实践
      </h1>
      <p class="text-lg text-[var(--muted)] leading-relaxed max-w-2xl">
        这里是使用 Nuxt 4 搭建的技术博客。我会在这里写关于 Vue、Nuxt、前端工程化和 SEO 的文章。
      </p>
    </section>

    <section>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-semibold">最新文章</h2>
        <NuxtLink to="/blog" class="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          查看全部
        </NuxtLink>
      </div>
      <div v-if="posts?.length">
        <BlogCard v-for="post in posts" :key="post._path" :article="post" />
      </div>
      <p v-else class="text-[var(--muted)]">暂无文章。</p>
    </section>
  </div>
</template>

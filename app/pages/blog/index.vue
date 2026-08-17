<script setup lang="ts">
// 调用 useBlogPosts() 获取所有已发布的博客文章
// 它内部会查询 content/blog/ 下的 Markdown，按日期倒序返回
const { data: posts } = await useBlogPosts()

// 设置博客列表页的 SEO 元信息
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
      <!-- posts 是查询结果数组，长度就是文章数量 -->
      <p class="text-[var(--muted)]">共 {{ posts?.length || 0 }} 篇文章</p>
    </header>

    <!-- 遍历文章，每篇传给 BlogCard 组件渲染 -->
    <div v-if="posts?.length">
      <BlogCard v-for="post in posts" :key="post.path" :article="post" />
    </div>
    <p v-else class="text-[var(--muted)]">暂无文章。</p>
  </div>
</template>
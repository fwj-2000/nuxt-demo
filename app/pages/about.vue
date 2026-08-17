<script setup lang="ts">
useHead({
  title: '关于',
})

useSeoMeta({
  title: '关于我',
  description: '关于这个博客和作者的简单介绍。',
})
</script>

<template>
  <div class="prose dark:prose-invert max-w-none">
    <h1>关于</h1>
    <p>
      这是一个基于 Nuxt 4 构建的个人技术博客，使用 Markdown 管理文章，部署在 Vercel 上。
    </p>
    <p>
      博客的主要目标是练习现代前端工程化技能，包括 SSR/SSG、SEO、原子化 CSS、暗黑模式以及图片优化。
    </p>
    <p>
      如果你对我的文章感兴趣，可以通过以下方式找到我：
    </p>
    <ul>
      <li>GitHub: <a href="https://github.com/你的用户名" target="_blank" rel="noopener">@你的用户名</a></li>
      <li>邮箱: <a href="mailto:your@email.com">your@email.com</a></li>
    </ul>
  </div>
</template>

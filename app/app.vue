<script setup lang="ts">
// 优先级：如果页面有useHead的配置，就用自己的，没有就找父级，直到app.vue
// （希望访问不同的页面，网站的title有不同的变化）
useHead({
  "title": 'app跟组件配置（关于我们 - 枫枫知道的网站）',
  "meta": [
    { "name": 'description', "content": '这是关于页面的描述，对 SEO 非常友好' }
  ],
  "htmlAttrs": {
    "lang": 'zh-CN'
  },
  "bodyAttrs": {
    "class": 'article-theme-dark'
  }
})

useSeoMeta({
  // 基础信息
  title: 'Nuxt 4 实战教程：从零重构博客 - 枫枫知道',
  description: '这是一门关于如何使用 Nuxt 4 解决前后端分离 SEO 痛点的课程...',
  keywords: 'Nuxt 4, Vue3, SSR, SEO优化, 枫枫知道',

  // 社交分享 (微信、QQ、Discord等)
  ogTitle: 'Nuxt 4 实战教程：从零重构博客',
  ogDescription: '这是一门关于如何使用 Nuxt 4 解决前后端分离 SEO 痛点的课程...',
  ogImage: 'https://api.fengfeng.com/covers/nuxt-tutorial.png', // 必须是绝对路径
  ogType: 'article',

  // Twitter 优化
  twitterCard: 'summary_large_image',
  twitterSite: '@fengfeng_zhidao',
})
</script>
<template>

  <nuxt-layout>
    <nuxt-page></nuxt-page>
  </nuxt-layout>

</template>


<style>
body{
  margin: 0;
}
body.article-theme-dark {
  //background-color: #1a1a1a;
  //color: #e0e0e0;
}
</style>
<script setup lang="ts">
// 优先级：如果页面有useHead的配置，就用自己的，没有就找父级，直到app.vue
// （希望访问不同的页面，网站的title有不同的变化）
useHead({
  title: '关于我们 - 枫枫知道的网站',
  meta: [
    { name: 'description', content: '这是关于页面的描述，对 SEO 非常友好' }
  ],
  htmlAttrs: {
    lang: 'zh-CN'
  },
  bodyAttrs: {
    class: 'article-theme-dark'
  }
})
</script>
<template>

  <div>
    <nuxt-page></nuxt-page>
  </div>

</template>


<style>
body.article-theme-dark {
  background-color: #1a1a1a;
  color: #e0e0e0;
}
</style>
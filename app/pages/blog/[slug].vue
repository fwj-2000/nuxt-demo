<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: article } = await useAsyncData(`blog-${slug}`, () =>
  queryContent('blog', slug).findOne(),
)

if (!article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: '文章未找到',
  })
}

useHead({
  title: article.value.title,
})

useSeoMeta({
  title: article.value.title,
  description: article.value.description,
  ogTitle: article.value.title,
  ogDescription: article.value.description,
  ogImage: article.value.cover,
  ogType: 'article',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div v-if="article">
    <ProseArticle :article="article" />
  </div>
</template>

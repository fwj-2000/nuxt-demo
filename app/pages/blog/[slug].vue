<script setup lang="ts">
// 文章详情页使用专门的 article 布局，让左侧目录可以贴边
// [slug].vue 会匹配 /blog/xxx 这样的 URL
// 比如 /blog/nuxt-seo-guide，route.params.slug 就是 'nuxt-seo-guide'
definePageMeta({
  layout: 'article',
})

const route = useRoute()
const slug = route.params.slug as string

// 根据 URL 中的 slug，去 blog 集合里查 path 对应的文章
// @nuxt/content 会自动把 content/blog/nuxt-seo-guide.md 的 path 算成 /blog/nuxt-seo-guide
const { data: article } = await useAsyncData(`blog-${slug}`, () =>
  queryCollection('blog').path(`/blog/${slug}`).first(),
)

// 如果找不到对应文章，返回 404
if (!article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: '文章未找到',
  })
}

const config = useRuntimeConfig()

// 用文章的 title/description/cover 动态注入 SEO 元信息
// 这样每篇文章的 title 和 OG 标签都不一样，对搜索引擎友好
useHead({
  title: article.value.title,
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${config.public.siteUrl}${article.value.path}`,
        headline: article.value.title,
        description: article.value.description,
        image: article.value.cover
          ? `${config.public.siteUrl}${article.value.cover}`
          : undefined,
        datePublished: article.value.date,
        dateModified: article.value.date,
        author: {
          '@type': 'Person',
          name: article.value.author || config.public.author,
        },
        publisher: {
          '@type': 'Organization',
          name: config.public.siteName,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${config.public.siteUrl}${article.value.path}`,
        },
      }).replace(/</g, '\\u003c'),
    },
  ],
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
  <div v-if="article" class="article-page">
    <ProseArticle :article="article" />
  </div>
</template>
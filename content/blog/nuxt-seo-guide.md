---
title: "Nuxt 4 SEO 实践指南"
description: "从 useHead 到 sitemap，一步步让 Nuxt 4 博客对搜索引擎更友好。"
date: "2026-08-17"
tags: ["Nuxt", "SEO", "SSR"]
cover: "/images/covers/nuxt-seo.svg"
author: "WenJun"
draft: false
---

<!--
  这是一篇 Markdown 博客文章。
  上方 --- 之间是 Front Matter（文章元数据），@nuxt/content 会读取这些字段。
  字段含义参考 content.config.ts 中的 schema 定义。
  注意：文件必须保存为无 BOM 的 UTF-8，否则 Front Matter 可能解析失败。
-->

# Nuxt 4 SEO 实践指南

对于一个内容型站点来说，SEO 不是可选项。Nuxt 4 提供了一整套工具，让我们可以比较优雅地处理这件事。

## 1. 页面级元信息

在每个页面或文章详情页，使用 `useHead` 和 `useSeoMeta` 注入：

- `title`
- `meta description`
- Open Graph 标签（`og:title`、`og:description`、`og:image`）
- Twitter Card

```ts
useSeoMeta({
  title: '文章标题',
  description: '文章描述',
  ogImage: '/images/cover.png',
})
```

## 2. Sitemap 和 robots.txt

`@nuxtjs/sitemap` 会根据页面路由自动生成 `sitemap.xml`，`robots.txt` 告诉搜索引擎去哪里找它。

## 3. 图片优化

使用 `@nuxt/image` 的 `<NuxtImg>` 组件，可以自动懒加载、生成响应式图片、转换 WebP 格式。

## 小结

SEO 的本质是让搜索引擎能顺利抓取和理解你的内容。Nuxt 4 把这些工作集成到了框架层，我们只需要关注内容本身。
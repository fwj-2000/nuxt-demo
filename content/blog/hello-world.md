---
title: "你好，Nuxt 4 博客"
description: "这是我的第一篇博客文章，记录使用 Nuxt 4 搭建博客的初心。"
date: "2026-08-15"
tags: ["Nuxt", "生活"]
cover: "/images/covers/hello-world.svg"
draft: false
---

<!--
  这是一篇 Markdown 博客文章。
  上方 --- 之间是 Front Matter（文章元数据），@nuxt/content 会读取这些字段。
  字段含义参考 content.config.ts 中的 schema 定义。
  注意：文件必须保存为无 BOM 的 UTF-8，否则 Front Matter 可能解析失败。
-->

# 你好，Nuxt 4 博客

这是我用 Nuxt 4 搭建的新博客。选择 Nuxt 而不是纯 Vue SPA，最主要的原因是 **SEO 和首屏性能**。

## 为什么选 Nuxt

- **文件式路由**：不需要手动配置路由表，页面放在 `pages/` 下就自动生成。
- **SSR / SSG**：页面内容可以在服务端渲染，搜索引擎能直接抓取。
- **生态完善**：`@nuxt/content`、`@nuxt/image`、`@nuxtjs/color-mode` 都是官方维护，省心。

## 接下来写什么

我会在这里记录学习 Nuxt、Vue、前端工程化的过程。希望对你也有帮助。

```vue
<template>
  <div>Hello Nuxt 4</div>
</template>
```

感谢阅读。
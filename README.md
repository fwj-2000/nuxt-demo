# Nuxt 4 技术博客

一个基于 Nuxt 4 构建的静态技术博客，使用 Markdown 管理文章，支持暗黑模式、SEO 优化和 Vercel 部署。

## 技术栈

- [Nuxt 4](https://nuxt.com/)
- [Vue 3](https://vuejs.org/)
- [UnoCSS](https://unocss.dev/)
- [@nuxt/content](https://content.nuxt.com/)（Markdown 内容管理）
- [@nuxt/image](https://image.nuxt.com/)（图片优化）
- [@nuxtjs/color-mode](https://color-mode.nuxtjs.org/)（暗黑/白天模式）
- [@nuxtjs/sitemap](https://sitemap.nuxtjs.org/)（站点地图）

## 本地开发

```bash
pnpm install
pnpm dev
```

访问 http://localhost:3000。

## 添加文章

在 `content/blog/` 目录下新建 `.md` 文件，参考以下 Front Matter：

```md
---
title: "文章标题"
description: "文章描述"
date: "2026-08-17"
tags: ["Nuxt", "SEO"]
cover: "/images/covers/your-cover.svg"
author: "你的名字"
draft: false
---

# 文章标题

正文内容...
```

**注意**：Markdown 文件请保存为无 BOM 的 UTF-8 编码，否则 @nuxt/content 可能无法正确解析 Front Matter。

## 构建

```bash
pnpm generate
```

构建产物输出到 `dist/` 目录。

## 部署到 Vercel

1. 将代码推送到 GitHub。
2. 在 [Vercel](https://vercel.com/) 中导入仓库。
3. 使用默认设置：
   - Framework Preset: `Nuxt.js`
   - Build Command: `pnpm generate`
   - Output Directory: `dist`
4. 点击 Deploy。

部署前，请修改 `nuxt.config.ts` 中的 `site.url` 和 `public/robots.txt` 中的域名为你自己的 Vercel 域名。

## 多语言预留

当前文章放在 `content/blog/`。后续接入 `@nuxtjs/i18n` 时，可扩展为：

- `content/zh/blog/`
- `content/en/blog/`

## SEO 说明

- 全局默认 head 在 `nuxt.config.ts` 中配置。
- 页面级 SEO 使用 `useHead` / `useSeoMeta` 注入。
- 文章详情页会自动使用 Front Matter 中的 title、description、cover 生成 OG 标签。
- Sitemap 通过 `server/api/sitemap.ts` 动态收录所有文章。
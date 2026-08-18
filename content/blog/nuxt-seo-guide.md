---
title: "Nuxt 4 SEO 实践指南"
description: "从搜索引擎基础概念到 Nuxt 4 实战：robots、sitemap、TDK、JSON-LD、Open Graph、Web Vitals 与常用 SEO 工具。"
date: "2026-08-18"
tags: ["Nuxt", "SEO", "SSR"]
cover: "/images/covers/nuxt-seo.svg"
draft: false
---

# Nuxt 4 SEO 实践指南

## 1. SEO 介绍

SEO（Search Engine Optimization，搜索引擎优化）是让网站在搜索引擎自然搜索结果中获得更好排名的一系列技术和内容策略。

与 SEM（搜索引擎营销，通常指付费广告）不同，SEO 关注的是**自然流量**——用户通过搜索关键词点击进入网站，网站不需要为每次点击付费。

### 为什么 SEO 重要

- **长期流量**：一篇优化良好的文章可以在数月甚至数年内持续带来访问。
- **信任度高**：用户通常更信任自然搜索结果，而非广告。
- **成本可控**：不需要持续的广告预算，投入主要是内容和技术优化。

### SEO 的核心三大块

| 类别     | 关注点                         | 例子                                    |
| -------- | ------------------------------ | --------------------------------------- |
| 技术 SEO | 网站能否被抓取、索引和快速渲染 | robots.txt、sitemap、页面速度、移动适配 |
| 内容 SEO | 页面内容是否满足搜索意图       | 标题、正文、关键词覆盖、内容结构        |
| 站外 SEO | 外部信号，主要是链接           | 其他网站指向你的反向链接、社交媒体曝光  |

### 白帽、灰帽与黑帽

- **白帽 SEO**：遵循搜索引擎指南，注重用户体验和高质量内容。
- **黑帽 SEO**：使用作弊手段（如关键词堆砌、隐藏文字、购买低质量外链），短期可能有效，但一旦被算法识别，会受到严厉惩罚。
- **灰帽 SEO**：介于两者之间，存在风险，不建议长期依赖。

对内容型站点来说，最稳妥、最持久的策略是：**技术层面不拖后腿，内容层面真正解决问题**。

## 2. 理解 Google 搜索引擎的工作原理

Google 搜索是一款全自动搜索引擎。它会使用名为 **Googlebot** 的"网页抓取工具"定期探索网络，找出可添加到 Google 索引中的网页。实际上，搜索结果中收录的大多数网页都不是手动提交的，而是 Googlebot 在探索网络时自动发现并添加的。

理解这个流程，能让我们明白每个 SEO 动作到底在影响哪个环节。

### 三个核心阶段

Google 搜索的工作流程可分为 3 个阶段：

```
抓取（Crawling） → 索引编制（Indexing） → 呈现搜索结果（Serving / Ranking）
```

1. **抓取**：Googlebot 自动程序发现网页，并下载其中的文本、图片和视频。
2. **索引编制**：Google 分析抓取到的内容，将其存入大型索引数据库。
3. **呈现搜索结果**：用户搜索时，Google 从索引中匹配并返回最相关的结果。

### 抓取：Googlebot 如何发现页面

Googlebot 也被称为"抓取工具"、"漫游器"或"蜘蛛"程序。它会通过算法决定哪些网页需要抓取，并控制抓取频率，避免对网站造成过大负担。

Googlebot 主要通过以下方式发现页面：

- **链接抓取**：通过 `<a href="...">` 标签中的链接从一个页面跳转到另一个页面。
- **robots.txt**：告诉爬虫哪些页面可以抓、哪些不能抓（本章后面会详细讲）。
- **站点地图**：通过 `sitemap.xml` 列出网站中的 URL，帮助爬虫快速发现内容。
- **Google Search Console**：如果网站迟迟未被收录，可以手动提交网址。
- **RSS 订阅**：如果网站提供 RSS 源，Googlebot 也可能通过它抓取新内容。
- **重定向**：301/302 重定向会引导 Googlebot 访问目标页面。
- **JavaScript**：现代 Googlebot 已经能识别 JS 动态生成的链接和内容。

对站点的启示：

- 内部链接要清晰，不要让重要页面成为"孤岛"。
- 死链和无法访问的链接会浪费**抓取预算（Crawl Budget）**。
- `robots.txt` 和 `sitemap.xml` 是引导爬虫的两个核心工具。

### 索引编制：被抓取不等于被索引

索引编制是把抓取到的内容转换成用户可查询的形式，并存入索引数据库。用户搜索时，Google 是在索引数据库里匹配和排序，而不是实时抓取整个互联网。

因此，**被抓取 ≠ 被索引**。即使 Googlebot 访问了你的页面，如果页面质量不达标，或明确声明了 `noindex`，它也不会进入索引库：

```html
<meta name="robots" content="noindex" />
```

#### 索引信号

Googlebot 在分析页面时会收集各种**索引信号**，用于评估页面质量和排名潜力。这些信号正是我们后续章节要优化的地方：

- **TDK**：标题（Title）、描述（Description）、关键词（Keywords）。
- **HTML 语义化标签**：`<header>`、`<main>`、`<article>`、`<nav>` 等。
- **JSON-LD**：结构化数据，帮助搜索引擎理解页面内容。
- **Open Graph**：社交分享时的卡片信息。
- **Web Vitals**：页面加载速度和交互体验指标。
- **alt 属性**：图片的替代文本。

#### 会导致降权的行为

Google 的垃圾内容政策明确反对以下行为，违规可能导致排名下降甚至被移除索引：

- 伪装真实内容、滥用门页、滥用过期域名
- 被黑内容、隐藏文字和链接
- 关键词堆砌、垃圾链接
- 机器生成的低质量内容
- 误导性功能、滥用规模化内容

> 原文参考：[Google 搜索垃圾内容政策](https://developers.google.com/search/docs/essentials/spam-policies?hl=zh-cn)

### 呈现搜索结果：排名是怎么决定的

Google 官方承诺：不会通过付费来提高网页排名。排名是程序化完成的，依赖的是 SEO 实力。

当用户搜索时，Google 主要考量三类因素：

| 因素         | 含义                             |
| ------------ | -------------------------------- |
| **相关性**   | 页面内容与搜索意图的匹配程度     |
| **权威性**   | 域名权重、反向链接质量和数量     |
| **用户体验** | 加载速度、移动端适配、交互稳定性 |

另外需要注意：

- **收录有延迟**：页面被抓取并进入索引后，通常需要 2-3 周才会被正式收录。
- **排名需要积累**：权重积累一般需要 2-3 个月，不是改完立刻见效。
- **结果是个性化的**：搜索结果会综合用户的语言、设备、地理位置和搜索历史，SEO 优化的是整体表现，而不是固定某个位置。

### 对 Nuxt 站点的启示

Nuxt 默认支持 SSR（服务端渲染），Googlebot 抓取时能看到完整 HTML，而不是等待 JS 执行后的空壳。这对索引非常友好。

但 SSR 只是基础。后续章节会逐步覆盖：

- 用 `robots.txt` 控制爬虫行为。
- 用 `sitemap.xml` 帮助爬虫发现所有页面。
- 用正确的 `<head>` 元信息提升相关性和点击率。
- 用 JSON-LD 和 Open Graph 增强内容理解。
- 用 Web Vitals 指标保障用户体验。

## 3. robots.txt

`robots.txt` 是搜索引擎爬虫访问网站时遵循的规则文件，通常放在网站根目录下。它告诉爬虫哪些页面可以抓取，哪些页面不应该抓取。

需要明确一点：**robots.txt 不是安全机制**。即使禁止了某个路径，恶意爬虫或直接访问仍然可以获取内容。它的真正作用是**引导善意的搜索引擎爬虫，避免它们把抓取预算浪费在不重要的页面上**。

### 常用指令

| 指令          | 含义                                                                                  |
| ------------- | ------------------------------------------------------------------------------------- |
| `User-agent`  | 指定对哪些爬虫生效。`*` 表示所有爬虫，也可以写具体爬虫名如 `Googlebot`、`Baiduspider` |
| `Allow`       | 允许抓取的路径                                                                        |
| `Disallow`    | 禁止抓取的路径                                                                        |
| `Crawl-delay` | 爬虫访问间隔（秒）。**Googlebot 不支持该参数**，部分其他爬虫支持                      |
| `Sitemap`     | 站点地图的完整 URL                                                                    |
| `Host`        | 网站首选域名（部分搜索引擎支持）                                                      |

常见爬虫名称：

- `Googlebot`：Google
- `Baiduspider`：百度
- `Bingbot`：必应
- `YandexBot`：Yandex
- `Sogou web spider` / `Sogou inst spider`：搜狗
- `360Spider`：360
- `Bytespider`：字节跳动
- `PetalBot`：华为花瓣

### 规则优先级

同一份 `robots.txt` 里，如果既有 `User-agent: *`，又有具名爬虫（如 `User-agent: Googlebot`），那么对某只爬虫而言，会**优先采用与其名称匹配的那一组规则**；没有单独声明时，再回退到 `*` 通配规则。

### 示例：掘金

> [掘金链接](https://juejin.cn/robots.txt)

```txt
User-agent: *
Disallow: /subscribe/subscribed
Sitemap: https://juejin.cn/sitemap/posts/index.xml
```

掘金对所有爬虫允许整站抓取，但禁止访问 `/subscribe/subscribed`，同时通过 Sitemap 告诉爬虫站点地图位置。

### 示例：哔哩哔哩

哔哩哔哩的规则更复杂，为不同爬虫设置了不同权限：

> [B站链接](https://www.bilibili.com/robots.txt)

```txt
User-agent: *
Disallow: /medialist/detail/
Disallow: /index.html

User-agent: Googlebot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: bingbot
Allow: /

User-agent: *
Disallow: /
```

解读：

- 第一段 `User-agent: *` 禁止所有爬虫抓 `/medialist/detail/` 和 `/index.html`。
- 中间为 Google、百度、必应等主流爬虫单独声明 `Allow: /`，允许抓全站。
- 最后一段 `User-agent: * Disallow: /` 作为兜底：未单独列名的爬虫禁止抓全站。

### Nuxt 4 实战

在 Nuxt 4 中，企业级项目通常不会手写 `server/routes/robots.txt.get.ts`，而是使用官方模块 `@nuxtjs/robots`。它和 Next.js 的 `robots.ts` 思路一致：在 `nuxt.config.ts` 里声明式配置，构建时自动生成 `robots.txt`。

#### 1. 安装模块

```bash
pnpm add @nuxtjs/robots
```

#### 2. 在 nuxt.config.ts 中注册并配置

```ts
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ...其他配置

  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots', // 自动生成 robots.txt
    '@unocss/nuxt',
  ],

  // 站点信息：robots 和 sitemap 都会读取这里的 url
  site: {
    url: 'https://xiaofu-blog.vercel.app',
    name: 'xiaofu-xf',
  },

  // robots.txt 配置：支持多组 User-agent 规则
  robots: {
    groups: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
    ],
  },
})
```

配置要点：

- `site.url` 会被 `@nuxtjs/robots` 自动读取，用于生成 `Sitemap` 指令，不需要手动拼接。
- `groups` 数组支持多组规则，每组可以指定不同的 `userAgent`、`allow`、`disallow`、`crawlDelay`。
- 规则优先级与标准 `robots.txt` 一致：具名爬虫优先于 `*` 通配规则。

#### 3. 移除旧实现

如果之前用 Nitro 路由手写 `robots.txt`，现在可以删除：

- 删除 `server/routes/robots.txt.get.ts`
- 从 `nitro.prerender.routes` 中移除 `/robots.txt`（模块会自动处理）

#### 4. 验证

本地开发时直接访问 `http://localhost:3000/robots.txt`，你可能会看到：

```txt
# START nuxt-robots (indexing disabled)
User-agent: *
Disallow: /

# DEVELOPMENT HINTS:
# - Indexing is blocked in development. You can mock a production environment with ?mockProductionEnv query.
# END nuxt-robots
```

**不要担心，这是 `@nuxtjs/robots` 模块的开发环境保护机制**，防止搜索引擎误收录 localhost。要查看生产环境的真实输出，加上 `?mockProductionEnv` 参数：

```
http://localhost:3000/robots.txt?mockProductionEnv
```

此时应该能看到：

```txt
User-agent: *
Allow: /
Disallow: /admin

User-agent: Googlebot
Allow: /

Sitemap: https://xiaofu-blog.vercel.app/sitemap.xml
```

部署后，用 Google Search Console 的 robots.txt 测试工具，或浏览器直接访问 `https://your-domain.com/robots.txt` 检查是否生效。

### 其他可行方案

除了 `@nuxtjs/robots` 模块，Nuxt 4 中还有两种常用做法，根据项目需求选择即可。

#### 方案一：`public/robots.txt` 静态文件

直接把 `robots.txt` 放到项目的 `public/` 目录下。构建后它会原样输出到站点根目录。

```txt
// public/robots.txt
User-agent: *
Allow: /
Disallow: /admin

Sitemap: https://xiaofu-blog.vercel.app/sitemap.xml
```

**适用场景**：规则简单、不随环境变化、不想引入额外依赖。

**缺点**：站点域名或 sitemap 地址变化时，需要手动修改文件内容。

#### 方案二：`server/routes/robots.txt.get.ts` Nitro 路由

通过 Nitro 服务端路由动态生成，适合需要从 `runtimeConfig` 读取站点地址的场景。

```ts
// server/routes/robots.txt.get.ts
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)

  setResponseHeader(event, 'Content-Type', 'text/plain')

  return `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${config.public.siteUrl}/sitemap.xml
`
})
```

如果用于 SSG，还需要在 `nuxt.config.ts` 里加入预渲染：

```ts
nitro: {
  prerender: {
    routes: ['/robots.txt'],
  },
}
```

**适用场景**：规则不复杂，但希望从配置中心动态生成内容，避免硬编码域名。

**缺点**：规则复杂时需要手写字符串拼接，可维护性不如 `@nuxtjs/robots` 模块。

#### 三种方案对比

| 方案 | 配置位置 | 复杂度 | 适合场景 |
| --- | --- | --- | --- |
| `public/robots.txt` | 静态文件 | 低 | 规则简单、无动态需求 |
| Nitro 服务端路由 | `server/routes/robots.txt.get.ts` | 中 | 需要动态读取站点配置 |
| `@nuxtjs/robots` 模块 | `nuxt.config.ts` | 低（功能多） | 企业级项目、规则复杂、与 sitemap 集成 |

### 注意事项

- **不要把 robots.txt 当保密工具**：敏感内容应该通过登录验证、`noindex` 标签或 HTTP 认证来保护。
- **不要禁止整个站点**：`Disallow: /` 会让搜索引擎不抓取任何页面。
- **谨慎 disallow `/api`**：如果站点依赖 API 接口生成 sitemap 或其他关键内容，禁止 `/api` 可能导致搜索引擎无法正确索引。
- **谨慎使用 Crawl-delay**：Googlebot 不支持该参数，且过度限制可能影响收录效率。
- **测试改动**：修改 robots.txt 后，可以用 Google Search Console 重新提交并验证。

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

## 4. sitemap.xml

`sitemap.xml` 是一个文件，用来列出网站中希望搜索引擎抓取和索引的页面 URL。它不会强制爬虫抓取这些 URL，但能**显著提高页面被发现和收录的效率**，尤其是以下场景：

- 网站有大量页面，内部链接不够完善。
- 某些页面没有从首页或其他重要页面链接过来（孤岛页面）。
- 内容经常更新，需要告诉搜索引擎最新状态。
- 网站使用 JavaScript 动态生成导航，爬虫可能无法通过链接完整发现页面。

根据 [Google 搜索中心文档](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)，提交 sitemap 只是给搜索引擎一个"提示"，不保证一定会被使用。

### sitemap 的格式

Google 支持多种 sitemap 格式，[没有偏好某一种](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)。企业级项目中常见的有：

| 格式 | 说明 | 适用场景 |
| --- | --- | --- |
| **XML** | 最灵活，支持 `lastmod`、`changefreq`、`priority`，以及图片、视频、新闻等扩展 | 绝大多数企业级项目 |
| **RSS / Atom** | 天然带更新时间和内容列表 | 已有 RSS 订阅的站点 |
| **纯文本** | 每行一个 URL | 最简单，但功能最少 |

一个典型的 XML sitemap 长这样：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://xiaofu-blog.vercel.app/</loc>
    <lastmod>2026-08-18</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://xiaofu-blog.vercel.app/blog/nuxt-seo-guide</loc>
    <lastmod>2026-08-18</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>
```

常用字段：

| 字段 | 是否必填 | 说明 |
| --- | --- | --- |
| `loc` | 是 | 页面完整 URL |
| `lastmod` | 否 | 页面最后修改时间 |
| `changefreq` | 否 | 更新频率，如 `daily`、`weekly`、`monthly` |
| `priority` | 否 | 相对优先级，范围 0.0 ~ 1.0，默认 0.5 |

### sitemap 索引文件

当 URL 数量超过 [50,000 个或文件大小超过 50MB（未压缩）](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) 时，必须拆分成多个 sitemap，并用 `sitemap index` 文件管理：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://example.com/sitemap-pages.xml</loc>
    <lastmod>2024-08-15</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemap-posts.xml</loc>
    <lastmod>2022-06-05</lastmod>
  </sitemap>
</sitemapindex>
```

企业级大型站点通常会按内容类型拆分：

- `sitemap-pages.xml`：首页、关于页等静态页面
- `sitemap-posts.xml`：博客文章
- `sitemap-products.xml`：商品详情页
- `sitemap-categories.xml`：分类/标签页

### Nuxt 4 实战

Nuxt 4 中生成 `sitemap.xml` 的主流做法是使用官方模块 `@nuxtjs/sitemap`。对于由 `@nuxt/content` 动态生成的文章页，再通过一个 `server/api/sitemap.ts` 数据源把 URL 注入进去。

#### 1. 安装模块

```bash
pnpm add @nuxtjs/sitemap
```

#### 2. 注册并配置模块

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    // ...其他模块
    '@nuxtjs/sitemap',
  ],

  // 站点信息：sitemap 会读取这里的 url 生成完整链接
  site: {
    url: 'https://xiaofu-blog.vercel.app',
    name: 'xiaofu-xf',
  },

  // sitemap 配置：使用 /api/sitemap 作为额外 URL 来源
  sitemap: {
    sources: ['/api/sitemap'],
  },
})
```

配置说明：

- `site.url` 是 sitemap 里所有 URL 的域名前缀，必须带协议（`https://`）。
- `@nuxtjs/sitemap` 默认会自动发现 `pages/` 目录下的静态路由，比如 `/`、`/blog`，并自动加入 sitemap。
- `sources: ['/api/sitemap']` 告诉模块：额外去 `/api/sitemap` 接口读取动态页面 URL。

#### 3. 为什么需要 `server/api/sitemap.ts`

`@nuxt/content` 的文章页（如 `/blog/nuxt-seo-guide`）不是 `pages/` 目录下的硬编码路由，而是在运行时根据 `content/blog/*.md` 动态生成的。`@nuxtjs/sitemap` 在构建时无法自动知道这些动态路由，因此需要我们自己提供一个数据源。

#### 4. 创建 sitemap 数据源

文件：[server/api/sitemap.ts](server/api/sitemap.ts)

推荐使用模块提供的 `defineSitemapEventHandler`：

```ts
import { queryCollection } from '@nuxt/content/server'

export default defineSitemapEventHandler(async () => {
  // 查询 blog 集合的所有文章
  const posts = await queryCollection('blog').all()

  // 返回 sitemap 标准格式
  return posts.map(post => ({
    loc: post.path,      // 页面 URL，例如 /blog/nuxt-seo-guide
    lastmod: post.date,  // 最后修改时间，这里用发布日期
  }))
})
```

代码解读：

- `defineSitemapEventHandler` 是 `@nuxtjs/sitemap` 提供的专用 helper，比普通 `defineEventHandler` 更语义化。
- `queryCollection('blog').all()`：读取 `content/blog/` 下所有 Markdown 文件的元数据。
- `loc: post.path`：文章的访问路径，模块会自动拼接成完整 URL。
- `lastmod: post.date`：文章发布日期，用于告诉搜索引擎内容新鲜度。

#### 5. 企业级进阶：多 sitemap 配置

当站点变大后，可以用 `@nuxtjs/sitemap` 的 `sitemaps` 配置拆分成多个子 sitemap。例如把页面和文章分开：

```ts
// nuxt.config.ts
sitemap: {
  sitemaps: {
    pages: {
      // pages/ 目录下的静态路由会自动进入这个 sitemap
      include: ['/**'],
      exclude: ['/blog/**'],
    },
    posts: {
      // 动态文章 URL 从 /api/sitemap 读取
      sources: ['/api/sitemap'],
    },
  },
}
```

构建后会生成 `sitemap-pages.xml` 和 `sitemap-posts.xml`，并通过 `sitemap.xml`（sitemap index）统一管理。

#### 6. 构建与验证

安装并配置完成后，运行：

```bash
pnpm generate
```

构建完成后检查 `.output/public/sitemap.xml`，应该能看到：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://xiaofu-blog.vercel.app/</loc>
  </url>
  <url>
    <loc>https://xiaofu-blog.vercel.app/blog</loc>
  </url>
  <url>
    <loc>https://xiaofu-blog.vercel.app/blog/nuxt-seo-guide</loc>
    <lastmod>2026-08-18</lastmod>
  </url>
  <url>
    <loc>https://xiaofu-blog.vercel.app/blog/hello-world</loc>
    <lastmod>2026-08-17</lastmod>
  </url>
</urlset>
```

本地开发时也可以直接访问 `http://localhost:3000/sitemap.xml` 预览。

### 提交 sitemap 的方式

生成 sitemap 后，需要告诉搜索引擎它在哪里。常见方式有三种：

| 方式 | 说明 |
| --- | --- |
| **Google Search Console** | 手动提交 `https://your-domain.com/sitemap.xml`，最常用 |
| **Search Console API** | 程序化提交，适合有大量站点或需要自动化运维的企业 |
| **robots.txt 引用** | 在 `robots.txt` 里加 `Sitemap: https://your-domain.com/sitemap.xml`，搜索引擎抓取时会自动发现 |

推荐使用 **Search Console + robots.txt 引用** 双保险。

### 其他可行方案

和 `robots.txt` 一样，`sitemap.xml` 在 Nuxt 中也有多种实现方式。

#### 方案一：`public/sitemap.xml` 静态文件

直接把写好的 `sitemap.xml` 放到 `public/` 目录下。构建后它会原样输出到站点根目录。

```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://xiaofu-blog.vercel.app/</loc>
  </url>
  <url>
    <loc>https://xiaofu-blog.vercel.app/blog</loc>
  </url>
</urlset>
```

**适用场景**：页面极少且基本不变的小型站点。

**缺点**：页面增多或文章频繁发布时，手动维护成本高，容易遗漏。

#### 方案二：`server/routes/sitemap.xml.get.ts` Nitro 路由

通过 Nitro 服务端路由手写 XML，适合需要完全自定义格式或数据源的场景。

```ts
// server/routes/sitemap.xml.get.ts
import { queryCollection } from '@nuxt/content/server'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const posts = await queryCollection(event, 'blog').all()

  const urls = posts.map(post => `
    <url>
      <loc>${config.public.siteUrl}${post.path}</loc>
      <lastmod>${post.date}</lastmod>
    </url>
  `).join('')

  setResponseHeader(event, 'Content-Type', 'application/xml')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`
})
```

如果用于 SSG，还需要在 `nuxt.config.ts` 里加入预渲染：

```ts
nitro: {
  prerender: {
    routes: ['/sitemap.xml'],
  },
}
```

**适用场景**：需要完全自定义 sitemap 结构，或数据来源不是 `@nuxt/content`。

**缺点**：需要手动拼接 XML，容易出错；没有自动路由发现、格式校验、lastmod 推断等便利功能。

#### 三种方案对比

| 方案 | 配置位置 | 复杂度 | 适合场景 |
| --- | --- | --- | --- |
| `public/sitemap.xml` | 静态文件 | 低 | 页面极少、不更新 |
| Nitro 服务端路由 | `server/routes/sitemap.xml.get.ts` | 中 | 需要完全自定义格式或数据源 |
| `@nuxtjs/sitemap` 模块 | `nuxt.config.ts` + `server/api/sitemap.ts` | 低（功能多） | 企业级项目、动态内容、需要自动维护和多 sitemap 拆分 |

### 注意事项

- **sitemap 不会替代内部链接**：清晰的站内链接仍然是 SEO 的基础。
- **只放规范 URL**：不要同时放 `http` 和 `https`、带 `www` 和不带 `www` 的重复 URL。
- **保持 `lastmod` 更新**：文章发布或修改后，`lastmod` 应该随之更新，帮助搜索引擎判断内容新鲜度。
- **文件大小和数量限制**：单个 sitemap 最多 50,000 个 URL 或 50MB，超过必须拆分成 `sitemap index`。
- **不要只依赖 sitemap**：对于不重要或私密的页面，应该使用 `robots.txt` 或 `noindex` 控制。
- **提交后检查状态**：在 Google Search Console 提交 sitemap 后，要关注"已发现 URL 数"和"已索引 URL 数"，排查异常。

## 5. TDK 优化 + HTML 语义化标签

TDK 是 SEO 中最基础、也最容易出效果的部分。它指的是：

| 元素 | 全称 | 作用 |
| --- | --- | --- |
| **T** | Title（标题） | 告诉搜索引擎和用户这个页面是关于什么的，是最重要的排名信号之一 |
| **D** | Description（描述） | 搜索结果页中显示的摘要，影响点击率（CTR） |
| **K** | Keywords（关键词） | 早期搜索引擎会参考，但 Google 已明确不再将其作为排名因素 |

### Title 优化

`<title>` 标签是页面最重要的元信息之一。优化时需要注意：

- **唯一性**：每个页面的 title 都应该不同，不要全站共用同一个 title。
- **长度**：控制在 50~60 个字符以内，超过可能被截断。
- **关键词前置**：把核心关键词放在前面，品牌名放后面。
- **避免堆砌**：不要重复堆叠关键词，要自然通顺。

示例：

```html
<!-- 好的 title -->
<title>Nuxt 4 SEO 实践指南 - xiaofu-xf</title>

<!-- 不好的 title -->
<title>SEO, Nuxt SEO, Nuxt 4 SEO, 搜索引擎优化</title>
```

### Description 优化

`meta description` 不会直接影响排名，但会影响用户是否点击。优化要点：

- **唯一性**：每个页面写不同的描述。
- **长度**：控制在 150~160 个字符以内。
- **包含关键词**：用户搜索词会高亮显示，提高相关性感知。
- **行动号召**：适当引导用户点击，如"了解..."、"查看完整指南"。

示例：

```html
<meta name="description" content="从 useHead 到 sitemap，一步步让 Nuxt 4 博客对搜索引擎更友好。涵盖 robots.txt、TDK、JSON-LD、Open Graph 和 Web Vitals。">
```

### Keywords 还写吗？

Google 在 2009 年就宣布不再把 `meta keywords` 作为排名因素。目前主流搜索引擎中，只有极少数还会参考它。

结论：**可以写，但优先级最低**；不要把精力花在这上面。

### Nuxt 4 实战

Nuxt 提供了 `useHead` 和 `useSeoMeta` 两个组合式函数来管理页面 `<head>` 元信息。

#### 1. 全局 titleTemplate

在 [app/app.vue](app/app.vue) 中设置全局 title 模板和默认元信息：

```ts
// app/app.vue
const config = useRuntimeConfig()

useHead({
  htmlAttrs: {
    lang: 'zh-CN',
  },
  titleTemplate: (titleChunk) =>
    titleChunk && titleChunk !== config.public.siteName
      ? `${titleChunk} - ${config.public.siteName}`
      : config.public.siteName,
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  ],
})
```

这样设置后：

- 首页 title 显示为 `xiaofu-xf`
- 其他页面如果设置了 title，会显示为 `页面标题 - xiaofu-xf`
- `htmlAttrs.lang = 'zh-CN'` 帮助搜索引擎识别页面语言

#### 2. 页面级 TDK

在 [app/pages/index.vue](app/pages/index.vue) 中设置首页：

```ts
useHead({
  title: '首页',
})

useSeoMeta({
  title: config.public.siteName,
  description: `${config.public.siteName} 的个人技术博客，记录前端学习与工程实践。`,
  ogTitle: config.public.siteName,
  ogDescription: `${config.public.siteName} 的个人技术博客，记录前端学习与工程实践。`,
  ogType: 'website',
})
```

在 [app/pages/blog/index.vue](app/pages/blog/index.vue) 中设置博客列表页：

```ts
useHead({
  title: '博客',
})

useSeoMeta({
  title: '博客文章列表',
  description: '所有博客文章列表，涵盖 Nuxt、Vue、前端工程化和 SEO 等主题。',
})
```

#### 3. 动态页面 TDK

在 [app/pages/blog/[slug].vue](app/pages/blog/[slug].vue) 中，根据文章内容动态注入：

```ts
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
```

这样每篇文章都有不同的 title 和 description，对搜索引擎和社交媒体都更友好。

### HTML 语义化标签

语义化标签是指具有明确含义的 HTML 标签，比如 `<header>`、`<main>`、`<article>`，而不是无意义的 `<div>`、`<span>`。

#### 为什么语义化重要

- **帮助搜索引擎理解结构**：爬虫能更快识别标题、正文、导航、页脚等区域。
- **提升可访问性**：屏幕阅读器依赖语义化标签为视障用户导航。
- **有利于渲染优先级**：搜索引擎可以判断哪些内容是页面的核心。

#### 常用语义化标签

| 标签 | 用途 |
| --- | --- |
| `<header>` | 页面或区块的头部，通常包含 logo、导航 |
| `<nav>` | 导航链接组 |
| `<main>` | 页面主要内容，每个页面应只有一个 |
| `<article>` | 独立的文章、博客帖子、新闻内容 |
| `<section>` | 文档中的主题区块 |
| `<aside>` | 侧边栏、附加信息 |
| `<footer>` | 页面或区块的底部 |
| `<h1>` ~ `<h6>` | 标题层级，<h1> 通常一个页面只有一个 |
| `<time>` | 时间/日期，可带 `datetime` 属性 |
| `<figure>` / `<figcaption>` | 图片及其说明 |

#### Nuxt 项目中的应用

以本项目为例：

- [app/layouts/default.vue](app/layouts/default.vue) 用 `<main>` 包裹页面主体。
- [app/components/AppHeader.vue](app/components/AppHeader.vue) 用 `<header>` 和 `<nav>`。
- [app/components/ProseArticle.vue](app/components/ProseArticle.vue) 用 `<article>` 包裹文章正文。
- 文章 Markdown 中的标题被自动渲染为 `<h1>`、`<h2>` 等层级标签。

示例：

```vue
<template>
  <article>
    <header>
      <h1>{{ article.title }}</h1>
      <time :datetime="article.date">{{ formatDate(article.date) }}</time>
    </header>

    <div class="content">
      <!-- 正文 -->
    </div>
  </article>
</template>
```

### 注意事项

- **不要滥用 <h1>**：一个页面通常只应有一个 `<h1>`，且包含核心关键词。
- **标题层级不要跳跃**：不要从 `<h2>` 直接跳到 `<h4>`。
- **title 和 h1 可以不同**：title 面向搜索结果，h1 面向页面读者，但内容要一致。
- **description 不要直接复制正文**：应该是一段吸引点击的独立摘要。
- **移动端也要关注**：语义化结构和 TDK 在移动端同样重要。

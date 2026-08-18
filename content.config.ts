import { defineCollection, defineContentConfig, z } from '@nuxt/content'

// 这里是 @nuxt/content 的内容集合配置。
// 作用：告诉 Nuxt 去哪里找 Markdown 文件，并规定每篇文章可以有哪些字段。
// 本例中，集合名叫 `blog`，会读取 content/blog/ 目录下所有 .md 文件。
export default defineContentConfig({
  collections: {
    blog: defineCollection({
      // type: 'page' 表示这些 Markdown 会生成可被页面使用的“页面类型”内容
      type: 'page',
      // source: 文件匹配规则。content/blog/**/*.md 表示 content/blog/ 及其子目录下的所有 md 文件
      source: 'blog/**/*.md',
      // schema: 用 zod 定义 Front Matter 的字段和类型，保证数据稳定
      schema: z.object({
        title: z.string(),              // 文章标题
        description: z.string(),        // 用于 SEO 的描述
        date: z.string(),               // 发布日期，用于排序
        tags: z.array(z.string()).optional(), // 标签数组，可选
        cover: z.string().optional(),   // 封面图路径，可选
        author: z.string().optional().default('xiaofu-xf'),  // 作者，可选，默认读取站点配置
        draft: z.boolean().optional().default(false), // 是否为草稿，默认 false
      }),
    }),
  },
})
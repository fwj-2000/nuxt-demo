// 这个 composable 封装了“获取所有已发布博客文章”的逻辑。
// 它在首页和博客列表页被调用，作用是查询 @nuxt/content 里的 blog 集合。
export function useBlogPosts(lang: string = 'zh') {
  return useAsyncData(`blog-posts-${lang}`, () =>
    // queryCollection('blog') 对应 content.config.ts 中定义的 blog 集合
    // 也就是读取 content/blog/ 下的所有 Markdown 文件
    queryCollection('blog')
      // 过滤掉草稿文章：只返回 draft 不等于 true 的
      .where('draft', '<>', true)
      // 按 date 字段倒序排列，最新的文章排在最前面
      .order('date', 'DESC')
      // .all() 表示返回所有匹配结果
      .all(),
  )
}
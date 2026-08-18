// 这个 server API 是给 @nuxtjs/sitemap 用的数据源。
// sitemap 模块会请求 /api/sitemap，把返回的 URL 合并进最终的 sitemap.xml。
// 这样搜索引擎就能发现所有动态生成的文章页面。
import { queryCollection } from '@nuxt/content/server'

export default defineSitemapEventHandler(async (event) => {
  // 在服务端查询 blog 集合的所有文章
  const posts = await queryCollection(event, 'blog').all()

  // 把每篇文章的 path 和 date 转换成 sitemap 需要的格式
  return posts.map(post => ({
    loc: post.path,      // 页面 URL，例如 /blog/nuxt-seo-guide
    lastmod: post.date,  // 最后修改时间，这里用发布日期
  }))
})
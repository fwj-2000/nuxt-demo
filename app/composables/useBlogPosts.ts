import type { QueryBuilderParams } from '@nuxt/content'

export function useBlogPosts(lang: string = 'zh') {
  return useAsyncData(`blog-posts-${lang}`, () =>
    queryContent('blog')
      .where({ draft: { $ne: true } })
      .sort({ date: -1 })
      .find(),
  )
}

export function useBlogPosts(lang: string = 'zh') {
  return useAsyncData(`blog-posts-${lang}`, () =>
    queryCollection('blog')
      .where('draft', '<>', true)
      .order('date', 'DESC')
      .all(),
  )
}

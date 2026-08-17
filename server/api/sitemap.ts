import { queryCollection } from '@nuxt/content/server'

export default defineEventHandler(async (event) => {
  const posts = await queryCollection(event, 'blog').all()
  return posts.map(post => ({
    loc: post.path,
    lastmod: post.date,
  }))
})
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)

  setResponseHeader(event, 'Content-Type', 'text/plain')

  return `User-agent: *
Allow: /

Sitemap: ${config.public.siteUrl}/sitemap.xml
`
})

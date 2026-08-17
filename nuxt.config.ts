// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxtjs/sitemap',
    '@unocss/nuxt',
  ],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0',
      titleTemplate: '%s - 你的博客名',
    },
  },
  site: {
    url: 'https://你的域名.vercel.app',
    name: '你的博客名',
  },
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },
  image: {
    quality: 80,
    format: ['webp'],
  },
  sitemap: {
    sources: ['/api/sitemap'],
  },
  nitro: {
    output: {
      publicDir: 'dist',
    },
  },
  content: {
    // 使用 Node.js 内置 sqlite，避免安装 better-sqlite3
    experimental: {
      sqliteConnector: 'native',
    },
  },
})
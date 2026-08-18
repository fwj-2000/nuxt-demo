// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // 站点核心配置：以后想换品牌名/域名，只改这里即可
  runtimeConfig: {
    public: {
      siteName: 'xiaofu-xf',
      siteUrl: 'https://xiaofu-blog.vercel.app',
      author: 'xiaofu-xf',
    },
  },

  // 注册的 Nuxt 模块：
  // - @nuxt/content: Markdown 内容管理
  // - @nuxt/image: 图片优化
  // - @nuxtjs/color-mode: 暗黑/白天模式
  // - @nuxtjs/sitemap: 自动生成 sitemap.xml
  // - @unocss/nuxt: 原子化 CSS
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxtjs/sitemap',
    '@unocss/nuxt',
  ],

  // 全局引入的 CSS 文件
  css: ['~/assets/css/main.css'],

  // 全局默认 <head> 配置：
  // titleTemplate 在 app.vue 中根据 runtimeConfig.public.siteName 动态设置
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0',
    },
  },

  // 站点信息：sitemap 等模块会读取这里的 url 和 name
  site: {
    url: 'https://xiaofu-blog.vercel.app',
    name: 'xiaofu-xf',
  },

  // color-mode 配置：
  // - classSuffix: '' 表示 class 名直接用 dark/light，不加后缀
  // - preference: 'system' 默认跟随系统
  // - fallback: 'light' 如果系统无法判断，默认用浅色
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },

  // @nuxt/image 配置：图片默认质量 80，优先输出 webp 格式
  image: {
    quality: 80,
    format: ['webp'],
  },

  // sitemap 配置：使用 /api/sitemap 作为额外 URL 来源
  // 这样 sitemap 才能收录 @nuxt/content 动态生成的文章页
  sitemap: {
    sources: ['/api/sitemap'],
  },

  // 预渲染动态路由：robots.txt 由 server/routes/robots.txt.get.ts 动态生成
  // 必须显式加入预渲染列表，否则 SSG 不会输出该文件
  nitro: {
    prerender: {
      routes: ['/robots.txt'],
    },
  },

  content: {
    // 使用 Node.js 内置 sqlite，避免在 Windows 上安装 better-sqlite3 需要 Python 编译环境
    experimental: {
      sqliteConnector: 'native',
    },
  },
})

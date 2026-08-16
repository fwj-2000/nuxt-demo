// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app:{
    head:{
      titleTemplate: '%s - nuxt全局配置',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0',
    }
  }
})

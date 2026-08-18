export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/about') {
    throw createError({
      status: 404,
      statusText: 'Page Not Found',
    })
  }
})

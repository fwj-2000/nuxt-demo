<template>
  <header class="border-b border-[var(--border)] sticky top-0 z-50 bg-[var(--bg)]/80 backdrop-blur">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
      <NuxtLink to="/" class="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
        WenJun Blogs
      </NuxtLink>
      <nav class="flex items-center gap-6">
        <NuxtLink to="/" class="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          首页
        </NuxtLink>
        <NuxtLink to="/blog" class="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          博客
        </NuxtLink>
<!--        <NuxtLink to="/about" class="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors">-->
<!--          关于-->
<!--        </NuxtLink>-->
        <ThemeToggle />
      </nav>
    </div>
  </header>
</template>

<template>
  <div class="my-blog-layout">
    <header>
      <nav>
        <NuxtLink to="/">首页</NuxtLink>
        <NuxtLink to="/user">用户</NuxtLink>
      </nav>
    </header>

    <main>
      <slot />
    </main>

    <footer>
      <p>© 2026 nuxt4 - 开启 SSR 之旅</p>
    </footer>
  </div>
</template>

<style scoped>
.my-blog-layout{
  display: flex;
  flex-direction: column;
  height: 100vh;
  nav{
    a{
      margin-right: 20px;
    }
  }
}
/* 这里写全局通用的样式 */
header { border-bottom: 1px solid #eee; padding: 1rem; }
main{
  flex: 1;
  border: #1a1a1a 1px solid;
}
footer {  text-align: center; color: #888; }
</style>
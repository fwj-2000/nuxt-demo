<script setup lang="ts">
definePageMeta({
  layout: 'admin' // 对应 layouts/admin.vue 布局系统
})
// 某种条件下动态切换到 default 布局
function enableMode() {
  setPageLayout('default')
}
</script>

<template>
  <h1>欢迎回来，admin</h1>
  <div>
    <button @click="enableMode">切换default </button>
  </div>
</template>
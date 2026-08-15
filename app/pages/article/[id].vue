<script setup lang="ts">
import {useRoute} from "vue-router";
const route = useRoute()
console.log(route,'router',route.params,route.query)
const articleId = route.params.id

definePageMeta({
  validate: async (route) => {
    // 检查 id 是否为数字
    return /^\d+$/.test(route.params.id as string) // 匹配失败会跳转到404页面
  }
})
</script>

<template>
  <div>
    文章详情页面： 文章id {{articleId }}
    查询参数：{{route.query}}
  </div>
</template>
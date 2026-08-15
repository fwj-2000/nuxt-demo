<script setup lang="ts">
const route = useRoute();
</script>

<template>
  article/{{route.params.articleID}}/comment/{{route.params.commentID}}
</template>

<style scoped>

</style>
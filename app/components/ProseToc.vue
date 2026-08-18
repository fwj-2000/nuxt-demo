<script setup lang="ts">
interface TocLink {
  id: string
  depth: number
  text: string
}

interface Props {
  links: TocLink[]
}

defineProps<Props>()
</script>

<template>
  <nav class="toc">
    <div class="text-sm font-semibold mb-3 text-[var(--muted)]">目录</div>
    <ul class="space-y-2">
      <li
        v-for="link in links"
        :key="link.id"
        :style="{ paddingLeft: `${(link.depth - 2) * 0.75}rem` }"
      >
        <a
          :href="`#${link.id}`"
          class="toc-link block text-sm transition-colors hover:text-[var(--fg)]"
          :class="link.depth === 2 ? 'font-medium' : 'text-[var(--muted)]'"
        >
          {{ link.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.toc-link {
  color: var(--muted);
}

.toc-link:hover {
  color: var(--fg);
}
</style>

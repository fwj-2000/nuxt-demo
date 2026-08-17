<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content'

interface Props {
  article: ParsedContent
}

defineProps<Props>()
</script>

<template>
  <article class="group border-b border-[var(--border)] py-8 last:border-b-0">
    <NuxtLink :to="`/blog/${article._path?.split('/').pop()}`" class="block">
      <div class="flex flex-col sm:flex-row gap-6">
        <div v-if="article.cover" class="sm:w-40 shrink-0">
          <NuxtImg
            :src="article.cover"
            :alt="article.title"
            width="160"
            height="120"
            class="rounded-md w-full h-32 sm:h-24 object-cover bg-neutral-100 dark:bg-neutral-800"
            loading="lazy"
          />
        </div>
        <div class="flex-1">
          <h2 class="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {{ article.title }}
          </h2>
          <p class="text-[var(--muted)] text-sm mb-3 line-clamp-2">
            {{ article.description }}
          </p>
          <div class="flex items-center gap-3 text-xs text-[var(--muted)]">
            <time v-if="article.date" :datetime="article.date">
              {{ formatDate(article.date) }}
            </time>
            <span v-if="article.tags?.length" class="flex gap-2">
              <span v-for="tag in article.tags" :key="tag" class="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800">
                {{ tag }}
              </span>
            </span>
          </div>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>

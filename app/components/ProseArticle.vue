<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content'

interface Props {
  article: ParsedContent
}

defineProps<Props>()
</script>

<template>
  <article class="prose dark:prose-invert max-w-none">
    <header class="mb-10 not-prose">
      <h1 class="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{{ article.title }}</h1>
      <p class="text-lg text-[var(--muted)] mb-4">{{ article.description }}</p>
      <div class="flex items-center gap-4 text-sm text-[var(--muted)]">
        <time v-if="article.date" :datetime="article.date">{{ formatDate(article.date) }}</time>
        <span v-if="article.author">{{ article.author }}</span>
        <span v-if="article.tags?.length" class="flex gap-2">
          <span v-for="tag in article.tags" :key="tag" class="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800">
            {{ tag }}
          </span>
        </span>
      </div>
    </header>

    <div v-if="article.cover" class="not-prose mb-10">
      <NuxtImg
        :src="article.cover"
        :alt="article.title"
        width="1200"
        height="630"
        class="rounded-lg w-full object-cover bg-neutral-100 dark:bg-neutral-800"
        loading="eager"
      />
    </div>

    <ContentRenderer :value="article" />
  </article>
</template>

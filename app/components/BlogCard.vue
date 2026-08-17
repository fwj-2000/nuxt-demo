<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content'

// Props: 接收一篇文章的数据对象，由 @nuxt/content 解析 Markdown 后生成
interface Props {
  article: ParsedContent
}

defineProps<Props>()
</script>

<template>
  <article class="group border-b border-[var(--border)] py-8 last:border-b-0">
    <!-- 
      article.path 是 @nuxt/content 自动生成的路由路径。
      例如 content/blog/nuxt-seo-guide.md 对应 path: '/blog/nuxt-seo-guide'
      所以点击卡片就能跳转到正确的文章详情页。
    -->
    <NuxtLink :to="article.path" class="block">
      <div class="flex flex-col sm:flex-row gap-6">
        <!-- 如果文章有 cover，就显示封面图 -->
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
<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'

const { frontmatter } = useData()
const tags = computed<string[]>(() => {
  const t = frontmatter.value.tags
  return Array.isArray(t) ? t : t ? [t] : []
})
const date = computed(() => {
  const d = frontmatter.value.date
  return d ? new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : ''
})
</script>

<template>
  <div v-if="frontmatter.date" class="post-meta">
    <span>{{ date }}</span>
    <span v-if="frontmatter.author"> · {{ frontmatter.author }}</span>
    <span v-for="t in tags" :key="t" class="tag">{{ t }}</span>
  </div>
</template>

<style scoped>
.post-meta { color: var(--vp-c-text-2); font-size: 14px; margin-bottom: 16px; }
.tag { margin-left: 8px; padding: 1px 8px; border-radius: 10px; background: var(--vp-c-default-soft); font-size: 12px; }
</style>

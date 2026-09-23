<script setup>
import { computed } from 'vue'
import { ArrowUpRight } from '@lucide/vue'

const props = defineProps({ project: { type: Object, required: true } })
const emit = defineEmits(['select'])

const hasExternalLink = computed(() => Boolean(props.project.href))

const openProject = () => {
  if (!props.project.href) {
    emit('select', props.project)
    return
  }

  window.open(props.project.href, '_blank', 'noopener,noreferrer')
}

const handleCardClick = () => {
  emit('select', props.project)
}

const handleActionClick = (event) => {
  event.stopPropagation()
  openProject()
}
</script>
<template>
  <article class="project-card group" @click="handleCardClick">
    <div class="project-image-wrap">
      <img
        :src="project.image"
        :alt="`${project.title} project preview`"
        :class="['project-image', { 'project-image--contain': hasExternalLink }]"
      />
      <button
        class="image-action"
        type="button"
        :aria-label="project.href ? `Open ${project.title}` : `Open ${project.title} details`"
        @click.stop.prevent="handleActionClick"
      >
        <ArrowUpRight :size="19" />
      </button>
    </div>
    <div class="project-meta"><div><p class="eyebrow">{{ project.category }}</p><h3>{{ project.title }}</h3></div><p class="project-arrow">↗</p></div>
    <p class="project-description">{{ project.description }}</p><div class="tag-row"><span v-for="tag in project.tags" :key="tag">{{ tag }}</span></div>
  </article>
</template>

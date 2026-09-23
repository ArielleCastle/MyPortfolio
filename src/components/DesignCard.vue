<script setup>
import { computed } from 'vue'

const props = defineProps({ design: { type: Object, required: true } })
const emit = defineEmits(['select'])

const hasExternalLink = computed(() => Boolean(props.design.href))
const isPortraitCard = computed(() => Boolean(props.design.portrait))

const openExternalLink = () => {
  if (!props.design.href) return

  window.open(props.design.href, '_blank', 'noopener,noreferrer')
}

const handleCardClick = () => {
  emit('select', props.design)
}

const handleActionClick = (event) => {
  event.stopPropagation()
  openExternalLink()
}
</script>
<template>
  <article
    class="design-card"
    :class="{ 'design-card--external': hasExternalLink, 'design-card--portrait': isPortraitCard }"
    tabindex="0"
    @click="handleCardClick"
    @keydown.enter.prevent="handleCardClick"
    @keydown.space.prevent="handleCardClick"
  >
    <img
      :src="design.image"
      :alt="design.title"
      :class="{ 'design-image--contain': hasExternalLink || isPortraitCard }"
    />
    <button
      v-if="design.href"
      class="design-action"
      type="button"
      aria-label="Open design in Figma"
      @click.stop.prevent="handleActionClick"
    >
      <span>↗</span>
    </button>
    <span class="design-overlay"><span>{{ design.title }}</span><small>{{ design.category }}</small></span>
  </article>
</template>

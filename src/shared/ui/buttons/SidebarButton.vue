<template>
  <RouterLink
    v-if="isSidebarExpanded"
    :to="route"
    class="router-button-events rounded-md transition-all px-4 py-2 flex items-center gap-2 text-primary-900"
    :class="selected && 'btn-selected'"
    v-bind="$attrs"
  >
    <i class="text-xl" :class="icon"></i>
    <span class="text-xl">{{ label }}</span>
  </RouterLink>

  <Button
    v-else
    :icon="icon"
    as="router-link"
    :to="route"
    text
    severity="secondary"
  />
</template>

<script setup>
  import { useSidebarStore } from '@/shared/model/stores/sidebar'

  const props = defineProps({
    route: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  })

  const sidebarStore = useSidebarStore()
  const isExpanded = computed(() => sidebarStore.isExpanded)
</script>

<style lang="css">
  .router-button-events {
    &:hover {
      background: var(--p-button-text-primary-hover-background);
      color: var(--p-button-text-primary-color);
    }

    &:active {
      background: var(--p-button-text-primary-active-background);
      color: var(--p-button-text-primary-color);
    }
  }

  .btn-selected {
    background: var(--p-button-text-primary-hover-background);
    color: var(--p-button-text-primary-color);
  }
</style>

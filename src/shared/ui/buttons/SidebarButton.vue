<template>
  <RouterLink
    v-if="isSidebarExpanded"
    :to="route"
    class="secondary-btn rounded-md transition-all px-4 py-2 flex items-center gap-2"
  >
    <i class="text-xl" :class="icon"></i>
    <span class="text-xl">{{ label }}</span>
  </RouterLink>

  <RouterLink
    v-else
    :to="route"
    class="secondary-btn rounded-md transition-all w-fit p-4 flex items-center"
  >
    <i class="text-xl" :class="icon"></i>
    <span class="text-xl">{{ label }}</span>
  </RouterLink>
</template>

<script setup>
  import { useSidebarStore } from '@/shared/model/stores/sidebar'
  import { computed } from 'vue'

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
  const isSidebarExpanded = computed(() => sidebarStore.isExpanded)
</script>

<style lang="css">
  /*button.secondary.background	          --p-button-secondary-background	  Secondary background of root*/
  /*button.secondary.color	              --p-button-secondary-color	      Secondary color of root*/
  /*button.secondary.border.color	        --p-button-secondary-border-color	Secondary border color of root*/

  /*button.secondary.hover.background	    --p-button-secondary-hover-background	  Secondary hover background of root*/
  /*button.secondary.hover.border.color	  --p-button-secondary-hover-border-color	Secondary hover border color of root*/
  /*button.secondary.hover.color	        --p-button-secondary-hover-color	      Secondary hover color of root*/

  /*button.secondary.active.background	  --p-button-secondary-active-background	 Secondary active background of root*/
  /*button.secondary.active.border.color	--p-button-secondary-active-border-color Secondary active border color of root*/
  /*button.secondary.active.color	        --p-button-secondary-active-color	       Secondary active color of root*/

  /*button.secondary.focus.ring.color	    --p-button-secondary-focus-ring-color	 Secondary focus ring color of root*/
  /*button.secondary.focus.ring.shadow	  --p-button-secondary-focus-ring-shadow Secondary focus ring shadow of root*/

  .secondary-btn {
    background: var(--p-button-secondary-background);
    color: var(--p-button-secondary-color);
    border-color: var(--p-button-secondary-border-color);

    &:hover {
      background: var(--p-button-secondary-hover-background);
      color: var(--p-button-secondary-hover-color);
      border-color: var(--p-button-secondary-hover-border-color);
    }

    &:active {
      background: var(--p-button-secondary-active-background);
      color: var(--p-button-secondary-active-color);
      border-color: var(--p-button-secondary-active-border-color);
    }
  }

  .btn-selected {
    background: var(--p-button-text-primary-hover-background);
    color: var(--p-button-text-primary-color);
  }
</style>

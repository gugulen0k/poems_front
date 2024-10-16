<template>
  <div class="h-screen w-full">
    <header class="h-[4rem]">
      <slot name="header"></slot>
    </header>

    <div class="h-[calc(100%-4rem)] flex">
      <div
        class="h-full w-[5rem] transition-all"
        :class="isExpanded && '!w-[10rem]'"
      >
        <slot name="sidebar"></slot>
      </div>

      <div class="h-full w-full rounded-tl-2xl bg-slate-100">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useSidebarStore } from '@/shared/model/stores/sidebar'
  import { computed } from 'vue'

  const sidebarStore = useSidebarStore()
  const isExpanded = computed(() => sidebarStore.isExpanded)
</script>

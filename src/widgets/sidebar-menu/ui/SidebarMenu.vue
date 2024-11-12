<template>
  <nav>
    <ul class="space-y-2">
      <li v-for="item in menuitems" :key="item.label">
        <button
          class="w-full flex items-center p-2 space-x-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          :class="activeSection === section.title ? section.color : ''"
          :aria-label="section.title"
          @click="setActiveSection(section.title)"
        >
          <component
            :is="section.icon"
            :size="24"
            :class="isCollapsed ? 'mx-auto' : ''"
          />
          <span v-if="!isCollapsed">{{ section.title }}</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
  import { computed } from 'vue'
  import { useSidebarStore } from '@/shared/model/stores/useSidebarStore'
  import { menuItems } from '../lib/menuItems'

  const sidebarStore = useSidebarStore()
  const isCollapsed = computed(() => sidebarStore.sidebarState)
</script>

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSidebarStore = defineStore(
  'sidebar',
  () => {
    const isOpen = ref(true)
    const activeItem = ref('All Poems')

    function toggleSidebar() {
      isOpen.value = !isOpen.value
    }

    function setActiveItem(item) {
      activeItem.value = item
    }

    return { activeItem, isOpen, toggleSidebar, setActiveItem }
  },
  { persist: true }
)

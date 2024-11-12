import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useSidebarStore = defineStore(
  'sidebar',
  () => {
    const sidebar = ref({ isOpen: false })

    const sidebarState = computed(() => sidebar.value.isOpen)
    const activeItem = computed(() => sidebar.value.activeItem)

    function toggleSidebar() {
      isOpen.value = !isOpen.value
    }

    function setActiveItem(itemKey) {
      sidebar.value.activeItem = itemKey
    }

    return { activeItem, sidebarState, toggleSidebar, setActiveItem }
  },
  { persist: true }
)

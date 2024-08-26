import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    isExpanded: true,
  }),
  getters: {
    sidebarState: (state) => state.isExpanded,
  },
  actions: {
    toggleSidebar() {
      this.isExpanded = !this.isExpanded
    },
  },
  persist: true,
})

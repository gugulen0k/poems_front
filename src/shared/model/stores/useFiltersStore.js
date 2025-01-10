import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useFiltersStore = defineStore(
  'filters',
  () => {
    const filters = ref({})

    const getFiltersState = computed(() => (pageId) => {
      if (!filters.value[pageId]) return {}

      return filters.value[pageId]
    })

    function updateFilters(pageId, appliedFilters) {
      filters.value[pageId] = { ...appliedFilters }
    }

    return { filters, getFiltersState, updateFilters }
  },
  { persist: true }
)

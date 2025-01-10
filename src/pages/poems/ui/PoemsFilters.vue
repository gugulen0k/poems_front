<template>
  <div class="m-4 mb-0">
    <DesktopFiltersPanel
      :filters-list="filters"
      :page-id="PAGE_ID"
      :validation-schema="schema"
      :initial-values="initialValues"
    />

    <div class="flex gap-2 justify-center">
      <div v-for="(value, filterName) in appliedFilters" :key="filterName">
        <Chip
          v-if="value"
          class="rounded-md py-1 border border-primary-200 bg-none"
        >
          {{ StringUtils.camelToFlat(filterName).trim() }}: {{ value }}
        </Chip>
      </div>
    </div>

    <MobileFiltersPanel
      v-model="mobileFiltersVisible"
      :filters-list="filters"
      :page-id="PAGE_ID"
      :validation-schema="schema"
      :initial-values="initialValues"
    />
  </div>
</template>

<script setup>
  import { object, string } from 'yup'
  import { ref } from 'vue'
  import { PAGE_ID } from '../lib/constants'
  import { useFiltersStore } from '@/shared/model/stores/useFiltersStore'
  import StringUtils from '@/shared/lib/utils/string'

  import DesktopFiltersPanel from '@/widgets/desktop-filters-panel'
  import MobileFiltersPanel from '@/widgets/mobile-filters-panel'
  import { watch } from 'vue'
  import { computed } from 'vue'

  const mobileFiltersVisible = defineModel()

  const filters = [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      name: 'author',
      label: 'Author',
      type: 'text',
    },
  ]

  const initialValues = ref({
    title: '',
    author: '',
  })

  const schema = object({
    title: string(),
    author: string(),
  })

  const filtersStore = useFiltersStore()
  const appliedFilters = computed(() => {
    return filtersStore.getFiltersState(PAGE_ID)
  })

  watch(
    () => filtersStore.getFiltersState(PAGE_ID),
    (filters) => {
      appliedFilters.value = { ...filters }
    }
  )
</script>

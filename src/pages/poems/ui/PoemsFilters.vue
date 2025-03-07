<template>
  <div class="m-4 mb-0">
    <DesktopFiltersPanel
      :filters-list="filters"
      :page-id="POEMS_PAGE_ID"
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
      :page-id="POEMS_PAGE_ID"
      :validation-schema="schema"
      :initial-values="initialValues"
    />
  </div>
</template>

<script setup>
  import { object, string } from 'yup'
  import { ref } from 'vue'
  import { POEMS_PAGE_ID } from '@/shared/lib/constants'
  import { useFiltersStore } from '@/shared/model/stores/useFiltersStore'
  import StringUtils from '@/shared/lib/utils/string'

  import DesktopFiltersPanel from '@/widgets/desktop-filters-panel'
  import MobileFiltersPanel from '@/widgets/mobile-filters-panel'
  import { computed } from 'vue'

  const mobileFiltersVisible = defineModel()

  const filters = [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      name: 'text',
      label: 'Text',
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
    text: '',
    author: '',
  })

  const schema = object({
    title: string(),
    text: string(),
    author: string(),
  })

  const filtersStore = useFiltersStore()
  const appliedFilters = computed(() =>
    filtersStore.getFiltersState(POEMS_PAGE_ID)
  )
</script>

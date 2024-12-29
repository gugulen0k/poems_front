<template>
  <DesktopFiltersPanel
    :filters-list="filters"
    :page-id="PAGE_ID"
    :validation-schema="schema"
    :initial-values="initialValues"
  />
</template>

<script setup>
  import { object, string } from 'yup'
  import { ref } from 'vue'
  import { PAGE_ID } from '../lib/constants'
  import DesktopFiltersPanel from '@/widgets/desktop-filters-panel'
  import MobileFiltersPanel from '@/widgets/mobile-filters-panel'

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
</script>

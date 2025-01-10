<template>
  <Panel
    ref="filtersCollapsed"
    toggleable
    class="hidden laptop:block laptop:mb-4"
  >
    <template #header>
      <Button
        type="submit"
        severity="danger"
        size="small"
        @click="resetFilters"
      >
        <template #icon>
          <FontAwesomeIcon :icon="faFilterCircleXmark" />
        </template>
      </Button>
    </template>

    <Filtering
      ref="filtering"
      :filters-list="filtersList"
      :initial-values="initialValues"
      :validation-schema="validationSchema"
      :page-id="pageId"
    />

    <template #footer>
      <div class="flex justify-end">
        <Button type="submit" label="Search" @click="submitFilters">
          <template #icon>
            <FontAwesomeIcon :icon="faSearch" />
          </template>
        </Button>
      </div>
    </template>
  </Panel>
</template>

<script setup>
  import { ref } from 'vue'

  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import {
    faSearch,
    faFilterCircleXmark,
  } from '@fortawesome/free-solid-svg-icons'

  import Filtering from '@/features/filtering/ui/Filtering.vue'

  defineProps({
    filtersList: {
      type: Array,
      required: true,
    },
    initialValues: {
      type: Object,
      required: true,
    },
    validationSchema: {
      type: Object,
      required: true,
    },
    pageId: {
      type: String,
      required: true,
    },
  })

  const filtering = ref(null)
  const filtersCollapsed = ref(false)

  const resetFilters = () => {
    if (!filtering.value) return

    filtering.value.onFormReset()
  }

  const submitFilters = () => {
    if (!filtering.value) return

    filtersCollapsed.value = true
    filtering.value.onFormSubmit()
  }
</script>

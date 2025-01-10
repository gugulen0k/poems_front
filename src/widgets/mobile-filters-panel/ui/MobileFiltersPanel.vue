<template>
  <Drawer v-model:visible="visibility" header="Filters" position="right">
    <div class="">
      <Filtering
        ref="filtering"
        class="flex-col w-full"
        :filters-list="filtersList"
        :initial-values="initialValues"
        :validation-schema="validationSchema"
        :page-id="pageId"
      />
    </div>

    <div class="mt-auto flex flex-shrink h-max">
      <Button
        class="my-4 text-lg"
        variant="outlined"
        severity="danger"
        @click="resetFilters"
      >
        <template #default>
          <FontAwesomeIcon :icon="faFilterCircleXmark" />
        </template>
      </Button>
      <Button type="submit" label="Search" @click="submitFilters">
        <template #icon>
          <FontAwesomeIcon :icon="faSearch" />
        </template>
      </Button>
    </div>
  </Drawer>
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

  const visibility = defineModel()
  const filtering = ref(null)

  const resetFilters = () => {
    if (!filtering.value) return

    filtering.value.onFormReset()
  }

  const submitFilters = () => {
    if (!filtering.value) return

    filtering.value.onFormSubmit()
  }
</script>

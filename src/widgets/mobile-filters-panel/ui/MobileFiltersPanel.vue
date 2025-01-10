<template>
  <Drawer v-model:visible="visibility" header="Filters" position="right">
    <div class="h-full flex flex-col">
      <Filtering
        ref="filtering"
        class="flex-col w-full"
        :filters-list="filtersList"
        :initial-values="initialValues"
        :validation-schema="validationSchema"
        :page-id="pageId"
      />

      <div class="mt-auto flex gap-4 flex-shrink-0">
        <Button
          class="text-lg"
          variant="outlined"
          severity="danger"
          @click="resetFilters"
        >
          <template #default>
            <FontAwesomeIcon :icon="faFilterCircleXmark" />
          </template>
        </Button>

        <Button
          type="submit"
          label="Search"
          class="w-full"
          @click="submitFilters"
        >
          <template #icon>
            <FontAwesomeIcon :icon="faSearch" />
          </template>
        </Button>
      </div>
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

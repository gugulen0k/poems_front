<template>
  <Panel ref="filtersCollapsed" toggleable class="hidden laptop:block">
    <template #header>
      <Button type="submit" severity="danger" size="small" @click="onFormReset">
        <template #icon>
          <FontAwesomeIcon :icon="faFilterCircleXmark" />
        </template>
      </Button>

      <div class="flex gap-2">
        <div v-for="(value, filterName) in form" :key="filterName">
          <Chip
            v-if="value"
            class="rounded-md py-1 border border-primary-200 bg-none"
          >
            {{ StringUtils.camelToFlat(filterName).trim() }}: {{ value }}
          </Chip>
        </div>
      </div>
    </template>
  </Panel>
</template>

<script setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import {
    faSearch,
    faFilterCircleXmark,
  } from '@fortawesome/free-solid-svg-icons'

  import { computed, ref, toRefs } from 'vue'
  import { ValidatedInputDate, ValidatedInputText } from '@/shared/ui/inputs'
  import { TEXT, DATE } from '@/shared/lib/constants'
  import { useForm } from 'vee-validate'
  import { useFiltersStore } from '@/shared/model/stores/useFiltersStore'
  import ObjectUtils from '@/shared/lib/utils/object'
  import StringUtils from '@/shared/lib/utils/string'

  const props = defineProps({
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

  const { filtersList, schema, initialValues, pageId } = toRefs(props)

  const filtersCollapsed = ref(false)
  const filtersStore = useFiltersStore()

  const form = computed(() => {
    const appliedFilters = filtersStore.getFiltersState(pageId.value)
    const result = {
      ...initialValues.value,
      ...appliedFilters,
    }

    if (appliedFilters.releaseDate) {
      result.releaseDate = new Date(
        appliedFilters.releaseDate
      ).toLocaleDateString()
    }

    return result
  })

  const { handleSubmit, setValues } = useForm({
    validationSchema: schema,
    initialValues: form,
  })

  const onFormReset = () => {
    filtersStore.updateFilters(pageId.value, {})
    setValues(initialValues.value)
  }

  const onFormSubmit = handleSubmit((values) => {
    const appliedFilters = ObjectUtils.cleanEmptyValues(values)

    filtersCollapsed.value = true
    filtersStore.updateFilters(pageId.value, appliedFilters)
  })

  const getInputComponent = (type) => {
    switch (type) {
      case TEXT:
        return ValidatedInputText
      case DATE:
        return ValidatedInputDate
    }
  }
</script>

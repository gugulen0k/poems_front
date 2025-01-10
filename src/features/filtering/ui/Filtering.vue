<template>
  <form :name="pageId" @submit.prevent="onFormSubmit">
    <Fluid class="flex gap-4" v-bind="$attrs">
      <component
        :is="getInputComponent(field.type)"
        v-for="field in filtersList"
        :key="field.name"
        v-model="form[field.name]"
        :name="field.name"
        :label="field.label"
        v-bind="field.componentAttrs"
      />
    </Fluid>
  </form>
</template>

<script setup>
  import { computed, ref, toRefs } from 'vue'
  import { ValidatedInputDate, ValidatedInputText } from '@/shared/ui/inputs'
  import { TEXT, DATE } from '@/shared/lib/constants'
  import { useForm } from 'vee-validate'
  import { useFiltersStore } from '@/shared/model/stores/useFiltersStore'
  import ObjectUtils from '@/shared/lib/utils/object'

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

  defineExpose({ onFormReset, onFormSubmit })
</script>

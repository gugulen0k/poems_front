<template>
  <div>
    <div>
      <Button />
    </div>

    <Panel
      ref="filtersCollapsed"
      toggleable
      class="hidden laptop:block"
      @toggle="toggleFilters"
    >
      <template #header>
        <Button
          type="submit"
          severity="danger"
          size="small"
          @click="onFormReset"
        >
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

      <form class="pt-8 flex items-end gap-4 w-full" @submit="onFormSubmit">
        <Fluid class="flex gap-4">
          <ValidatedInputText
            v-model="form['title']"
            name="title"
            label="Title"
          />
          <ValidatedInputText
            v-model="form['author']"
            name="author"
            label="Author"
          />
          <!-- <ValidatedInputDate
name="releaseDate"
label="Release Date"
show-button-bar
:max-date="maxDate"
/> -->
        </Fluid>

        <Button type="submit" label="Search" class="h-full">
          <template #icon>
            <FontAwesomeIcon :icon="faSearch" />
          </template>
        </Button>
      </form>
    </Panel>
  </div>
</template>

<script setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import {
    faSearch,
    faFilterCircleXmark,
  } from '@fortawesome/free-solid-svg-icons'

  import { useForm } from 'vee-validate'
  import { object, string, date } from 'yup'
  import { computed, ref } from 'vue'
  import { ValidatedInputDate, ValidatedInputText } from '@/shared/ui/inputs'
  import { useFiltersStore } from '@/shared/model/stores/useFiltersStore'
  import { PAGE_ID } from '../lib/constants'
  import ObjectUtils from '@/shared/lib/utils/object'
  import StringUtils from '@/shared/lib/utils/string'

  const maxDate = ref(new Date())
  const filtersCollapsed = ref(false)
  const filtersStore = useFiltersStore()
  const initialValues = ref({
    title: '',
    author: '',
    //releaseDate: null,
  })

  const form = computed(() => {
    const appliedFilters = computed(() => filtersStore.getFiltersState(PAGE_ID))

    const result = {
      ...initialValues.value,
      ...appliedFilters.value,
    }

    if (appliedFilters.value.releaseDate) {
      result.releaseDate = new Date(result.releaseDate).toLocaleDateString()
    }

    return result
  })

  const schema = object({
    title: string(),
    author: string(),
    //releaseDate: date().nullable().optional().typeError('Not a valid date'),
  })

  const { resetForm, handleSubmit } = useForm({
    validationSchema: schema,
    initialValues: form.value,
  })

  const onFormReset = () => {
    console.log('resetting')
    resetForm()
    filtersStore.updateFilters(PAGE_ID, {})
  }

  const toggleFilters = (e) => {
    console.log(e.value)
  }

  const onFormSubmit = handleSubmit((values) => {
    const appliedFilters = ObjectUtils.cleanEmptyValues(values)

    filtersCollapsed.value = true
    filtersStore.updateFilters(PAGE_ID, appliedFilters)
  })
</script>

<template>
  <div class="flex flex-col gap-2">
    <label :for="name">{{ label }}</label>
    <DatePicker v-bind="$attrs" v-model="value" :name="name" variant="filled" />
    <span
      v-if="errorMessage"
      v-motion-fade-visible
      class="text-red-500 text-sm"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup>
  import { useField } from 'vee-validate'

  const props = defineProps({
    name: {
      required: true,
      type: String,
    },
    label: {
      required: true,
      type: String,
    },
  })

  const { value, errorMessage } = useField(() => props.name)
</script>

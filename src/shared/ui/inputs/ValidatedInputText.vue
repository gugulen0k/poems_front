<template>
  <div class="flex flex-col gap-2">
    <label :for="name" class="text-primary-800">{{ label }}</label>
    <InputText
      v-bind="$attrs"
      v-model="value"
      autocomplete="off"
      variant="filled"
      :name="name"
    />
    <Message size="small" severity="secondary" variant="simple">{{
      helpMessage
    }}</Message>
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
    helpMessage: {
      required: false,
      type: String,
    },
  })

  const { value, errorMessage } = useField(() => props.name)
</script>

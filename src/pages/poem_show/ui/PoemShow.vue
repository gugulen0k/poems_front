<template>
  <div v-if="!isPending">{{ poem }}</div>

  <div v-if="isPending" class="flex justify-center">
    <ProgressSpinner />
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { usePoemQuery } from '../api/usePoemQuery'

  const route = useRoute()
  const { id } = route.params

  const poem = ref({})
  const { data, isPending } = usePoemQuery(id)

  watch(
    data,
    (currentData) => {
      if (!data.value) return

      poem.value = currentData.data
    },
    { immediate: true, deep: true }
  )
</script>

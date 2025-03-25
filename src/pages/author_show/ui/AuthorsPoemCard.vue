<template>
  <RouterLink :to="`/poems/${poem.id}`">
    <Card
      class="h-full bg-primary-50 border border-primary-800/20 shadow-xs transition-all duration-200 hover:shadow-sm hover:border-primary-800"
    >
      <template #title>
        <span class="font-bold text-primary-700">
          {{ poem.title }}
        </span>
      </template>

      <template #subtitle>
        {{ poem.released }}
      </template>

      <template #content>
        <p
          class="whitespace-pre-wrap text-primary-600 text-lg max-h-20 overflow-y-hidden"
        >
          {{ poem.text }}
        </p>
      </template>
    </Card>
  </RouterLink>
</template>

<script setup>
  defineProps({
    poem: {
      type: Object,
      required: true,
    },
  })
</script>

<template>
  <RouterLink :to="`/poems/${poem.id}`">
    <Card
      class="h-full bg-primary-50 border shadow-sm transition-all hover:shadow-md hover:scale-[1.01]"
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
        <p class="whitespace-pre-wrap text-primary-600 text-lg">
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

<template>
  <Card pt:subtitle:class="text-right">
    <template #title>
      <span class="font-bold">{{ poem.title }}</span>
    </template>

    <template #subtitle>
      <span>{{ poem.author_full_name }}</span>
    </template>

    <template #content>
      <span>{{ poem.short_text }}</span>
    </template>

    <template #footer>
      <div class="flex gap-4">
        <Button icon="pi pi-heart" severity="danger" outlined />
        <Button label="Read" class="flex-1" outlined fluid />
      </div>
    </template>
  </Card>
</template>

<script setup>
  defineProps({
    poem: {
      type: Object,
      required: true,
    },
  })
</script>

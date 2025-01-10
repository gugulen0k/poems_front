<template>
  <Card
    pt:subtitle:class="text-right"
    pt:content:class="h-full flex flex-col justify-center"
    pt:root:class="flex-row"
    pt:body:class="w-full"
    class="border shadow-none"
  >
    <template #title>
      <span class="font-bold">{{ poem.title }}</span>
    </template>

    <template #subtitle>
      <span>{{ poem.author_full_name }}</span>
    </template>

    <template #content>
      <p class="whitespace-pre-wrap align-middle">{{ poem.short_text }}</p>
    </template>

    <template #footer>
      <div class="mt-4 flex gap-4">
        <Button severity="secondary" outlined>
          <template #icon>
            <FontAwesomeIcon :icon="faHeart" />
          </template>
        </Button>
        <Button label="Read" class="flex-1" />
      </div>
    </template>
  </Card>
</template>

<script setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { faHeart } from '@fortawesome/free-regular-svg-icons'

  defineProps({
    poem: {
      type: Object,
      required: true,
    },
  })
</script>

<template>
  <Card
    pt:content:class="h-full flex flex-col justify-center"
    pt:root:class="flex-row"
    pt:body:class="w-full"
    class="border shadow-sm bg-primary-50"
  >
    <template #content>
      <div class="flex flex-col gap-4">
        <RouterLink
          v-if="poem.author.id"
          :to="`author/${poem.author.id}`"
          class="w-max"
        >
          <div class="flex items-center gap-4 group">
            <div
              v-if="poem.author.image"
              class="flex-shrink-0 border-2 border-primary-700 rounded-full w-16 h-16 overflow-hidden shadow-lg"
            >
              <img :src="poem.author.image" class="w-max" />
            </div>

            <div
              v-else
              class="flex-shrink-0 bg-primary-100 flex justify-center items-center border-2 border-primary-700 rounded-full w-16 h-16 overflow-hidden shadow-lg"
            >
              <FontAwesomeIcon :icon="faUser" class="text-xl" />
            </div>

            <div class="flex flex-col text-primary-500">
              <span class="text-lg group-hover:text-red-400">{{
                poem.author.name
              }}</span>
              <span class="font-bold text-xl group-hover:text-red-400">{{
                poem.author.surname
              }}</span>
            </div>
          </div>
        </RouterLink>

        <span class="font-bold text-xl text-left text-primary-700">{{
          poem.title
        }}</span>

        <p class="whitespace-pre-wrap align-middle">{{ poem.short_text }}</p>
      </div>
    </template>

    <template #footer>
      <div class="mt-4 flex gap-4">
        <Button severity="secondary" outlined>
          <template #icon>
            <FontAwesomeIcon :icon="faHeart" />
          </template>
        </Button>

        <Button
          label="Read"
          class="flex-1"
          as="router-link"
          :to="`poems/${poem.id}`"
        />
      </div>
    </template>
  </Card>
</template>

<script setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { faHeart } from '@fortawesome/free-regular-svg-icons'
  import { faUser } from '@fortawesome/free-solid-svg-icons'

  defineProps({
    poem: {
      type: Object,
      required: true,
    },
  })
</script>

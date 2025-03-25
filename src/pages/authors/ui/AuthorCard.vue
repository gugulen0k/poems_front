<template>
  <RouterLink :to="`authors/${author.id}`">
    <div
      class="relative min-h-[21rem] h-full overflow-hidden rounded-lg bg-primary-50 border border-primary-800/20 hover:border-primary-800 duration-200 transition-all"
    >
      <img
        v-if="author.image"
        :src="author.image"
        class="w-full h-full object-cover"
      />
      <div v-else class="h-full flex items-center justify-center">
        <FontAwesomeIcon :icon="faUser" class="text-6xl text-primary-200" />
      </div>

      <div
        class="absolute bottom-0 w-full p-4 bg-gradient-to-t from-primary-950 text-white flex flex-col"
      >
        <span>{{ author.name }}</span>
        <span class="font-bold text-lg">{{ author.surname }}</span>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { faUser } from '@fortawesome/free-solid-svg-icons'

  defineProps({
    author: {
      type: Object,
      required: true,
    },
  })
</script>

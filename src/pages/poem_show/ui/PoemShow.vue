<template>
  <div class="w-full h-full flex flex-col bg-white tablet:rounded-xl">
    <div class="flex justify-between laptop:justify-end p-4 sticky">
      <Button variant="outlined">
        <template #icon>
          <FontAwesomeIcon :icon="emptyHeart" />
        </template>
      </Button>

      <Button class="laptop:hidden">
        <template #icon>
          <FontAwesomeIcon :icon="faBars" />
        </template>
      </Button>
    </div>

    <div v-if="isPending" class="flex justify-center">
      <ProgressSpinner />
    </div>

    <div v-else class="relative h-full">
      <ScrollPanel
        class="absolute h-full overflow-x-hidden top-0 left-0 tablet:left-2/4 tablet:-translate-x-2/4 laptop:left-1/2 laptop:-translate-x-1/2"
        :dt="{ bar: { background: '{primary.500}' } }"
      >
        <div class="w-full flex flex-col gap-6 p-4">
          <div
            v-if="poem.author"
            class="w-full flex flex-col items-center gap-4"
          >
            <img :src="imageUrl" class="rounded-full w-40" />
            <span class="text-xl italic text-slate-600">{{ authorsName }}</span>
          </div>

          <div class="text-2xl text-center font-bold">{{ poem.title }}</div>
          <div class="mt-4 whitespace-pre-wrap text-lg">{{ poem.text }}</div>
          <div class="text-slate-500 mt-8 text-lg text-right italic">
            {{ poem.released }}
          </div>
        </div>
      </ScrollPanel>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { usePoemQuery } from '../api/usePoemQuery'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import {
    faBars,
    faHeart as filledHeart,
  } from '@fortawesome/free-solid-svg-icons'
  import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons'

  const router = useRouter()
  const route = useRoute()
  const { id } = route.params

  const poem = ref({})
  const authorsName = ref('')
  const { data, isPending } = usePoemQuery(id)

  const imageUrl = 'https://dummyimage.com/300.png/09f/fff'

  watch(
    data,
    (currentData) => {
      if (!data.value) return

      poem.value = currentData.data
      authorsName.value = `${poem.value?.author?.name} ${poem.value?.author?.surname}`
    },
    { immediate: true, deep: true }
  )
</script>

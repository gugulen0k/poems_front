<template>
  <div class="relative w-full h-full flex flex-col bg-white tablet:rounded-xl">
    <Button variant="outlined" class="absolute bottom-4 right-4">
      <template #icon>
        <FontAwesomeIcon :icon="emptyHeart" />
      </template>
    </Button>

    <div class="flex justify-between p-4 sticky">
      <Button variant="outlined" @click="goBack">
        <template #icon>
          <FontAwesomeIcon :icon="faArrowLeft" />
        </template>
      </Button>
      <Button>
        <template #icon>
          <FontAwesomeIcon :icon="faBars" />
        </template>
      </Button>
    </div>

    <div class="mx-4 flex flex-col gap-6 justify-center items-center">
      <div class="w-full flex flex-col items-center gap-4">
        <img
          :src="imageUrl"
          class="rounded-full w-3/12 tablet:w-2/12 laptop:w-1/12"
        />
        <span class="text-xl italic text-slate-600">{{ authorsName }}</span>
      </div>

      <div class="text-xl">{{}}</div>
      <div class="text-2xl font-bold">{{ poem.title }}</div>
      <div class="whitespace-pre-wrap text-lg">{{ poem.text }}</div>
      <div class="text-slate-500 self-end font">{{ poem.released }}</div>

      <div v-if="isPending" class="flex justify-center">
        <ProgressSpinner />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { usePoemQuery } from '../api/usePoemQuery'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import {
    faArrowLeft,
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

  const goBack = () => {
    router.back()
  }

  watch(
    data,
    (currentData) => {
      if (!data.value) return

      poem.value = currentData.data
      authorsName.value = `${poem.value.author.name} ${poem.value.author.surname}`
    },
    { immediate: true, deep: true }
  )
</script>

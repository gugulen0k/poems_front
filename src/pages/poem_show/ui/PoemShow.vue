<template>
  <div class="w-full h-full flex flex-col bg-white tablet:rounded-xl">
    <MobileSidebarMenu v-model="mobileSidebarVisible" />

    <div class="flex justify-between laptop:justify-end p-4 sticky">
      <Button variant="outlined">
        <template #icon>
          <FontAwesomeIcon :icon="emptyHeart" />
        </template>
      </Button>

      <Button class="laptop:hidden" @click="mobileSidebarVisible = true">
        <template #icon>
          <FontAwesomeIcon :icon="faBars" />
        </template>
      </Button>
    </div>

    <div v-if="isPending" class="flex justify-center">
      <ProgressSpinner />
    </div>

    <div v-else class="relative h-full mx-4 mb-4">
      <ScrollPanel
        class="absolute w-full h-full overflow-x-hidden top-0 left-0 tablet:left-2/4 tablet:-translate-x-2/4 laptop:left-1/2 laptop:-translate-x-1/2"
        :dt="{ bar: { background: '{primary.500}' } }"
      >
        <div class="flex flex-col gap-6 px-4 pb-4">
          <div class="flex flex-col gap-2 items-center">
            <div
              v-if="poem.author"
              class="w-full flex flex-col items-center gap-4"
            >
              <img :src="poem.author.image" class="rounded-full w-40" />
              <div class="w-32 h-32 rounded-full bg-primary-100">
                <FontAwesomeIcon :icon="faUser" />
              </div>
              <span class="text-xl italic text-slate-600">{{
                authorsName
              }}</span>
            </div>

            <div class="text-2xl text-center font-bold">{{ poem.title }}</div>
            <div class="mt-4 whitespace-pre-wrap text-lg">{{ poem.text }}</div>
            <div
              v-if="poem.released"
              class="text-slate-500 mt-8 text-lg text-right italic"
            >
              {{ poem.released }}
            </div>
          </div>

          <div class="bg-primary-100">Tags section</div>

          <div class="bg-primary-100">Related poems</div>
        </div>
      </ScrollPanel>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import {
    faBars,
    faUser,
    faHeart as filledHeart,
  } from '@fortawesome/free-solid-svg-icons'
  import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons'

  import { usePoemQuery } from '../api/usePoemQuery'
  import MobileSidebarMenu from '@/widgets/mobile-sidebar-menu'

  const router = useRouter()
  const route = useRoute()
  const { id } = route.params

  const poem = ref({})
  const authorsName = ref('')
  const { data, isPending } = usePoemQuery(id)

  const mobileSidebarVisible = ref(false)
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

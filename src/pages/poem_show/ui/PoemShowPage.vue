<template>
  <div class="w-full h-full flex flex-col bg-white tablet:rounded-xl">
    <MobileSidebarMenu v-model="mobileSidebarVisible" />

    <div class="p-4 sticky flex justify-between laptop:justify-end">
      <Button variant="outlined">
        <template #icon>
          <FontAwesomeIcon :icon="emptyHeart" />
        </template>
      </Button>

      <Button class="laptop:hidden" @click="(mobileSidebarVisible = true)">
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
        class="absolute w-full h-full overflow-hidden top-0 left-0 tablet:left-2/4 tablet:-translate-x-2/4 laptop:left-1/2 laptop:-translate-x-1/2"
        :dt="{ bar: { background: '{primary.500}' } }"
      >
        <div class="flex flex-col gap-6 px-4 pb-4">
          <div class="flex flex-col gap-2 items-center">
            <RouterLink
              v-if="poem.author"
              :to="`/authors/${poem.author.id}`"
              class="flex flex-col items-center gap-4 group hover:cursor-pointer"
            >
              <div
                v-if="poem.author.image"
                class="border-4 border-primary-700 rounded-full w-40 h-40 overflow-hidden shadow-lg transition-all duration-200 group-hover:border-red-400"
              >
                <img :src="poem.author.image" class="w-max" />
              </div>

              <div
                v-else
                class="w-40 h-40 border-4 border-primary-700 rounded-full bg-primary-100 flex justify-center items-center shadow-lg transition-all duration-200 group-hover:border-red-400"
              >
                <FontAwesomeIcon
                  :icon="faUser"
                  class="text-6xl text-primary-700"
                />
              </div>

              <div
                class="flex gap-2 text-xl italic text-primary-600 transition-all duration-200 group-hover:text-red-400 desktop:text-2xl"
              >
                <span>{{ poem.author.surname }}</span>
                <span>{{ poem.author.name }}</span>
                <span>{{ poem.author.patronymic }}</span>
              </div>
            </RouterLink>

            <div
              class="mt-10 text-primary-950 text-2xl desktop:text-3xl text-center font-bold"
            >
              {{ poem.title }}
            </div>
            <div
              class="w-1/2 flex justify-center mt-4 whitespace-pre-wrap text-primary-900 text-xl desktop:text-2xl"
            >
              <p>
                {{ poem.text }}
              </p>
            </div>
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
  import { useRouter, useRoute } from 'vue-router'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import {
    faBars,
    faUser,
    faHeart as filledHeart,
  } from '@fortawesome/free-solid-svg-icons'
  import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons'

  import { usePoemQuery } from '../api/usePoemQuery'
  import MobileSidebarMenu from '@/widgets/mobile-sidebar-menu'

  const mobileSidebarVisible = ref(false)

  const route = useRoute()
  const router = useRouter()
  const poemId = ref(route.params.poemId)

  const poem = ref({})
  const { data, isPending, isError } = usePoemQuery(poemId.value)

  watch(
    () => data.value, // Watch the reactive `data.value`
    (newData) => {
      if (!newData) return // Safeguard for null or undefined data

      poem.value = newData // Update the `poem` variable
    },
    { immediate: true } // Trigger the watcher immediately with the current value
  )

  watch(
    () => isError.value,
    (newValue) => {
      if (newValue === true) router.replace({ path: '/not-found' })
    }
  )
</script>

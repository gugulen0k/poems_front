<template>
  <div class="w-full h-full flex flex-col bg-white tablet:rounded-xl">
    <MobileSidebarMenu v-model="mobileSidebarVisible" />

    <div class="p-4 sticky flex justify-end">
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
        class="absolute w-full h-full overflow-x-hidden top-0 left-0 tablet:left-2/4 tablet:-translate-x-2/4 laptop:left-1/2 laptop:-translate-x-1/2"
        :dt="{ bar: { background: '{primary.500}' } }"
      >
        <div v-if="author" class="flex flex-col gap-2 justify-center">
          <div class="flex flex-col justify-center items-center gap-2 text-lg">
            <div
              v-if="author.image"
              class="border-4 border-primary-700 rounded-full w-40 h-40 overflow-hidden shadow-lg"
            >
              <img :src="author.image" class="w-max" />
            </div>

            <div
              v-else
              class="w-40 h-40 border-4 border-primary-700 rounded-full bg-primary-100 flex justify-center items-center shadow-lg"
            >
              <FontAwesomeIcon
                :icon="faUser"
                class="text-6xl text-primary-700"
              />
            </div>

            <div
              class="flex gap-1 flex-wrap justify-center text-2xl font-bold text-primary-800"
            >
              <span>{{ author.surname }}</span>
              <span>{{ author.name }}</span>
              <span>{{ author.patronymic }}</span>
            </div>

            <div class="flex flex-col justify-center">
              <div class="flex gap-2">
                <span class="text-primary-600 italic">Country:</span>
                <div class="flex gap-1">
                  <span>{{ author.country }}</span>
                </div>
              </div>

              <div class="flex gap-2">
                <span class="text-primary-600 italic">Birth Date:</span>
                <div class="flex gap-1">
                  <span>{{
                    dateFormatter.format(new Date(author.birth_date))
                  }}</span>
                </div>
              </div>

              <div v-if="author.death_date" class="flex gap-2">
                <span class="text-primary-600 italic">Death Date:</span>
                <div class="flex gap-1">
                  <span>{{
                    dateFormatter.format(new Date(author.death_date))
                  }}</span>
                </div>
              </div>
            </div>
          </div>

          <Divider />

          <div class="flex flex-col gap-4">
            <Button
              as="router-link"
              to="/poems"
              severity="secondary"
              class="w-max self-center text-2xl font-bold text-primary-500 hover:text-red-400"
              text
              @click="updatePoemsFilter"
            >
              <span>Author's poems</span>
              <FontAwesomeIcon :icon="faChevronRight" />
            </Button>

            <div
              class="flex flex-col gap-4 tablet:grid tablet:gap-4 tablet:justify-center tablet:grid-cols-[repeat(2,_minmax(22rem,_28rem))]"
            >
              <AuthorsPoemCard v-for="poem in author.poems" :poem="poem" />
            </div>
          </div>
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
    faChevronRight,
    faUser,
  } from '@fortawesome/free-solid-svg-icons'

  import MobileSidebarMenu from '@/widgets/mobile-sidebar-menu'
  import AuthorsPoemCard from './AuthorsPoemCard.vue'
  import { useAuthorQuery } from '../api/useAuthorQuery'
  import { dateFormatter } from '@/shared/lib/utils/date'
  import { useFiltersStore } from '@/shared/model/stores/useFiltersStore'
  import { POEMS_PAGE_ID } from '@/shared/lib/constants'

  const route = useRoute()
  const router = useRouter()
  const authorId = ref(route.params.authorId)

  const author = ref({})
  const { data, isPending, isError } = useAuthorQuery(authorId.value)

  const mobileSidebarVisible = ref(false)

  const filtersStore = useFiltersStore()
  const updatePoemsFilter = () => {
    const authorFullName = `${author.value.surname} ${author.value.name} ${author.value.patronymic}`

    filtersStore.updateFilters(POEMS_PAGE_ID, { author: authorFullName })
  }

  watch(
    () => data.value, // Watch the reactive `data.value`
    (newData) => {
      if (!newData) return // Safeguard for null or undefined data

      author.value = newData // Update the `poem` variable
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

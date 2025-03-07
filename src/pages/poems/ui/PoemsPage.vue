<template>
  <div
    v-motion-fade
    class="w-full h-full flex flex-col bg-white shadow-sm tablet:rounded-xl"
  >
    <div class="m-4 mb-0 laptop:hidden">
      <MobileSidebarMenu v-model="mobileSidebarVisible" />

      <div class="flex justify-between px-2">
        <Button @click="mobileFiltersVisible = true">
          <template #icon>
            <FontAwesomeIcon :icon="faFilter" />
          </template>
        </Button>

        <Button @click="mobileSidebarVisible = true">
          <template #icon>
            <FontAwesomeIcon :icon="faBars" />
          </template>
        </Button>
      </div>
    </div>

    <PoemsFilters v-model="mobileFiltersVisible" />

    <div v-if="isPending" class="flex justify-center">
      <ProgressSpinner />
    </div>

    <DataView
      v-else
      :value="poems"
      :pt="dataViewPassThroughOpts"
      class="relative h-full my-4 mx-2"
      layout="grid"
      @page="updatePagination"
    >
      <template #grid="slotProps">
        <ScrollPanel
          class="absolute top-0 left-0 w-full h-full overflow-x-hidden"
          :dt="{ bar: { background: '{primary.500}' } }"
        >
          <div
            class="overflow-x-hidden flex flex-col gap-4 px-4 tablet:p-4 tablet:grid tablet:justify-center tablet:gap-8 tablet:grid-cols-[repeat(auto-fit,_minmax(20rem,_28rem))]"
          >
            <PoemCard
              v-for="(item, index) in slotProps.items"
              :key="item.id"
              v-motion
              :poem="item"
              :initial="{ opacity: 0, x: 20 }"
              :enter="{ opacity: 1, x: 0 }"
              :delay="(index / 2) * 100"
              :duration="200"
            />
          </div>
        </ScrollPanel>
      </template>

      <template #empty>
        <div v-motion-fade-visible class="flex flex-col items-center py-14">
          <FontAwesomeLayers class="text-8xl">
            <FontAwesomeIcon :icon="faScroll" class="text-primary-200" />
            <FontAwesomeIcon
              :icon="faFeatherPointed"
              class="text-primary-400"
              transform="up-5 right-7 rotate-15 shrink-4"
            />
          </FontAwesomeLayers>

          <span class="text-6xl font-bold text-primary-500">No Poems</span>
        </div>
      </template>
    </DataView>

    <Paginator
      class="pb-2"
      :first="paginationState.startIndex"
      :rows="paginationState.itemsPerPage"
      :total-records="meta.total_items"
      @page="updatePagination"
    ></Paginator>
  </div>
</template>

<script setup>
  import { computed, watch, ref } from 'vue'
  import { usePaginationStore } from '@/shared/model/stores/usePaginationStore'
  import { useFiltersStore } from '@/shared/model/stores/useFiltersStore'
  import { POEMS_PAGE_ID } from '@/shared/lib/constants'
  import { usePoemsQuery } from '../api/usePoemsQuery'
  import {
    FontAwesomeIcon,
    FontAwesomeLayers,
  } from '@fortawesome/vue-fontawesome'
  import {
    faFeatherPointed,
    faScroll,
    faFilter,
    faBars,
  } from '@fortawesome/free-solid-svg-icons'

  import PoemCard from './PoemCard.vue'
  import MobileSidebarMenu from '@/widgets/mobile-sidebar-menu'
  import PoemsFilters from './PoemsFilters.vue'

  const dataViewPassThroughOpts = {
    header: {
      class: 'bg-transparent',
    },
    content: {
      class: 'bg-transparent',
    },
  }

  const mobileSidebarVisible = ref(false)
  const mobileFiltersVisible = ref(false)

  const paginationStore = usePaginationStore()
  const paginationState = computed(() =>
    paginationStore.paginationState(POEMS_PAGE_ID)
  )
  const updatePagination = (event) => {
    paginationStore.updatePagination(POEMS_PAGE_ID, {
      currentPage: event.page + 1,
      startIndex: event.first,
      itemsPerPage: event.rows,
    })
  }

  const filtersStore = useFiltersStore()
  const appliedFilters = computed(() =>
    filtersStore.getFiltersState(POEMS_PAGE_ID)
  )

  const poems = ref([])
  const meta = ref({})
  const { data, isPending } = usePoemsQuery(paginationState, appliedFilters)

  watch(
    data,
    (currentData) => {
      if (!data.value) return

      poems.value = currentData.data
      meta.value = currentData.meta
    },
    { immediate: true, deep: true }
  )
</script>

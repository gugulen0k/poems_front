<template>
  <div v-if="poems">
    <div
      class="grid gap-8 grid-cols-[repeat(4,_minmax(20rem,_1fr))] grid-rows-[repeat(5,_1fr)]"
    >
      <PoemSkeleton v-for="item in paginationState.itemsPerPage" :key="item" />
    </div>
  </div>

  <div v-else>
    <Paginator
      :first="paginationState.startIndex"
      :rows="paginationState.itemsPerPage"
      :total-records="meta.total_items"
      :rows-per-page-options="rowsPerPageOptions"
      @page="updatePagination"
    ></Paginator>
    <DataView
      :value="poems"
      :pt="dataViewPassThroughOpts"
      layout="grid"
      @page="updatePagination"
    >
      <template #grid="slotProps">
        <div
          class="grid justify-center gap-8 grid-cols-[repeat(auto-fit,_minmax(20rem,_1fr))]"
        >
          <PoemCard
            v-for="item in slotProps.items"
            :key="item.id"
            :poem="item"
          />
        </div>
      </template>

      <template #empty> No Poems </template>
    </DataView>
    <Paginator
      :first="paginationState.startIndex"
      :rows="paginationState.itemsPerPage"
      :total-records="meta.total_items"
      :rows-per-page-options="rowsPerPageOptions"
      @page="updatePagination"
    ></Paginator>
  </div>
</template>

<script setup>
  import { computed, watch, ref } from 'vue'
  import { usePaginationStore } from '@/shared/model/stores/usePaginationStore'
  import { PAGE_ID } from '../lib/constants'
  import { usePoemsQuery } from '../api/usePoemsQuery'

  import PoemSkeleton from './PoemSkeleton.vue'
  import PoemCard from './PoemCard.vue'

  const rowsPerPageOptions = ref([10, 20, 30])
  const dataViewPassThroughOpts = {
    header: {
      class: 'bg-transparent',
    },
    content: {
      class: 'bg-transparent',
    },
  }

  const paginationStore = usePaginationStore()
  const paginationState = computed(() =>
    paginationStore.paginationState(PAGE_ID)
  )
  const updatePagination = (event) => {
    paginationStore.updatePagination(PAGE_ID, {
      currentPage: event.page + 1,
      startIndex: event.first,
      itemsPerPage: event.rows,
    })
  }

  const poems = ref([])
  const meta = ref({})
  const { data, isPending } = usePoemsQuery(paginationState)

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

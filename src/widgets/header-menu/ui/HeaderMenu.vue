<template>
  <nav class="my-2">
    <div class="flex items-center">
      <div class="">
        <Button severity="secondary" @click="sidebarStore.toggleSidebar">
          <template #icon>
            <FontAwesomeIcon :icon="faBars" />
          </template>
        </Button>
      </div>
      <div class="m-auto">
        <Button text>
          <span class="text-xl font-semibold">VerseNest</span>
        </Button>
      </div>
      <div class="">
        <Avatar size="large" shape="circle">
          <template #icon>
            <FontAwesomeIcon class="text-slate-600" :icon="faUser" />
          </template>
        </Avatar>
      </div>
    </div>
  </nav>
</template>

<script setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { faBars, faUser } from '@fortawesome/free-solid-svg-icons'

  import { useSidebarStore } from '@/shared/model/stores/useSidebarStore'
  import { computed } from 'vue'

  const sidebarStore = useSidebarStore()
</script>

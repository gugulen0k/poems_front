<template>
  <div>
    <Button class="absolute z-10 tablet:hidden">
      <FontAwesomeIcon :icon="faBars" />
    </Button>

    <div
      v-motion
      :initial="{ opacity: 0, translateX: -100 }"
      :enter="{ opacity: 1, translateX: 0 }"
      :duration="200"
      class="hidden laptop:min-h-full laptop:max-w-full laptop:bg-primary laptop:px-4 laptop:flex laptop:items-center laptop:relative"
    >
      <Button class="absolute top-1 left-1" @click="sidebarStore.toggleSidebar">
        <template #icon>
          <FontAwesomeIcon
            v-motion
            :initial="{ rotateZ: 0 }"
            :tapped="{ rotateZ: -180 }"
            :icon="isOpen ? faArrowLeft : faArrowRight"
            class="text-xl"
          />
        </template>
      </Button>

      <div class="flex flex-col justify-center gap-4">
        <Button
          v-for="item in menuItems"
          :key="item.label"
          :class="[
            activeItem === item.label ? 'bg-primary-100 text-primary-800' : '',
            isOpen ? 'flex justify-start w-full' : '',
            'transition-all ease-out duration-200',
          ]"
          :aria-label="item.label"
          :to="item.route"
          as="router-link"
          fluid
          @click="updateSidebarState(item.label)"
        >
          <template #default>
            <div
              :class="[
                isOpen
                  ? 'grid gap-2 grid-cols-[max-content_1fr] items-center'
                  : 'flex justify-center items-center',
              ]"
            >
              <FontAwesomeIcon
                :icon="item.icon"
                :class="[isOpen ? 'text-xl' : 'text-2xl']"
              />
              <span v-if="isOpen" class="align-middle text-lg">{{
                item.label
              }}</span>
            </div>
          </template>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import {
    faArrowRight,
    faArrowLeft,
    faHamburger,
  } from '@fortawesome/free-solid-svg-icons'
  import { useSidebarStore } from '@/shared/model/stores/useSidebarStore'
  import { menuItems } from '../lib/menuItems'

  const sidebarStore = useSidebarStore()
  const isOpen = computed(() => sidebarStore.isOpen)
  const activeItem = computed(() => sidebarStore.activeItem)
  const updateSidebarState = (label) => {
    sidebarStore.setActiveItem(label)
  }

  const mobileSidebarVisible = ref(false)
</script>

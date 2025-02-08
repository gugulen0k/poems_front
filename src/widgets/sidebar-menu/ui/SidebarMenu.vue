<template>
  <div
    v-motion
    :initial="{ opacity: 0, translateX: -100 }"
    :enter="{ opacity: 1, translateX: 0 }"
    :duration="300"
    class="hidden laptop:h-full laptop:max-w-full laptop:bg-primary laptop:p-4 laptop:flex laptop:items-center laptop:relative"
  >
    <Button
      class="absolute top-1 -right-5"
      rounded
      severity="secondary"
      @click="sidebarStore.toggleSidebar"
    >
      <template #icon>
        <FontAwesomeIcon
          :icon="isOpen ? faArrowLeft : faArrowRight"
          class="text-xl"
        />
      </template>
    </Button>

    <div class="h-full flex flex-col justify-center items-center">
      <div class="flex gap-2 w-max">
        <FontAwesomeIcon :icon="faScroll" class="text-primary-50 text-3xl" />
        <span v-if="isOpen" class="text-primary-50 text-xl font-bold"
          >NestVerse</span
        >
      </div>

      <div class="my-auto flex flex-col justify-center gap-4">
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

      <Avatar v-if="isAuthenticated" :image="user.avatar">
        <template #icon>
          <FontAwesomeIcon :icon="faUser" class="text-lg" />
        </template>
      </Avatar>
      <Button
        v-else
        :label="isOpen ? 'Log In' : ''"
        class="text-lg"
        as="router-link"
        to="/login"
        fluid
      >
        <template #icon>
          <FontAwesomeIcon :icon="faUser" class="text-lg" />
        </template>
      </Button>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import {
    faArrowRight,
    faArrowLeft,
    faScroll,
    faUser,
  } from '@fortawesome/free-solid-svg-icons'
  import { useSidebarStore } from '@/shared/model/stores/useSidebarStore'
  import { useAuthStore } from '@/shared/model/stores/useAuthStore'
  import { menuItems } from '@/shared/lib/menuItems'

  const sidebarStore = useSidebarStore()
  const isOpen = computed(() => sidebarStore.isOpen)
  const activeItem = computed(() => sidebarStore.activeItem)
  const updateSidebarState = (label) => {
    sidebarStore.setActiveItem(label)
  }

  const authStore = useAuthStore()
  const user = computed(() => authStore.user)
  const isAuthenticated = computed(() => authStore.isAuthenticated)
</script>

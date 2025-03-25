<template>
  <div class="card flex justify-center">
    <Drawer v-model:visible="visibility" position="right">
      <template #container="{ closeCallback }">
        <div class="flex flex-col h-full">
          <div class="flex items-center justify-between px-6 pt-4 shrink-0">
            <span class="inline-flex items-center gap-2">
              <FontAwesomeIcon :icon="faScroll" class="text-2xl" />
              <span class="font-semibold text-2xl text-primary">VerseNest</span>
            </span>
            <span>
              <Button type="button" rounded outlined @click="closeCallback">
                <template #icon>
                  <FontAwesomeIcon :icon="faTimes" />
                </template>
              </Button>
            </span>
          </div>

          <div class="my-auto flex flex-col gap-4 px-4">
            <Button
              v-for="item in menuItemsList"
              :key="item.label"
              :class="[
                activeItem === item.itemName
                  ? 'bg-primary-100 text-primary-800'
                  : '',
                'transition-all ease-out duration-200',
              ]"
              :aria-label="item.label"
              :to="item.route"
              :label="item.label"
              as="router-link"
              fluid
            >
              <template #icon>
                <FontAwesomeIcon :icon="item.icon" class="text-xl" />
              </template>
            </Button>
          </div>
        </div>

        <div class="border-t border-primary-800/20 mx-4 p-0">
          <Menu
            id="user_menu"
            ref="userMenu"
            :model="userMenuItems"
            :popup="true"
          >
            <template #itemicon="{ item }">
              <FontAwesomeIcon :icon="item.icon" />
            </template>
          </Menu>
          <Button
            v-if="isAuthenticated"
            class="my-4 flex items-center gap-4"
            variant="text"
            fluid
            @click="toggle"
          >
            <Avatar
              :image="user.avatar"
              size="normal"
              shape="circle"
              class="bg-primary-100 ring-2 ring-primary-800"
            >
              <template v-if="!user.avatar" #icon>
                <FontAwesomeIcon :icon="faUser" class="text-lg" />
              </template>
            </Avatar>

            <span class="text-lg">{{
              user.nickname.length >= 10
                ? `${user.nickname.slice(0, 10)}...`
                : user.nickname
            }}</span>
          </Button>
          <Button
            v-else
            class="my-4 text-lg"
            severity="secondary"
            label="Log In"
            as="router-link"
            to="/login"
            fluid
          >
            <template #icon>
              <FontAwesomeIcon :icon="faArrowRightToBracket" />
            </template>
          </Button>
        </div>
      </template>
    </Drawer>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import {
    faArrowRightFromBracket,
    faArrowRightToBracket,
    faScroll,
    faTimes,
    faUser,
  } from '@fortawesome/free-solid-svg-icons'
  import { useSidebarStore } from '@/shared/model/stores/useSidebarStore'
  import { menuItems, authenticatedMenuItems } from '@/shared/lib/menuItems'
  import { useUserStore } from '@/shared/model/stores/useUserStore'

  const visibility = defineModel()
  const sidebarStore = useSidebarStore()
  const activeItem = computed(() => sidebarStore.activeItem)

  const userStore = useUserStore()
  const user = computed(() => userStore.user)
  const isAuthenticated = computed(() => userStore.isAuthenticated)

  const menuItemsList = computed(() => {
    if (isAuthenticated.value)
      return [...menuItems.value, ...authenticatedMenuItems.value]

    return menuItems.value
  })

  const userMenu = ref()
  const userMenuItems = ref([
    {
      label: 'Profile',
      icon: faUser,
      command: () => {},
    },
    {
      label: 'Log Out',
      icon: faArrowRightFromBracket,
      command: () => {
        userStore.removeUserData()
      },
    },
  ])

  const toggle = (event) => {
    userMenu.value.toggle(event)
  }
</script>

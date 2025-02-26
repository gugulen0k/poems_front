import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/pages'
import {
  isServerUp,
  updateServerStatus,
} from '@/shared/model/stores/serverStatus'
import { useUserStore } from '@/shared/model/stores/useUserStore'
import { computed } from 'vue'
import { useSidebarStore } from '@/shared/model/stores/useSidebarStore'
import {
  MENU_ITEM_AUTHORS,
  MENU_ITEM_POEMS,
  MENU_ITEM_FAVORITE,
} from '@/shared/lib/constants'

export const router = createRouter({
  history: createWebHistory(),
  routes,
  sensitive: true,
})

router.beforeEach(async (to, _from) => {
  await updateServerStatus()

  const userStore = useUserStore()
  const isUserAuthenticated = computed(() => userStore.isAuthenticated)

  const isAuthenticationPage = (page) => {
    return page === 'Login' || page === 'Register'
  }

  // Skip the server status check if the target route is 'ServerDown'
  if (to.name === 'ServerDown') {
    if (isServerUp.value) return { path: '/poems' }

    return // Allow navigation to the 'ServerDown' page
  }

  // Do not allow user access login or register pages if they're already logged in
  if (isUserAuthenticated.value && isAuthenticationPage(to.name)) {
    return { path: '/poems' }
  }

  if (!isUserAuthenticated.value && to.path === '/favorite') {
    return { path: '/poems' }
  }

  // Redirect to 'ServerDown' if the server is down
  if (!isServerUp.value) return { path: '/server-down' }

  // ================= [ Update sidebar active item] ==================
  // Update active status item based on url
  const sidebarStore = useSidebarStore()

  switch (to.path) {
    case '/':
      sidebarStore.setActiveItem(MENU_ITEM_POEMS)
      break
    case '/poems':
      sidebarStore.setActiveItem(MENU_ITEM_POEMS)
      break
    case '/authors':
      sidebarStore.setActiveItem(MENU_ITEM_AUTHORS)
      break
    case '/favorite':
      sidebarStore.setActiveItem(MENU_ITEM_FAVORITE)
      break
    default:
      sidebarStore.setActiveItem(null)
  }
})

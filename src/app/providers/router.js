import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/pages'
import {
  isServerUp,
  updateServerStatus,
} from '@/shared/model/stores/serverStatus'
import { useUserStore } from '@/shared/model/stores/useUserStore'
import { computed } from 'vue'

export const router = createRouter({
  history: createWebHistory(),
  routes,
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

  if (isUserAuthenticated.value && isAuthenticationPage(to.name)) {
    return { path: '/poems' }
  }

  // Redirect to 'ServerDown' if the server is down
  if (!isServerUp.value) return { path: '/server-down' }
})

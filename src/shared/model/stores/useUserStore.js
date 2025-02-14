import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref(null)
    const isAuthenticated = ref(false)

    function updateUserData(userData) {
      user.value = userData
      isAuthenticated.value = true
    }

    function removeUserData() {
      user.value = null
      isAuthenticated.value = false
    }

    return { user, isAuthenticated, updateUserData, removeUserData }
  },
  { persist: true }
)

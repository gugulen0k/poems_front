import axios from 'axios'
import { ref } from 'vue'
import { API_STATUS_URL } from '@/shared/lib/constants'

export const serverStatus = ref(true)

export const updateServerStatus = async () => {
  serverStatus.value = await checkServerStatus()
}

export const checkServerStatus = async () => {
  try {
    const response = await axios.get(API_STATUS_URL)

    return response.status === 200
  } catch (error) {
    return false
  }
}

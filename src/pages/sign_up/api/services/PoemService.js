import { axiosClient } from '@/shared/api/axiosClient'
import { BASE_API_URL } from '@/shared/lib/constants'

class PoemService {
  async fetchPoem(poemId) {
    return await axiosClient.get(`${BASE_API_URL}/poems/${poemId}`, {})
  }
}

export default new PoemService()

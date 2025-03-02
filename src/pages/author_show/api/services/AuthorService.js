import { axiosClient } from '@/shared/api/axiosClient'
import { BASE_API_URL } from '@/shared/lib/constants'

class AuthorService {
  async fetchAuthor(poemId) {
    return await axiosClient.get(`${BASE_API_URL}/authors/${poemId}`, {})
  }
}

export default new AuthorService()

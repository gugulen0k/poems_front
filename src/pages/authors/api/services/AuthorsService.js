import { axiosClient } from '@/shared/api/axiosClient'
import { BASE_API_URL } from '@/shared/lib/constants'

class AuthorsService {
  async fetchAuthors(page, itemsPerPage, filters) {
    return await axiosClient.get(`${BASE_API_URL}/authors`, {
      params: {
        page,
        items: itemsPerPage,
        ...filters,
      },
    })
  }
}

export default new AuthorsService()

import { axiosClient } from '@/shared/api/axiosClient'
import { BASE_API_URL } from '@/shared/lib/constants'

class FavoritePoemsService {
  async fetchFavoritePoems(page, itemsPerPage, filters) {
    return await axiosClient.get(`${BASE_API_URL}/favorite_poems`, {
      params: {
        page,
        items: itemsPerPage,
        ...filters,
      },
    })
  }
}

export default new FavoritePoemsService()

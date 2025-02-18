import { axiosClient } from '@/shared/api/axiosClient'
import { BASE_API_URL } from '@/shared/lib/constants'

class PoemsService {
  async fetchPoems(page, itemsPerPage, filters) {
    return await axiosClient.get(`${BASE_API_URL}/poems`, {
      params: {
        page,
        items: itemsPerPage,
        ...filters,
      },
    })
  }

  async randomPoem(page, itemsPerPage) {
    return await axiosClient.get(`${BASE_API_URL}/poems`, {
      params: {
        page,
        items: itemsPerPage,
      },
    })
  }
}

export default new PoemsService()

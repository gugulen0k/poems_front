import { axiosClient } from '@/shared/api/axiosClient'
import { BASE_AUTH_URL } from '@/shared/lib/constants'

class UserService {
  async login({ email, password }) {
    return await axiosClient.post(`${BASE_AUTH_URL}/login`, { email, password })
  }

  async register({ email, nickname, password }) {
    return await axiosClient.post(`${BASE_AUTH_URL}/register`, {
      email,
      nickname,
      password,
    })
  }
}

export default new UserService()

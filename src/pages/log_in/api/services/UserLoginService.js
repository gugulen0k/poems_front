import { axiosClient } from '@/shared/api/axiosClient'
import { BASE_AUTH_URL } from '@/shared/lib/constants'

class UserLoginService {
  async login({ email, password }) {
    return await axiosClient.post(`${BASE_AUTH_URL}/login`, {
      email: email,
      password: password,
    })
  }
}

export default new UserLoginService()

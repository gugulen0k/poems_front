import { useMutation } from '@tanstack/vue-query'
import UserLoginService from './services/UserLoginService'
import { USER_MUTATION_KEY } from '@/shared/lib/constants.js'
import { useUserStore } from '@/shared/model/stores/useUserStore'
import { router } from '@/app/providers'

const login = async (email, password) => {
  const response = await UserLoginService.login({ email, password })

  return response.data
}

const userStore = useUserStore()

export function useUserMutation() {
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationKey: [USER_MUTATION_KEY],
    mutationFn: (values) => login(values.email, values.password),
    onSuccess: (data) => {
      userStore.updateUserData(data.user)
      router.replace({ path: '/' })
    },
  })

  return { mutate, isSuccess, isPending, isError, error }
}

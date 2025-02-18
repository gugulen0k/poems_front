import { useMutation } from '@tanstack/vue-query'
import { USER_MUTATION_KEY } from '@/shared/lib/constants.js'
import { useUserStore } from '@/shared/model/stores/useUserStore'
import { router } from '@/app/providers'
import UserService from '@/shared/lib/services/UserService'

const register = async (values) => {
  const response = await UserService.register(values)

  return response.data
}

const userStore = useUserStore()

export function useRegisterMutation() {
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationKey: [USER_MUTATION_KEY],
    mutationFn: (values) => register(values),
    onSuccess: (data) => {
      userStore.updateUserData(data.user)
      router.replace({ path: '/' })
    },
  })

  return { mutate, isSuccess, isPending, isError, error }
}

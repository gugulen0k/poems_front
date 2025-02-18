import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { QUERY_KEY } from '../lib/constants.js'
import ObjectUtils from '@/shared/lib/utils/object'
import AuthorsService from './services/AuthorsService.js'

const fetchAuthors = async (page, itemsPerPage, filters) => {
  const apiFormattedFilters = ObjectUtils.convertKeysToSnakeCase(filters)

  const response = await AuthorsService.fetchAuthors(
    page,
    itemsPerPage,
    apiFormattedFilters
  )

  return response.data
}

export function useAuthorsQuery(pagination, filters) {
  const currentPage = computed(() => pagination.value.page)
  const itemsPerPage = computed(() => pagination.value.itemsPerPage)
  const appliedFilters = computed(() => filters.value)

  const { data, isSuccess, isPending, isError, error } = useQuery({
    queryKey: [QUERY_KEY, currentPage, filters],
    queryFn: () =>
      fetchAuthors(currentPage.value, itemsPerPage.value, appliedFilters.value),
    retry: 1,
  })

  return { data, isSuccess, isPending, isError, error }
}

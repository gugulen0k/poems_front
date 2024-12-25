import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { QUERY_KEY } from '../lib/constants.js'
import PoemsService from './services/PoemsService.js'
import ObjectUtils from '@/shared/lib/utils/object'

const fetchPoems = async (page, itemsPerPage, filters) => {
  const apiFormattedFilters = ObjectUtils.convertKeysToSnakeCase(filters)

  const response = await PoemsService.fetchPoems(
    page,
    itemsPerPage,
    apiFormattedFilters
  )

  return response.data
}

export function usePoemsQuery(pagination, filters) {
  const currentPage = computed(() => pagination.value.page)
  const itemsPerPage = computed(() => pagination.value.itemsPerPage)
  const appliedFilters = computed(() => filters.value)

  const { data, isSuccess, isPending, isError, error } = useQuery({
    queryKey: [QUERY_KEY, currentPage, filters],
    queryFn: () =>
      fetchPoems(currentPage.value, itemsPerPage.value, appliedFilters.value),
    retry: 1,
  })

  return { data, isSuccess, isPending, isError, error }
}

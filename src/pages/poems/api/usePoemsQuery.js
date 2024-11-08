import { useQuery } from '@tanstack/vue-query'
import { QUERY_KEY } from '../lib/constants.js'
import PoemsService from './services/PoemsService.js'
import { computed } from 'vue'

const fetchPoems = async (page, itemsPerPage, filters) => {
  //const apiFormattedFilters = ObjectUtils.formatKeysToSnakeCase(filters)
  const response = await PoemsService.fetchPoems(
    page,
    itemsPerPage,
    filters
    //apiFormattedFilters
  )

  return response.data
}

export function usePoemsQuery(pagination, filters = {}) {
  const currentPage = computed(() => pagination.value.page)
  const itemsPerPage = computed(() => pagination.value.itemsPerPage)

  const { data, isSuccess, isPending, isError, error } = useQuery({
    queryKey: [QUERY_KEY, currentPage, filters],
    queryFn: () => fetchPoems(currentPage.value, itemsPerPage.value, filters),
    retry: 1,
  })

  return { data, isSuccess, isPending, isError, error }
}

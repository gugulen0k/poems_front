import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { QUERY_KEY } from '../lib/constants.js'
import ObjectUtils from '@/shared/lib/utils/object'
import FavoritePoemsService from './services/FavoritePoemsService.js'

const fetchFavoritePoems = async (page, itemsPerPage, filters) => {
  const apiFormattedFilters = ObjectUtils.convertKeysToSnakeCase(filters)

  const response = await FavoritePoemsService.fetchFavoritePoems(
    page,
    itemsPerPage,
    apiFormattedFilters
  )

  return response.data
}

export function useFavoritePoemsQuery(pagination, filters) {
  const currentPage = computed(() => pagination.value.page)
  const itemsPerPage = computed(() => pagination.value.itemsPerPage)
  const appliedFilters = computed(() => filters.value)

  const { data, isSuccess, isPending, isError, error } = useQuery({
    queryKey: [QUERY_KEY, currentPage, filters],
    queryFn: () =>
      fetchFavoritePoems(
        currentPage.value,
        itemsPerPage.value,
        appliedFilters.value
      ),
  })

  return { data, isSuccess, isPending, isError, error }
}

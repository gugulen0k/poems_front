import { useQuery } from '@tanstack/vue-query'
import { POEMS } from '../lib/constants.js'
import PoemsService from './services/PoemsService.js'

/**
 * Fetch poems from the API.
 * @async
 * @param {number} page - The current page number.
 * @param {number} rows - The number of rows per page.
 * @param {object} filters - Object with applied filters.
 * @returns {Promise<object>} The poems data.
 */
const fetchPoems = async (page, rows, filters = {}) => {
  //const apiFormattedFilters = ObjectUtils.formatKeysToSnakeCase(filters)
  const response = await PoemsService.fetchPoems(
    page,
    rows,
    filters
    //apiFormattedFilters
  )

  return response.data
}

/**
 * Custom hook to fetch transactions data.
 *
 * This function uses the `useQuery` hook from TanStack Query to fetch transactions
 * based on the current page and the number of rows per page. It keeps the previous
 * data while fetching new data and retries once upon failure.
 * @param {object} currentPage - A reactive reference to the current page number.
 * @param {object} rowsPerPage - A reactive reference to the number of rows per page.
 * @param {object} filters - A reactive reference to the applied filters.
 * @returns {object} - The query state object containing:
 *   @property {object} data - A reactive reference to the fetched data, if available.
 *   @property {boolean} isPending - A reactive reference to a boolean indicating if the query is in a pending state.
 *   @property {boolean} isError - A reactive reference to a boolean indicating if there was an error in the query.
 *   @property {Error|null} error - A reactive reference to the error object, if any.
 */
export function useUserMetricsQuery(currentPage, rowsPerPage, filters) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: [USER_METRICS, currentPage, rowsPerPage, filters],
    queryFn: () =>
      fetchPoems(currentPage.value, rowsPerPage.value, filters.value),
  })

  return { data, isPending, isError, error }
}

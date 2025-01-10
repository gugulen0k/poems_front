import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

/**
 * Store managing pagination states for multiple pages.
 * Each page has its own pagination configuration with keys `page`, `startIndex`, and `itemsPerPage`.
 *
 * @typedef {Object} PaginationConfig
 * @property {number} page - The current page number.
 * @property {number} startIndex - The index of the first item on the current page.
 * @property {number} itemsPerPage - The number of items to display per page.
 */

export const usePaginationStore = defineStore(
  'pagination',
  () => {
    /**
     * Holds pagination configurations for different pages.
     * Each key represents a unique page identifier, with each value being a PaginationConfig.
     *
     * @type {Object.<string, PaginationConfig>}
     */
    const paginations = ref({})

    /**
     * Computes and retrieves the pagination state for a specific page.
     * Initializes the page with default pagination values if not already defined.
     *
     * @param {string} pageId - Unique identifier for the page.
     * @returns {PaginationConfig} - The pagination configuration for the specified page.
     */
    const paginationState = computed(() => (pageId) => {
      if (!paginations.value[pageId]) {
        paginations.value[pageId] = {
          page: 1,
          startIndex: 0,
          itemsPerPage: 20,
        }
      }

      return paginations.value[pageId]
    })

    /**
     * Updates the pagination configuration for a specified page.
     *
     * @param {string} pageId - Unique identifier for the page.
     * @param {Object} options - New pagination values.
     * @param {number} options.currentPage - The updated current page number.
     * @param {number} options.startIndex - The updated start index for items on this page.
     * @param {number} options.itemsPerPage - The updated number of items per page.
     */
    function updatePagination(
      pageId,
      { currentPage, startIndex, itemsPerPage }
    ) {
      paginations.value[pageId] = {
        page: currentPage,
        startIndex,
        itemsPerPage,
      }
    }

    return { paginations, paginationState, updatePagination }
  },
  { persist: true }
)

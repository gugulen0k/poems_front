import { useQuery } from '@tanstack/vue-query'
import { QUERY_KEY } from '../lib/constants.js'
import AuthorService from './services/AuthorService.js'

const fetchAuthor = async (authorId) => {
  const response = await AuthorService.fetchAuthor(authorId)

  return response.data
}

export function useAuthorQuery(authorId) {
  const { data, isSuccess, isPending, isError, error } = useQuery({
    queryKey: [QUERY_KEY, authorId],
    queryFn: () => fetchAuthor(authorId),
  })

  return { data, isSuccess, isPending, isError, error }
}

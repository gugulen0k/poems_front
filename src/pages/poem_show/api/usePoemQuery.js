import { useQuery } from '@tanstack/vue-query'
import { QUERY_KEY } from '../lib/constants.js'
import PoemService from './services/PoemService.js'

const fetchPoem = async (poemId) => {
  const response = await PoemService.fetchPoem(poemId)

  return response.data
}

export function usePoemQuery(poemId) {
  const { data, isSuccess, isPending, isError, error } = useQuery({
    queryKey: [QUERY_KEY, poemId],
    queryFn: () => fetchPoem(poemId),
  })

  return { data, isSuccess, isPending, isError, error }
}

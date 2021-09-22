import { useState } from 'react'
import { throttle } from 'lodash-es'
import { fetchAPI } from '../utils'

export const useTopic = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [topics, setTopics] = useState([])
  const [page, setPage] = useState(1)

  const fetchTopics = async (page, tab) => {
    const { data } = await fetchAPI(`/topics?tab=${tab}&page=${page}&limit=20`)
    return data
  }

  const load = async (tab) => {
    try {
      setIsLoading(true)
      const data = await fetchTopics(1, tab)
      setTopics(data)
      setPage(1)
    } finally {
      setIsLoading(false)
    }
  }

  const loadMore = throttle(async (tab) => {
    const toBottom =
      document.documentElement.scrollHeight -
      document.documentElement.scrollTop -
      document.documentElement.clientHeight
    // console.log('toBottom', toBottom)
    if (toBottom < 120 && !isLoadingMore && !isLoading) {
      try {
        setIsLoadingMore(true)
        const data = await fetchTopics(page + 1, tab)
        setTopics((topics) => [...topics, ...data])
        setPage((page) => page + 1)
      } finally {
        setIsLoadingMore(false)
      }
    }
  }, 500)

  return {
    isLoading,
    isLoadingMore,
    topics,
    load,
    loadMore,
  }
}

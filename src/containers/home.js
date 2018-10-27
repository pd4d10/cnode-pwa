import React, { useState, useEffect } from 'react'
import { Button, Slide } from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import { throttle } from 'lodash-es'
import { compose } from 'recompose'
import { Topic, Loading, HomeHeader } from '../components'
import { getCurrentTab, fetchAPI } from '../utils'

export const Home = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [topics, setTopics] = useState([])
  const [page, setPage] = useState(1)

  const fetchTopics = async page => {
    const tab = getCurrentTab(props.location)
    const { data } = await fetchAPI(`/topics?tab=${tab}&page=${page}&limit=20`)
    return data
  }

  const load = async () => {
    try {
      const nextPage = 1
      setIsLoading(true)
      const data = await fetchTopics(nextPage)
      setTopics(data)
      setPage(nextPage)
    } finally {
      setIsLoading(false)
    }
  }

  // TODO better infinity scrolling
  const loadMore = throttle(async () => {
    const toBottom =
      document.documentElement.scrollHeight -
      document.documentElement.scrollTop -
      document.documentElement.clientHeight
    // console.log('toBottom', toBottom)
    if (toBottom < 120 && !isLoadingMore && !isLoading) {
      try {
        const nextPage = page + 1
        setIsLoadingMore(true)
        const data = await fetchTopics(nextPage)
        setTopics([...topics, ...data])
        setPage(nextPage)
      } finally {
        setIsLoadingMore(false)
      }
    }
  }, 500)

  useEffect(
    () => {
      load()
      window.addEventListener('scroll', loadMore)
      return () => {
        window.removeEventListener('scroll', loadMore)
      }
    },
    [props.location.key],
  )

  // console.log(props.location.key)

  return (
    <div style={{ marginBottom: 84, marginTop: -48 }}>
      <HomeHeader />
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {topics.map((topic, index) => (
            <Topic {...topic} key={topic.id} />
          ))}
        </div>
      )}
      {isLoadingMore && <Loading />}
      <Button
        variant="fab"
        // color="secondary"
        style={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => {
          props.history.push('/post')
        }}
      >
        <Edit />
      </Button>
    </div>
  )
}

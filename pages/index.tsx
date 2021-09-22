import React, { useState, useEffect } from 'react'
import { Button, Slide } from '@mui/material'
import { Edit } from '@mui/icons-material'
import { Topic, Loading, HomeHeader } from '../src/components'
import { getCurrentTab } from '../src/utils'
import { useTopic } from '../src/hooks'

const Home = ({ location, history }) => {
  const { topics, isLoading, isLoadingMore, load, loadMore } = useTopic()

  // const tab = getCurrentTab(location)

  // useEffect(() => {
  //   console.log(topics)
  //   if (topics.length === 0) {
  //     load(tab)
  //   }
  // }, [location.key])

  // const handleLoadMore = () => loadMore(tab)

  // useEffect(() => {
  //   window.addEventListener('scroll', handleLoadMore)
  //   return () => {
  //     window.removeEventListener('scroll', handleLoadMore)
  //   }
  // }, [])

  // console.log(location.key)

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
          history.push('/post')
        }}
      >
        <Edit />
      </Button>
    </div>
  )
}

export default Home

import React, { useEffect } from 'react'
import useSWRInfinite from 'swr/infinite'
import { Topic, Loading, HomeHeader } from '../src/components'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { fetchAPI } from '../src/utils'
import { TopicProps } from '../src/components/topic'

const Home: NextPage = () => {
  const router = useRouter()
  const tab = router.query.tab ?? 'all'

  const fetcher = (url: string) => fetchAPI(url).then((json) => json.data)

  const { data, error, isValidating, size, setSize } = useSWRInfinite<
    TopicProps[]
  >(
    (index, previousPageData) => {
      if (previousPageData && !previousPageData.length) return null
      return `/topics?tab=${tab}&page=${index}&limit=20`
    },
    fetcher,
    {},
  )

  const handleScroll = () => {
    const toBottom =
      document.documentElement.scrollHeight -
      document.documentElement.scrollTop -
      document.documentElement.clientHeight
    // console.log('toBottom', toBottom)
    if (toBottom < 120 && !isValidating) {
      setSize(size + 1)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div style={{ marginBottom: 84, marginTop: -48 }}>
      <HomeHeader
        tab={tab as string} // TODO
      />
      {!data ? (
        <Loading />
      ) : (
        <div>
          {data.flat().map((topic) => (
            <Topic {...topic} key={topic.id} />
          ))}
        </div>
      )}
      {isValidating && <Loading />}
      {/* <Button
        style={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => {
          router.push('/post')
        }}
      >
        <Edit />
      </Button> */}
    </div>
  )
}

export default Home

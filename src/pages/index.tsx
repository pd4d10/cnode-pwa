import { useEffect } from 'react'
import useSWRInfinite from 'swr/infinite'
import { Topic, Loading } from '../components'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { fetchAPI } from '../utils'
import { TopicProps } from '../components/topic'
import { Badge, List, NavBar, Space, Tabs } from 'antd-mobile'
import { BellOutline, UserOutline } from 'antd-mobile-icons'
import { useAuth } from '../hooks/auth'
import { Header } from '../components/header'

const Home: NextPage = () => {
  const router = useRouter()
  const tab = router.query.tab ?? 'all'
  const { count, loginname } = useAuth()

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
    <div>
      <Header
        backArrow={false}
        right={
          <Space>
            <Link href="/message">
              {count ? (
                <Badge content={count}>
                  <BellOutline />
                </Badge>
              ) : (
                <BellOutline />
              )}
            </Link>
            <Link href={loginname ? `/user/${loginname}` : '/login'}>
              <UserOutline />
            </Link>
          </Space>
        }
      >
        CNode
      </Header>
      <Tabs
        onChange={(key) => {
          router.push(key === 'all' ? '/' : '/?tab=' + key)
        }}
      >
        {[
          { id: 'all', title: '全部' },
          { id: 'good', title: '精华' },
          { id: 'share', title: '分享' },
          { id: 'ask', title: '问答' },
          { id: 'job', title: '招聘' },
        ].map(({ id, title }) => (
          <Tabs.TabPane title={title} key={id} />
        ))}
      </Tabs>

      {!data ? (
        <Loading />
      ) : (
        <List>
          {data.flat().map((topic) => (
            <Topic {...topic} key={topic.id} />
          ))}
        </List>
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

import { definePage } from '@norm/client'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { fetchAPI } from '@/utils'
import { Topic, TopicProps } from '@/components/topic'
import { Badge, InfiniteScroll, List, Space, Tabs } from 'antd-mobile'
import { BellOutline, UserOutline } from 'antd-mobile-icons'
import { useAuth } from '@/hooks/auth'
import { Header } from '@/components/header'
import { useInfiniteQuery } from 'react-query'
import { Loading } from '@/components/loading'

export default definePage(() => {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get('tab') ?? 'all'
  const navigate = useNavigate()

  const { count, loginname } = useAuth()

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<{
    data: TopicProps[]
    cursor: number
  }>(
    ['topics', tab],
    async ({ pageParam = 1 }) => {
      const json = await fetchAPI(
        `/topics?mdrender=false&tab=${tab}&page=${pageParam}&limit=20`
      )
      json.cursor = pageParam + 1
      return json
    },
    {
      getNextPageParam: (lastPage) => lastPage.cursor,
    }
  )

  return (
    <div>
      <Header
        backArrow={false}
        right={
          <Space>
            <Link to="/message">
              {count ? (
                <Badge content={count}>
                  <BellOutline />
                </Badge>
              ) : (
                <BellOutline />
              )}
            </Link>
            <Link to={loginname ? `/user/${loginname}` : '/login'}>
              <UserOutline />
            </Link>
          </Space>
        }
      >
        CNode
      </Header>
      <Tabs
        onChange={(key) => {
          navigate(key === 'all' ? '/' : '/?tab=' + key)
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
          {data.pages
            .map((page) => {
              return page.data.map((topic) => {
                return <Topic {...topic} key={topic.id} />
              })
            })
            .flat()}
        </List>
      )}
      <InfiniteScroll
        loadMore={async () => {
          await fetchNextPage()
        }}
        hasMore={hasNextPage}
      />

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
})

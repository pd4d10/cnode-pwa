import { Tabs, List } from 'antd-mobile'
import { SendOutline } from 'antd-mobile-icons'
import { definePage, useRouter } from '@norm/app'
import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { fetchAPI, shareCurrentUrl } from '@/utils'
import { UserTopic } from '@/components/topic'
import { NoMore } from '@/components/no-more'
import { Loading } from '@/components/loading'
import { AvatarRow } from '@/components/avatar'
import { TimeAgo } from '@/components/timeago'

export default definePage(() => {
  const router = useRouter<{ loginname: string }>()
  const [author, setAuthor] = useState(null)
  const [tabKey, setTabKey] = useState('0')
  const [tabData, setTabData] = useState([[], [], []])

  useEffect(() => {
    const init = async () => {
      const { loginname } = router.params
      if (!loginname) return

      const [{ data }, { data: collectData }] = await Promise.all([
        fetchAPI(`/user/${loginname}`),
        fetchAPI(`/topic_collect/${loginname}`),
      ])
      setAuthor(data)
      setTabData([data.recent_replies, data.recent_topics, collectData])
    }

    init()
  }, [router.params.loginname])

  return (
    <div>
      <Header
        right={
          <SendOutline
            onClick={() => {
              shareCurrentUrl(author ? author.loginname : '')
            }}
          />
        }
      >
        用户
      </Header>
      {author ? (
        <div>
          <AvatarRow author={author} style={{ padding: 16 }}>
            <div>{author.loginname}</div>
            <div>
              <TimeAgo text="创建于" time={author.create_at} />
            </div>
          </AvatarRow>
          <Tabs
            activeKey={tabKey}
            onChange={(key) => {
              setTabKey(key)
            }}
          >
            {['最近参与', '最近发布', '话题收藏'].map((title, index) => {
              return <Tabs.TabPane title={title} key={index} />
            })}
          </Tabs>
          <List>
            {tabData[tabKey].map((topic) => (
              <UserTopic key={topic.id} {...topic} />
            ))}
          </List>
          <NoMore />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  )
})

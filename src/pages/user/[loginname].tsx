import { Tabs, List } from 'antd-mobile'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import {
  Header,
  UserTopic,
  NoMore,
  Loading,
  ShareTo,
  AvatarRow,
  TimeAgo,
} from '../../components'
import { fetchAPI } from '../../utils'

const User: NextPage = (props) => {
  const router = useRouter()
  const [author, setAuthor] = useState(null)
  const [tabKey, setTabKey] = useState('0')
  const [tabData, setTabData] = useState([[], [], []])

  useEffect(() => {
    const init = async () => {
      const { loginname } = router.query
      if (!loginname) return

      const [{ data }, { data: collectData }] = await Promise.all([
        fetchAPI(`/user/${loginname}`),
        fetchAPI(`/topic_collect/${loginname}`),
      ])
      setAuthor(data)
      setTabData([data.recent_replies, data.recent_topics, collectData])
    }

    init()
  }, [router.query.loginname])

  return (
    <div>
      <Header
        title="用户"
        rightWidget={() => <ShareTo text={author ? author.loginname : ''} />}
      />
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
}

export default User

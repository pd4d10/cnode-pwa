import React, { useState, useEffect } from 'react'
import { Tabs, Tab } from '@material-ui/core'
import {
  Header,
  UserTopic,
  NoMore,
  Loading,
  ShareTo,
  AvatarRow,
  TimeAgo,
} from '../components'
import { fetchAPI } from '../utils'

export const User = props => {
  const [author, setAuthor] = useState(null)
  const [tabIndex, setTabIndex] = useState(0)
  const [tabData, setTabData] = useState([[], [], []])

  const fetchUser = async () => {
    const { loginname } = props.match.params
    const [{ data }, { data: collectData }] = await Promise.all([
      fetchAPI(`/user/${loginname}`),
      fetchAPI(`/topic_collect/${loginname}`),
    ])
    setAuthor(data)
    setTabData([data.recent_replies, data.recent_topics, collectData])
  }

  useEffect(
    () => {
      fetchUser()
    },
    [props.match.params],
  )

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
            style={{ background: '#fff' }}
            value={tabIndex}
            onChange={(_, index) => {
              setTabIndex(index)
            }}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="最近参与" />
            <Tab label="最近发布" />
            <Tab label="话题收藏" />
          </Tabs>
          <div>
            {tabData[tabIndex].map(topic => (
              <UserTopic key={topic.id} {...topic} />
            ))}
          </div>
          <NoMore />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  )
}

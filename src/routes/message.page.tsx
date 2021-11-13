import { useState, useEffect, FC } from 'react'
import { definePage } from '@norm/client'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/auth'
import { colors, fetchAPI } from '@/utils'
import { CheckOutline } from 'antd-mobile-icons'
import { Header } from '@/components/header'
import { List, Toast } from 'antd-mobile'
import { Loading } from '@/components/loading'
import { NoMore } from '@/components/no-more'
import { AvatarRow } from '@/components/avatar'
import { Title } from '@/components/styled'

const MessageItem: FC<any> = (props) => {
  const navigate = useNavigate()
  return (
    <List.Item
      onClick={() => {
        navigate(`/topic/${props.topic.id}`)
      }}
      style={props.has_read ? {} : { background: '#f4fcf0' }}
    >
      <AvatarRow author={props.author}>
        <div style={{ fontSize: 14, color: '#aaa' }}>
          <span style={{ color: colors.tag }}>{props.author.loginname}</span>{' '}
          回复了你的话题
        </div>
        <Title>{props.topic.title}</Title>
      </AvatarRow>
    </List.Item>
  )
}

export default definePage(() => {
  const [unread, setUnread] = useState([])
  const [read, setRead] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { token } = useAuth()

  const updateMessages = async () => {
    setIsLoading(true)
    try {
      const { data } = await fetchAPI('/messages?accesstoken=' + token)
      setUnread(data.hasnot_read_messages)
      setRead(data.has_read_messages)
    } finally {
      setIsLoading(false)
    }
  }

  const markAllAsRead = async () => {
    await fetchAPI('/message/mark_all', {
      accesstoken: token,
    })
  }

  useEffect(() => {
    // this.props.runAfterTokenVerified(this.props.fetchMessages)

    if (token) {
      updateMessages()
    }
  }, [])

  if (!token) {
    // return <Redirect to="/login" /> // TODO:
  }

  return (
    <div>
      <Header
        right={
          <CheckOutline
            onClick={async () => {
              await markAllAsRead()
              Toast.show('已标记全部消息为已读')
              await updateMessages()
            }}
          ></CheckOutline>
        }
      >
        消息
      </Header>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {unread.map((message) => (
            <MessageItem key={message.id} {...message} />
          ))}
          {read.map((message) => (
            <MessageItem key={message.id} {...message} />
          ))}
          <NoMore />
        </>
      )}
    </div>
  )
})

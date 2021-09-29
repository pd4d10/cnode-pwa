import { useState, useEffect, FC } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../hooks/auth'
import { fetchAPI } from '../utils'
import { MessageItem, Loading, NoMore } from '../components'
import { CheckOutline } from 'antd-mobile-icons'
import { Header } from '../components/header'
import { Toast } from 'antd-mobile'

const Message: FC = (props) => {
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
}

export default Message

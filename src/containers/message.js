import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import { DoneAll } from '@material-ui/icons'
import { useAuth, useHint } from '../hooks'
import { fetchAPI } from '../utils'
import { MessageItem, Header, Loading, NoMore } from '../components'

export const Message = props => {
  const [unread, setUnread] = useState([])
  const [read, setRead] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { token } = useAuth()
  const { show } = useHint()

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
    return <Redirect to="/login" />
  }

  return (
    <div>
      <Header
        title="消息"
        rightWidget={() => (
          <IconButton
            color="default"
            onClick={async () => {
              await markAllAsRead()
              show('已标记全部消息为已读')
              await updateMessages()
            }}
          >
            <DoneAll />
          </IconButton>
        )}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {unread.map(message => (
            <MessageItem key={message.id} {...message} />
          ))}
          {read.map(message => (
            <MessageItem key={message.id} {...message} />
          ))}
          <NoMore />
        </>
      )}
    </div>
  )
}

import React from 'react'
import { Redirect } from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import { compose } from 'recompose'
import { DoneAll } from '@material-ui/icons'
import { AuthConsumer } from '../contexts'
import { withContext } from '../utils'
import { MessageItem, Header } from '../components'

class Message extends React.Component {
  componentDidMount() {
    // this.props.runAfterTokenVerified(this.props.fetchMessages)
    if (this.props.token) this.props.fetchMessages()
  }

  render() {
    return this.props.token ? (
      <div>
        <Header
          title="消息"
          rightWidget={() => (
            <IconButton
              color="default"
              onClick={() => {
                this.props.markAllAsRead()
              }}
            >
              <DoneAll />
            </IconButton>
          )}
        />
        {this.props.unreadMessages.map(message => (
          <MessageItem key={message.id} {...message} />
        ))}
        {this.props.readMessages.map(message => (
          <MessageItem key={message.id} {...message} />
        ))}
      </div>
    ) : (
      <Redirect to="/login" />
    )
  }
}

export default withContext(AuthConsumer)(Message)

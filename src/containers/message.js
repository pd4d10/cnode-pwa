import React from 'react'
import { withRouter } from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import { DoneAll } from '@material-ui/icons'
import { withContext, AuthConsumer } from '../contexts'
import { MessageItem, Header } from '../components'

class Message extends React.Component {
  componentDidMount() {
    this.props.runAfterTokenVerified(this.props.fetchMessages)
    // this.props.fetchMessages()
  }

  render() {
    return (
      <div>
        <Header
          title="消息"
          rightWidget={() => (
            <IconButton
              color="inherit"
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
    )
  }
}

export default withRouter(withContext(AuthConsumer)(Message))

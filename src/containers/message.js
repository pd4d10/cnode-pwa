import React from 'react'
import { withRouter } from 'react-router-dom'
import { withContext, AuthConsumer } from '../contexts'
import { MessageItem } from '../components'

class Message extends React.Component {
  componentDidMount() {
    this.props.runAfterTokenVerified(this.props.fetchMessages)
    // this.props.fetchMessages()
  }

  render() {
    return (
      <div>
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

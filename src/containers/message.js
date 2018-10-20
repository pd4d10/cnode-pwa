import React from 'react'
import { Redirect } from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import { compose } from 'recompose'
import { DoneAll } from '@material-ui/icons'
import { AuthConsumer, HintConsumer } from '../contexts'
import { withContext } from '../utils'
import { MessageItem, Header, Loading, NoMore } from '../components'

class Message extends React.Component {
  state = {
    unread: [],
    read: [],
    isLoading: false,
  }

  componentDidMount() {
    // this.props.runAfterTokenVerified(this.props.fetchMessages)
    if (this.props.token) {
      this.updateMessages()
    }
  }

  updateMessages = async () => {
    this.setState({ isLoading: true })
    try {
      const data = await this.props.fetchMessages()
      this.setState({
        unread: data.hasnot_read_messages,
        read: data.has_read_messages,
      })
    } finally {
      this.setState({ isLoading: false })
    }
  }

  render() {
    if (!this.props.token) {
      return <Redirect to="/login" />
    }

    return (
      <div>
        <HintConsumer>
          {({ show }) => (
            <Header
              title="消息"
              rightWidget={() => (
                <IconButton
                  color="default"
                  onClick={async () => {
                    await this.props.markAllAsRead()
                    show('已标记全部消息为已读')
                    await this.updateMessages()
                  }}
                >
                  <DoneAll />
                </IconButton>
              )}
            />
          )}
        </HintConsumer>
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <>
            {this.state.unread.map(message => (
              <MessageItem key={message.id} {...message} />
            ))}
            {this.state.read.map(message => (
              <MessageItem key={message.id} {...message} />
            ))}
            <NoMore />
          </>
        )}
      </div>
    )
  }
}

export default withContext(AuthConsumer)(Message)

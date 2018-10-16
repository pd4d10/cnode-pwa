// @flow
import React from 'react'
import { fetchAPI } from '../utils'

const { Consumer, Provider } = React.createContext()

export const AuthConsumer = Consumer

type AuthState = {
  token: ?string,
}

export class AuthProvider extends React.Component<any, AuthState> {
  state = {
    token: null,
    count: 0,
    unreadMessages: [],
    readMessages: [],
  }

  async componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      await this.verifyToken(token)
    }
  }

  queueAfterToken = []

  runAfterTokenVerified = callback => {
    this.queueAfterToken.push(callback)
  }

  verifyToken = async token => {
    try {
      const { id, loginname, avatar_url } = await fetchAPI('/accesstoken', {
        accesstoken: token,
      })
      this.setState({ token })
      this.fetchUnreadCount(token)
      localStorage.setItem('token', token)
      // this.queueAfterToken.forEach(callback => callback())
      // this.queueAfterToken = []
      return true
    } catch (err) {
      return false
    }
  }

  fetchUnreadCount = async token => {
    const { data } = await fetchAPI('/message/count?accesstoken=' + token)
    this.setState({ count: data })
    setTimeout(() => {
      this.fetchUnreadCount(token)
    }, 10000)
  }

  fetchMessages = async () => {
    const { data } = await fetchAPI('/messages?accesstoken=' + this.state.token)
    this.setState({
      unreadMessages: data.hasnot_read_messages,
      readMessages: data.has_read_messages,
    })
  }

  markAllAsRead = async () => {
    await fetchAPI('/message/mark_all', {
      accesstoken: this.state.token,
    })
    this.fetchMessages()
  }

  render() {
    const { token, count, unreadMessages, readMessages } = this.state
    const {
      fetchUnreadCount,
      fetchMessages,
      runAfterTokenVerified,
      markAllAsRead,
      verifyToken,
    } = this
    return (
      <Provider
        value={{
          token,
          count,
          unreadMessages,
          readMessages,
          fetchUnreadCount,
          fetchMessages,
          runAfterTokenVerified,
          markAllAsRead,
          verifyToken,
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

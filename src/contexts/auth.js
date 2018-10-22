import React from 'react'
import { fetchAPI } from '../utils'

const { Consumer, Provider } = React.createContext()

export const AuthConsumer = Consumer

export class AuthProvider extends React.Component {
  state = {
    token: null,
    loginname: null,
    count: 0,
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
      this.setState({ token, loginname })
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
    return data
  }

  markAllAsRead = async () => {
    await fetchAPI('/message/mark_all', {
      accesstoken: this.state.token,
    })
  }

  postTopic = async ({ title, tab, content }) => {
    const { topic_id } = await fetchAPI('/topics', {
      title,
      tab: 'dev', // for test
      // tab,
      content,
      accesstoken: this.state.token,
    })
    return topic_id
  }

  render() {
    const { token, loginname, count } = this.state
    const {
      fetchUnreadCount,
      fetchMessages,
      runAfterTokenVerified,
      markAllAsRead,
      verifyToken,
      postTopic,
    } = this
    return (
      <Provider
        value={{
          token,
          loginname,
          count,
          fetchUnreadCount,
          fetchMessages,
          runAfterTokenVerified,
          markAllAsRead,
          verifyToken,
          postTopic,
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

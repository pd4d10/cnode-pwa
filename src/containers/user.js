// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { withRouter } from 'react-router-dom'
import Topic from '../components/topic'
import { fetchAPI } from '../utils'
import type { Author } from './detail'

type RecentTopics = {
  id: string,
  author: Author,
  title: string,
  last_reply_at: string,
}

type UserState = {
  data: ?{
    loginname: string,
    avatar_url: string,
    githubUsername: string,
    create_at: string,
    score: number,
    recent_topics: RecentTopics[],
    recent_replies: RecentTopics[],
  },
  isLoading: boolean,
}

class User extends React.Component<{}, UserState> {
  state = {
    data: null,
    isLoading: false,
  }

  fetchUser = async () => {
    const { data } = await fetchAPI(`/user/${this.props.params.name}`)
    this.setState({ data })
  }

  componentDidMount() {
    this.fetchUser()
  }

  render() {
    const { data, isLoading } = this.state
    return (
      <div>
        {isLoading ? (
          <div />
        ) : (
          data && (
            <div>
              <img src={data.avatar_url} alt={data.loginname} />
              <Tabs>
                <Tab label="近期帖子">
                  <ul>
                    {data.recent_topics.map(topic => (
                      <Topic />
                    ))}
                  </ul>
                </Tab>
                <Tab label="近期参与">
                  <ul>
                    {data.recent_replies.map(topic => (
                      <Topic />
                    ))}
                  </ul>
                </Tab>
              </Tabs>
            </div>
          )
        )}
      </div>
    )
  }
}

export default withRouter(User)

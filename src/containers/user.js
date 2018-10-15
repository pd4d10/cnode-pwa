// @flow
import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { withRouter } from 'react-router-dom'
import { Topic } from '../components'
import { fetchAPI } from '../utils'
import * as types from '../types'

type UserState = {
  data: ?types.User,
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

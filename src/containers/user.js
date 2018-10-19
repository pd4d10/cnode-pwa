// @flow
import React from 'react'
import { Tabs, Tab } from '@material-ui/core'
import { Header, UserTopic } from '../components'
import { fetchAPI } from '../utils'
import * as types from '../types'

type UserState = {
  data: types.User,
  isLoading: boolean,
}

class User extends React.Component<{}, UserState> {
  state = {
    data: null,
    isLoading: false,
    tabIndex: 0,
    tabData: [[], [], []],
  }

  fetchUser = async () => {
    const { loginname } = this.props.match.params
    const [{ data }, { data: collectData }] = await Promise.all([
      fetchAPI(`/user/${loginname}`),
      fetchAPI(`/topic_collect/${loginname}`),
    ])
    this.setState({
      data,
      tabData: [data.recent_replies, data.recent_topics, collectData],
    })
  }

  componentDidMount() {
    this.fetchUser()
  }

  render() {
    const { data, collectData, isLoading } = this.state
    return (
      <div>
        {isLoading ? (
          <div />
        ) : (
          data && (
            <div>
              <img src={data.avatar_url} alt={data.loginname} />
              <Tabs
                style={{ background: '#fff' }}
                value={this.state.tabIndex}
                onChange={(_, index) => {
                  this.setState({ tabIndex: index })
                }}
                indicatorColor="primary"
                textColor="primary"
                fullWidth
              >
                <Tab label="最近参与" />
                <Tab label="最近发布" />
                <Tab label="话题收藏" />
              </Tabs>
              <div>
                {this.state.tabData[this.state.tabIndex].map(topic => (
                  <UserTopic key={topic.id} {...topic} />
                ))}
              </div>
              <div>-- 没有更多了 --</div>
            </div>
          )
        )}
      </div>
    )
  }
}

export default User

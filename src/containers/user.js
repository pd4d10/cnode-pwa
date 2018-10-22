import React from 'react'
import { Tabs, Tab } from '@material-ui/core'
import {
  Header,
  UserTopic,
  NoMore,
  Loading,
  ShareTo,
  AvatarRow,
  TimeAgo,
} from '../components'
import { fetchAPI } from '../utils'

class User extends React.Component {
  state = {
    data: null,
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

  componentDidUpdate(prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      // reload data when switch to another user
      this.fetchUser()
    }
  }

  render() {
    const { data, collectData } = this.state
    return (
      <div>
        <Header
          title="用户"
          rightWidget={() => <ShareTo text={data ? data.loginname : ''} />}
        />
        {data ? (
          <div>
            <AvatarRow author={data} style={{ padding: 16 }}>
              <div>{data.loginname}</div>
              <div>
                <TimeAgo text="创建于" time={data.create_at} />
              </div>
            </AvatarRow>
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
            <NoMore />
          </div>
        ) : (
          <Loading />
        )}
      </div>
    )
  }
}

export default User

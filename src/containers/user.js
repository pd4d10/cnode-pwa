import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { withRouter } from 'react-router-dom'
import { fetchUser } from '../actions/user'
import Topic from '../components/topic'

class User extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUser(this.props.params.name))
  }

  render() {
    const { data, isLoading } = this.props
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

User.propTypes = {
  params: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    // eslint-disable-line
    avatar_url: PropTypes.string.isRequired,
    loginname: PropTypes.string.isRequired,
  }),
  isLoading: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = state => state.user

export default withRouter(connect(mapStateToProps)(User))

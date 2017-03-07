import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { CircularProgress } from 'material-ui'
// import { compose, pick } from 'lodash/fp'
import { fetchUser } from '../../actions/user'
// import Topic from '../components/topic'

const mapStateToProps = state => state.user

class User extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUser(this.props.params.name))
  }

  render() {
    const { data, isFetching } = this.props
    return (
      <div>
        {isFetching ? <CircularProgress /> : (data && (
          <div>
            <img src={data.avatar_url} alt={data.loginname} />
          </div>
        ))}
      </div>
    )
  }
}

User.propTypes = {
  params: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({ // eslint-disable-line
    avatar_url: PropTypes.string.isRequired,
    loginname: PropTypes.string.isRequired,
  }),
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(User)

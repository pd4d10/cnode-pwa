import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { CircularProgress } from 'material-ui'
import Container from '../../components/container'
import { fetchUser } from '../../actions/user'

const mapStateToProps = state => state.user

class User extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUser(this.props.params.name))
  }

  render() {
    const { data, isFetching } = this.props
    return (
      <Container title="用户">
        {isFetching ? <CircularProgress /> : (data && (
          <div>
            <img src={data.avatar_url} alt={data.loginname} />
          </div>
        ))}
      </Container>
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

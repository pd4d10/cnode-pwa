import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => state.login

class Login extends Component {
  componentDidMount() {
    // this.props.dispatch(fetchTopics())
    this.handleSubmit = () => {}
    this.handleChange = () => {}
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.props.input} onChange={this.handleChange} />
      </form>
    )
  }
}

Login.propTypes = {
  input: PropTypes.string.isRequired,
}

export default connect(mapStateToProps)(Login)

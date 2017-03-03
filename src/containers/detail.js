import React, { Component, PropTypes } from 'react'
// import { connect } from 'react-redux'
// import { compose, pick } from 'lodash/fp'
// import { fetchTopics } from '../actions/detail'
// import Topic from '../components/topic'

class Detail extends Component {
  componentDidMount() {
    // this.props.dispatch(fetchTopics())
  }

  render() {
    // const { topics } = this.props
    return (
      <div />
    )
  }
}

Detail.PropTypes = {
  id: PropTypes.string,
}

export default Detail

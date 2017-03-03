import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
// import { compose, pick } from 'lodash/fp'
import { fetchTopics } from '../actions/list'
import Topic from '../components/topic'

const mapStateToProps = state => ({
  topics: state.list.topics,
})

class List extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTopics())
  }

  render() {
    const { topics } = this.props
    return (
      <div>
        {topics.map(topic => <Topic {...topic} key={topic.id} />)}
      </div>
    )
  }
}

List.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(List)

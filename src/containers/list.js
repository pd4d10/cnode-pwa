import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { CircularProgress } from 'material-ui'
// import { compose, pick } from 'lodash/fp'
import { fetchTopics } from '../actions/list'
import Topic from '../components/topic'

const mapStateToProps = state => ({
  isFetching: state.list.isFetching,
  topics: state.list.topics,
})

class List extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTopics())
  }

  render() {
    const { topics, isFetching } = this.props
    return (
      <div>
        {isFetching ? <CircularProgress /> : topics.map(topic => (
          <Topic {...topic} key={topic.id} />
        ))}
      </div>
    )
  }
}

List.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(List)

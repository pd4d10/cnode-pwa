import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchTopics } from '../actions/list'
import Topic from '../components/topic'
import Loading from '../components/loading'
import style from './list.css'

const mapStateToProps = state => ({
  isFetching: state.list.isFetching,
  topics: state.list.topics,
})

class List extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTopics(this.props.location.query.tab))
  }

  render() {
    const { topics, isFetching } = this.props
    return (
      <div className={style.container}>
        {isFetching ? <Loading /> : (
          <ul>
            {topics.map(topic => (
              <Topic {...topic} key={topic.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

List.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    query: PropTypes.shape({
      tab: PropTypes.string,
    }).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(List)

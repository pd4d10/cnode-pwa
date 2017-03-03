import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
// import { pick } from 'lodash'
import { fetchTopic } from '../actions/detail'
import Reply from '../components/reply'

const mapStateToProps = state => state.detail

class Detail extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTopic(this.props.params.id))
  }

  render() {
    const { topic } = this.props
    return topic && (
      <div>
        <div>{topic.title}</div>
        <div dangerouslySetInnerHTML={{ __html: topic.content }} />
        {topic.replies.map(reply => (
          <Reply {...reply} key={reply.id} />
        ))}
      </div>
    )
  }
}

Detail.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  topic: PropTypes.shape({ // eslint-disable-line
    content: PropTypes.string.isRequired,
  }),
}

export default connect(mapStateToProps)(Detail)

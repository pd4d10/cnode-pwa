import React from 'react'; import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Message = props => (
  <div>
    {props.hasnot_read_messages.map(message => (
      <div key={message.id}>{message.topic.title}</div>
    ))}
    {props.has_read_messages.map(message => (
      <div key={message.id}>{message.topic.title}</div>
    ))}
  </div>
)

Message.propTypes = {
  has_read_messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  hasnot_read_messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
}

const mapStateToProps = state => state.message

export default connect(mapStateToProps)(Message)

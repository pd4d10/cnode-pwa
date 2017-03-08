import React from 'react'
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

const mapStateToProps = state => state.message

export default connect(mapStateToProps)(Message)

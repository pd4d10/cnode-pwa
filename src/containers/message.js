import React from 'react'
import { withRouter } from 'react-router-dom'

const Message = props => (
  <div>
    {/* {props.hasnot_read_messages.map(message => (
      <div key={message.id}>{message.topic.title}</div>
    ))}
    {props.has_read_messages.map(message => (
      <div key={message.id}>{message.topic.title}</div>
    ))} */}
    message
  </div>
)

export default withRouter(Message)

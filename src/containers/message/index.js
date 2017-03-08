import React from 'react'
import { connect } from 'react-redux'
import AppBar from '../../components/app-bar'

const Message = props => (
  <div>
    <AppBar title="消息" />
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

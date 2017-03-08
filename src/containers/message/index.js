import React from 'react'
import { connect } from 'react-redux'
import Container from '../../components/container'

const Message = props => (
  <Container title="消息">
    {props.hasnot_read_messages.map(message => (
      <div key={message.id}>{message.topic.title}</div>
    ))}
    {props.has_read_messages.map(message => (
      <div key={message.id}>{message.topic.title}</div>
    ))}
  </Container>
)

const mapStateToProps = state => state.message

export default connect(mapStateToProps)(Message)

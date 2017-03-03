import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const Topic = props => (
  <Link to={`/topic/${props.id}`}>
    <img src={props.author.avatar_url} alt={props.author.loginname} />
    <div>{props.reply_count}/{props.visit_count}</div>
    <div>{props.title}</div>
    <div>{props.last_reply_at}</div>
  </Link>
)

Topic.propTypes = {
  id: PropTypes.string.isRequired,
  author: PropTypes.shape({
    avatar_url: PropTypes.string.isRequired,
    loginname: PropTypes.string.isRequired,
  }).isRequired,
  reply_count: PropTypes.number.isRequired,
  visit_count: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  last_reply_at: PropTypes.string.isRequired,
}

export default Topic

import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { List, ListItem } from 'material-ui'

const Topic = props => (
  <List>
    <ListItem>
      <Link to={`/user/${props.author_id}`}>
        <img src={props.author.avatar_url} alt={props.author.loginname} />
      </Link>
      <Link to={`/topic/${props.id}`}>
        <div>{props.reply_count}/{props.visit_count}</div>
        <div>{props.title}</div>
        <div>{props.last_reply_at}</div>
      </Link>
    </ListItem>
  </List>
)

Topic.propTypes = {
  id: PropTypes.string.isRequired,
  author_id: PropTypes.string.isRequired,
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

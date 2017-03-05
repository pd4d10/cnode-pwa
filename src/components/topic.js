import React, { PropTypes } from 'react'
import { Link } from 'react-router'
// import { Paper, ListItem } from 'material-ui'
import TimeAgo from 'timeago-react' // var TimeAgo = require('timeago-react');
import style from './topic.css'
import { getTagFromTopic } from '../utils'

const Topic = props => (
  <li className={style.container}>
    <Link to={`/user/${props.author.loginname}`}>
      <img
        className={style.avatar}
        src={props.author.avatar_url} alt={props.author.loginname}
      />
    </Link>
    <Link to={`/topic/${props.id}`} className={style.content}>
      <h3>{props.title}</h3>
      <div className={style.extra}>
        <div className={style.left}>
          <div className={style.tag}>{getTagFromTopic(props)}</div>
          <div className={style.count}>{props.reply_count} / {props.visit_count}</div>
        </div>
        <TimeAgo
          datetime={props.last_reply_at}
          locale="zh_CN"
        />
      </div>
    </Link>
  </li>
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

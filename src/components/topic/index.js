import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { ListItem } from 'material-ui'
import { green500 } from 'material-ui/styles/colors'
import TimeAgo from 'timeago-react' // var TimeAgo = require('timeago-react');
import { push } from 'react-router-redux'
import style from './topic.css'
import { getTagFromTopic } from '../../utils'

const Topic = props => (
  <Link to={`/topic/${props.id}`}>
    <ListItem innerDivStyle={{ display: 'flex', borderBottom: '1px solid #ccc' }}>
      <img
        className={style.avatar}
        src={props.author.avatar_url} alt={props.author.loginname}
        onClick={(e) => {
          e.preventDefault()
          props.dispatch(push(`/user/${props.author.loginname}`))
        }}
      />
      <div className={style.content}>
        <h3>{props.title}</h3>
        <div className={style.extra}>
          <div className={style.left}>
            <div className={style.tag} style={{ backgroundColor: green500 }}>{getTagFromTopic(props)}</div>
            <div className={style.count}>
              <strong>{props.reply_count}</strong> / {props.visit_count}
            </div>
          </div>
          <TimeAgo
            datetime={props.last_reply_at}
            locale="zh_CN"
          />
        </div>
      </div>
    </ListItem>
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
  dispatch: PropTypes.func.isRequired,
}

export default connect()(Topic)

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { pure } from 'recompose'
import ListItem from '@material-ui/core/ListItem'
import TimeAgo from 'timeago-react'
import { getTagFromTopic, colors } from '../utils'
import style from './topic.module.css'

const Topic = props => (
  <div className={style.container}>
    <Link to={`/topic/${props.id}`}>
      <ListItem innerDivStyle={{ display: 'flex', padding: '12px' }}>
        <a href="javascript:" className={style.avatar}>
          <img src={props.author.avatar_url} alt={props.author.loginname} />
        </a>
        <div className={style.content}>
          <h3 className={style.title}>{props.title}</h3>
          <div className={style.extra}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div
                className={style.tag}
                style={{
                  backgroundColor: colors.tag,
                }}
              >
                {getTagFromTopic(props)}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: '#b4b4b4',
                }}
              >
                <span style={{ color: '#9e78c0' }}>{props.reply_count} </span>
                回复 / <span>{props.visit_count}</span> 浏览
              </div>
            </div>
            <TimeAgo
              style={{
                fontSize: 12,
                color: '#778087',
              }}
              datetime={props.last_reply_at}
              locale="zh_CN"
              live={false}
            />
          </div>
        </div>
      </ListItem>
    </Link>
  </div>
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
  // dispatch: PropTypes.func.isRequired,
}

export default pure(Topic)

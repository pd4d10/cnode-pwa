import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { pure } from 'recompose'
import { ListItem, Divider } from 'material-ui'
import TimeAgo from 'timeago-react'
// import { push } from 'react-router-redux'
import style from './topic.css'
import { getTagFromTopic, colors } from '../../utils'

const Topic = props => (
  <Link to={`/topic/${props.id}`} className={style.container}>
    <ListItem
      innerDivStyle={{ display: 'flex', padding: '12px' }}
    >
      <div className={style.avatar}>
        <img
          src={props.author.avatar_url}
          alt={props.author.loginname}
          // onClick={(e) => {
          //   e.preventDefault()
          //   props.dispatch(push(`/user/${props.author.loginname}`))
          // }}
        />
      </div>
      <div className={style.content}>
        <h3>{props.title}</h3>
        <div className={style.extra}>
          <div className={style.left}>
            <div className={style.tag} style={{ backgroundColor: colors.tag }}>
              {getTagFromTopic(props)}
            </div>
            <div className={style.count}>
              <strong style={{ color: '#9e78c0' }}>{props.reply_count} </strong>回复 / <strong>{props.visit_count}</strong> 浏览
            </div>
          </div>
          <TimeAgo
            datetime={props.last_reply_at}
            locale="zh_CN"
            live={false}
          />
        </div>
      </div>
    </ListItem>
    <Divider />
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
  // dispatch: PropTypes.func.isRequired,
}

export default pure(Topic)

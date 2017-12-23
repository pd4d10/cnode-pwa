import React from 'react'; import PropTypes from 'prop-types'
// import { Link } from 'react-router'
import Divider from 'material-ui/Divider'
import TimeAgo from 'timeago-react'

import style from './reply.css'
import markdownStyle from '../../containers/detail/github-markdown.css'

const Reply = props => (
  <div className={style.container}>
    <div className={style.info}>
      <div to={`/user/${props.author.loginname}`} className={style.avatar}>
        <img src={props.author.avatar_url} alt={props.author.loginname} />
      </div>
      <div className={style.extra}>
        <div>{props.author.loginname}</div>
        <div className={style.time}>
          发表于
          <TimeAgo
            datetime={props.create_at}
            locale="zh_CN"
            live={false}
          />
        </div>
      </div>
    </div>
    <div className={`${style.content} ${markdownStyle.markdownBody}`} dangerouslySetInnerHTML={{ __html: props.content }} />
    <Divider />
  </div>
)

Reply.propTypes = {
  author: PropTypes.shape({
    avatar_url: PropTypes.string.isRequired,
    loginname: PropTypes.string.isRequired,
  }).isRequired,
  create_at: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}

export default Reply

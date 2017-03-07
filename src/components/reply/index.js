import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import style from './reply.css'

const Reply = props => (
  <div className={style.container}>
    <Link to={`/user/${props.author.loginname}`} className={style.avatar}>
      <img src={props.author.avatar_url} alt={props.author.loginname} />
    </Link>
    <div>{props.author.loginname}</div>
    <div className={style.content} dangerouslySetInnerHTML={{ __html: props.content }} />
  </div>
)

Reply.propTypes = {
  author: PropTypes.shape({
    avatar_url: PropTypes.string.isRequired,
    loginname: PropTypes.string.isRequired,
  }).isRequired,
  content: PropTypes.string.isRequired,
}

export default Reply

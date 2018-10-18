import React from 'react'
import { withRouter } from 'react-router-dom'
import $s from './avatar.module.css'

export const AvatarRow = withRouter(({ author, history, children }) => (
  <div className={$s.container}>
    <img
      src={author.avatar_url}
      className={$s.avatar}
      alt={author.loginname}
      onClick={e => {
        e.preventDefault()
        history.push(`/user/${author.loginname}`)
      }}
    />
    <div className={$s.content}>{children}</div>
  </div>
))

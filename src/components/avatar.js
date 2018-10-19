import React from 'react'
import { Route } from 'react-router-dom'
import $s from './avatar.module.css'

export const AvatarRow = ({ author, children, ...props }) => (
  <div className={$s.container} {...props}>
    <Route>
      {({ history }) => (
        <img
          src={author.avatar_url}
          className={$s.avatar}
          alt={author.loginname}
          onClick={e => {
            e.preventDefault()
            history.push(`/user/${author.loginname}`)
          }}
        />
      )}
    </Route>
    <div className={$s.content}>{children}</div>
  </div>
)

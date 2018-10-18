import React from 'react'
import { withRouter } from 'react-router-dom'
import $s from './avatar.module.css'

export const Avatar = withRouter(({ avatar_url, loginname, history }) => (
  <img
    src={avatar_url}
    className={$s.avatar}
    alt={loginname}
    onClick={e => {
      e.preventDefault()
      history.push(`/user/${loginname}`)
    }}
  />
))

export const Extra = props => (
  <div
    {...props}
    style={{
      ...props.style,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      lineHeight: '24px',
    }}
  />
)

import React from 'react'
import { withRouter } from 'react-router-dom'

export const Avatar = withRouter(
  ({ avatar_url, loginname, imgStyle, history }) => (
    <img
      src={avatar_url}
      style={{
        display: 'block',
        width: 48,
        height: 48,
        borderRadius: '50%',
        ...imgStyle,
      }}
      onClick={e => {
        e.preventDefault()
        history.push(`/user/${loginname}`)
      }}
    />
  ),
)

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

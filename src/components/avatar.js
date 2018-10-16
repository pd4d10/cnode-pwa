import React from 'react'
import { Link } from 'react-router-dom'

export const Avatar = ({ avatar_url, loginname, imgStyle }) => (
  <Link to={`/user/${loginname}`}>
    <img
      src={avatar_url}
      style={{
        display: 'block',
        width: 48,
        height: 48,
        borderRadius: '50%',
        ...imgStyle,
      }}
    />
  </Link>
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

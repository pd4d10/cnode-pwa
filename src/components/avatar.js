import React from 'react'

export const Avatar = props => (
  <img
    {...props}
    style={{
      ...props.style,
      width: 48,
      borderRadius: '50%',
      marginRight: 8,
    }}
  />
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

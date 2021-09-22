import React from 'react'
import { useRouter } from 'next/router'
import $s from './avatar.module.css'

export const AvatarRow = ({ author, children, ...props }) => {
  const router = useRouter()
  return (
    <div className={$s.container} {...props}>
      <img
        src={author.avatar_url}
        className={$s.avatar}
        alt={author.loginname}
        onClick={(e) => {
          e.preventDefault()
          router.push(`/user/${author.loginname}`)
        }}
      />
      <div className={$s.content}>{children}</div>
    </div>
  )
}

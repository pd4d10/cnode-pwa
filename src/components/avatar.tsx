import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import $s from './avatar.module.css'
import { TopicProps } from './topic'

export const AvatarRow = ({ author, children, ...props }) => {
  const navigate = useNavigate()
  return (
    <div className={$s.container} {...props}>
      <img
        src={author.avatar_url}
        className={$s.avatar}
        alt={author.loginname}
        onClick={(e) => {
          e.preventDefault()
          navigate(`/user/${author.loginname}`)
        }}
      />
      <div className={$s.content}>{children}</div>
    </div>
  )
}

export const Avatar: FC<TopicProps['author']> = (author) => {
  const navigate = useNavigate()
  return (
    <img
      style={{ display: 'block' }}
      src={author.avatar_url}
      className={$s.avatar}
      alt={author.loginname}
      onClick={(e) => {
        e.preventDefault()
        navigate(`/user/${author.loginname}`)
      }}
    />
  )
}

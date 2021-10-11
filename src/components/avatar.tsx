import { FC } from 'react'
import { useRouter } from '@norm/app'
import $s from './avatar.module.css'
import { TopicProps } from './topic'

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

export const Avatar: FC<TopicProps['author']> = (author) => {
  const router = useRouter()
  return (
    <img
      style={{ display: 'block' }}
      src={author.avatar_url}
      className={$s.avatar}
      alt={author.loginname}
      onClick={(e) => {
        e.preventDefault()
        router.push(`/user/${author.loginname}`)
      }}
    />
  )
}

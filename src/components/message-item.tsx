import { useRouter } from '@norm/app'
import { AvatarRow, Title } from '.'
import $c from './common.module.css'
import $s from './message-item.module.css'
import { colors } from '../utils'
import { List } from 'antd-mobile'

const MessageItem = (props) => {
  const router = useRouter()
  return (
    <List.Item
      onClick={() => {
        router.push(`/topic/${props.topic.id}`)
      }}
      className={$c.item}
      style={props.has_read ? {} : { background: '#f4fcf0' }}
    >
      <AvatarRow author={props.author}>
        <div className={$s.up}>
          <span style={{ color: colors.tag }}>{props.author.loginname}</span>{' '}
          回复了你的话题
        </div>
        <Title>{props.topic.title}</Title>
      </AvatarRow>
    </List.Item>
  )
}

export default MessageItem

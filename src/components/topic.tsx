import { FC } from 'react'
import { Link } from '@norm/app'
import { colors } from '../utils'
import $c from './common.module.css'
import $s from './topic.module.css'
import { Avatar, AvatarRow } from './avatar'
import { Title } from './styled'
import { TimeAgo } from './timeago'
import { Ellipsis, List, Tag } from 'antd-mobile'

export interface TopicProps {
  id: string
  author_id: string
  tab: string
  content: string
  title: string
  last_reply_at: string
  good: boolean
  top: boolean
  reply_count: number
  visit_count: number
  create_at: string
  author: {
    loginname: string
    avatar_url: string
  }
}

export const Topic: FC<TopicProps> = (props) => {
  return (
    <Link href={`/topic/${props.id}`}>
      <List.Item
        className={$c.link}
        arrow={false}
        prefix={<Avatar {...props.author} />}
        description={
          <div className={$s.extra}>
            <div className={$s.left}>
              <Tag color={colors.tag}>
                {props.top
                  ? '置顶'
                  : props.good
                  ? '精华'
                  : {
                      share: '分享',
                      ask: '问答',
                      job: '招聘',
                    }[props.tab]}
              </Tag>
              <div className={$s.right}>
                <span style={{ color: '#9e78c0' }}>{props.reply_count} </span>
                回复 / <span>{props.visit_count}</span> 浏览
              </div>
            </div>
            <TimeAgo time={props.last_reply_at} />
          </div>
        }
      >
        <Ellipsis content={props.title} />
      </List.Item>
    </Link>
  )
}

export const UserTopic: FC<TopicProps> = (props) => (
  <Link href={`/topic/${props.id}`}>
    <List.Item
      className={$c.item}
      prefix={<Avatar {...props.author} />}
      arrow={false}
      description={
        <div className={$s.extra}>
          <div className={$s.left}>{props.author.loginname}</div>
          <TimeAgo time={props.last_reply_at} />
        </div>
      }
    >
      <Ellipsis content={props.title} />
    </List.Item>
  </Link>
)

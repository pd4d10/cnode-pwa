import React from 'react'
import { Link } from 'react-router-dom'
import { ListItem } from '@material-ui/core'
import { colors } from '../utils'
import { AvatarRow, Title, TimeAgo } from './'
import $c from './common.module.css'
import $s from './topic.module.css'

export const Topic = React.memo(props => (
  <ListItem
    button
    component={Link}
    to={`/topic/${props.id}`}
    className={$c.link}
  >
    <AvatarRow author={props.author}>
      <Title>{props.title}</Title>
      <div className={$s.extra}>
        <div className={$s.left}>
          <div
            className={$s.tag}
            style={{
              backgroundColor: colors.tag,
            }}
          >
            {props.top
              ? '置顶'
              : props.good
                ? '精华'
                : {
                    share: '分享',
                    ask: '问答',
                    job: '招聘',
                  }[props.tab]}
          </div>
          <div className={$s.right}>
            <span style={{ color: '#9e78c0' }}>{props.reply_count} </span>
            回复 / <span>{props.visit_count}</span> 浏览
          </div>
        </div>
        <TimeAgo time={props.last_reply_at} />
      </div>
    </AvatarRow>
  </ListItem>
))

export const UserTopic = props => (
  <ListItem
    button
    component={Link}
    to={`/topic/${props.id}`}
    className={$c.item}
  >
    <AvatarRow author={props.author}>
      <Title>{props.title}</Title>
      <div className={$s.extra}>
        <div className={$s.left}>{props.author.loginname}</div>
        <TimeAgo time={props.last_reply_at} />
      </div>
    </AvatarRow>
  </ListItem>
)

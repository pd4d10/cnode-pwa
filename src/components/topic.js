// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import { pure } from 'recompose'
import { ListItem } from '@material-ui/core'
import TimeAgo from 'timeago-react'
import { getTagFromTopic, colors } from '../utils'
import * as types from '../types'
import $s from './topic.module.css'

export const Topic = pure((props: types.ListTopic) => (
  <ListItem
    button
    component={Link}
    to={`/topic/${props.id}`}
    style={{ borderBottom: '1px solid #f0f0f0' }}
  >
    <div className={$s.avatar}>
      <img src={props.author.avatar_url} alt={props.author.loginname} />
    </div>
    <div className={$s.content}>
      <h3 className={$s.title}>{props.title}</h3>
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
                    all: 'CNode 社区',
                    good: '精华',
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
        <TimeAgo
          className={$s.timeago}
          datetime={props.last_reply_at}
          locale="zh_CN"
          live={false}
        />
      </div>
    </div>
  </ListItem>
))

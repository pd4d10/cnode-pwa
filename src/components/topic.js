// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import { pure } from 'recompose'
import { ListItem } from '@material-ui/core'
import TimeAgo from 'timeago-react'
import { getTagFromTopic, colors } from '../utils'
import * as types from '../types'
import style from './topic.module.css'

export const Topic = pure((props: types.Topic) => (
  <ListItem button component={Link} to={`/topic/${props.id}`}>
    <div className={style.avatar}>
      <img src={props.author.avatar_url} alt={props.author.loginname} />
    </div>
    <div className={style.content}>
      <h3 className={style.title}>{props.title}</h3>
      <div className={style.extra}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            className={style.tag}
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
          <div
            style={{
              fontSize: 12,
              color: '#b4b4b4',
            }}
          >
            <span style={{ color: '#9e78c0' }}>{props.reply_count} </span>
            回复 / <span>{props.visit_count}</span> 浏览
          </div>
        </div>
        <TimeAgo
          style={{
            fontSize: 12,
            color: '#778087',
          }}
          datetime={props.last_reply_at}
          locale="zh_CN"
          live={false}
        />
      </div>
    </div>
  </ListItem>
))

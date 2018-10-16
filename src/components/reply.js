// @flow
import React from 'react'
import { Divider } from '@material-ui/core'
import { pure } from 'recompose'
import TimeAgo from 'timeago-react'
import { Link } from 'react-router-dom'
import { Avatar, Extra } from './'
import * as types from '../types'

export const Reply = pure((props: types.Reply) => (
  <div style={{ marginTop: 8, marginBottom: 8 }}>
    <div style={{ display: 'flex', marginBottom: 6 }}>
      <Avatar {...props.author} />
      <Extra>
        <div>{props.author.loginname}</div>
        <time>
          发表于
          <TimeAgo datetime={props.create_at} locale="zh_CN" live={false} />
        </time>
      </Extra>
    </div>
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: props.content }}
    />
    <Divider />
  </div>
))

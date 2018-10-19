// @flow
import React from 'react'
import { Divider } from '@material-ui/core'
import { pure } from 'recompose'
import TimeAgo from 'timeago-react'
import { AvatarRow } from './'
import * as types from '../types'
import $s from './reply.module.css'

export const Reply = (props: types.Reply) => (
  <div style={{ marginTop: 8, marginBottom: 8 }}>
    <div style={{ display: 'flex', marginBottom: 6 }}>
      <AvatarRow author={props.author}>
        <div>{props.author.loginname}</div>
        <div className={$s.tip}>
          发布于
          <TimeAgo datetime={props.create_at} locale="zh_CN" live={false} />
        </div>
      </AvatarRow>
    </div>
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: props.content }}
    />
    <Divider />
  </div>
)

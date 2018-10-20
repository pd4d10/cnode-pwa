// @flow
import React from 'react'
import { Divider } from '@material-ui/core'
import { pure } from 'recompose'
import { AvatarRow, TimeAgo } from './'
import * as types from '../types'

export const Reply = (props: types.Reply) => (
  <div style={{ marginTop: 8, marginBottom: 8 }}>
    <div style={{ display: 'flex', marginBottom: 6 }}>
      <AvatarRow author={props.author}>
        <div>{props.author.loginname}</div>
        <TimeAgo text="发布于" time={props.create_at} />
      </AvatarRow>
    </div>
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: props.content }}
    />
    <Divider />
  </div>
)

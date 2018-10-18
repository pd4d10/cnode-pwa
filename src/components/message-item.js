import React from 'react'
import { ListItem } from '@material-ui/core'
import { Link } from 'react-router-dom'
import * as types from '../types'
import { AvatarRow } from '.'
import $c from './common.module.css'
import $s from './message-item.module.css'
import { colors } from '../utils'

const MessageItem = (props: types.MessageItem) => (
  <ListItem
    button
    component={Link}
    to={`/topic/${props.topic.id}`}
    className={$c.item}
  >
    <AvatarRow author={props.author}>
      <div className={$s.up}>
        <span style={{ color: colors.tag }}>{props.author.loginname}</span>{' '}
        回复了你的话题
      </div>
      <div className={$c.title}>{props.topic.title}</div>
    </AvatarRow>
  </ListItem>
)

export default MessageItem

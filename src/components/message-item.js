import React from 'react'
import { ListItem } from '@material-ui/core'
import { Link } from 'next/router'
import { AvatarRow, Title } from '.'
import $c from './common.module.css'
import $s from './message-item.module.css'
import { colors } from '../utils'

const MessageItem = (props) => (
  <ListItem
    button
    component={Link}
    to={`/topic/${props.topic.id}`}
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
  </ListItem>
)

export default MessageItem

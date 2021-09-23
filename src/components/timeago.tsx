import { FC } from 'react'
import TimeAgoLib from 'timeago-react'
import $s from './timeago.module.css'

export const TimeAgo: FC<{ text?: string; time: string }> = ({
  text,
  time,
}) => (
  <span className={$s.time}>
    {text}
    <TimeAgoLib datetime={time} locale="zh_CN" live={false} />
  </span>
)

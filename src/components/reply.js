import React from 'react'
import PropTypes from 'prop-types'
import Divider from 'material-ui/Divider'
import TimeAgo from 'timeago-react'
import styled from 'styled-components'
import { Avatar, Extra, Time } from '../containers/detail'

const Content = styled.div`
  margin-top: 6px;
  img {
    max-width: 100%;
  }
`

const Reply = props => (
  <div style={{ margin: '8px 0' }}>
    <div style={{ display: 'flex' }}>
      <div to={`/user/${props.author.loginname}`}>
        <Avatar src={props.author.avatar_url} alt={props.author.loginname} />
      </div>
      <Extra>
        <div>{props.author.loginname}</div>
        <Time>
          发表于
          <TimeAgo datetime={props.create_at} locale="zh_CN" live={false} />
        </Time>
      </Extra>
    </div>
    <Content
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: props.content }}
    />
    <Divider />
  </div>
)

Reply.propTypes = {
  author: PropTypes.shape({
    avatar_url: PropTypes.string.isRequired,
    loginname: PropTypes.string.isRequired,
  }).isRequired,
  create_at: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}

export default Reply

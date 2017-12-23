import React from 'react'; import PropTypes from 'prop-types'
import { Link } from 'react-router'
import pure from 'recompose/pure'
import ListItem from 'material-ui/List/ListItem'
import TimeAgo from 'timeago-react'
// import { push } from 'react-router-redux'
import styled from 'styled-components'
import { getTagFromTopic, colors } from '../../utils'

const Container = styled.div`
  & h3 {
    font-size: 16px;
    line-height: 24px;
    font-weight: normal;
    color: #333;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &:visited h3 {
    color: #888;
  }`

const Avatar = styled.div`
 flex-basis: 48px;
  height: 48px;
  margin-right: 10px;
  & img {
    border-radius: 50%;
    width: 48px;
    height: 48px;
  }`

  const Content = styled.div`
    display: flex;
  min-width: 0; /* https://stackoverflow.com/questions/34934586/white-space-nowrap-and-flexbox-did-not-work-in-chrome */
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  height: 48px;`

const Extra = styled.div`
 display: flex;
  align-items: center;
  justify-content: space-between;`

const Tag = styled.div`
  color: #fff;
  background-color: ${colors.tag};
    font-size: 12px;
    line-height: 20px;
    border-radius: 2px;
    padding: 0 4px;
    margin-right: 8px;`

const Topic = props => (
  <Container>
  <Link to={`/topic/${props.id}`}>
    <ListItem
      innerDivStyle={{ display: 'flex', padding: '12px' }}
    >
      <Avatar // eslint-disable-line
        // onClick={(e) => {
        //   e.preventDefault()
        //   props.dispatch(push(`/user/${props.author.loginname}`))
        // }}
      >
        <img
          src={props.author.avatar_url}
          alt={props.author.loginname}
        />
      </Avatar>
      <Content>
        <h3>{props.title}</h3>
        <Extra>
          <div style={{  display: 'flex',
    alignItems: 'center'}}>
            <Tag>
              {getTagFromTopic(props)}
            </Tag>
            <div style={{  fontSize: 12,
    color: '#b4b4b4'}}>
              <span style={{ color: '#9e78c0' }}>{props.reply_count} </span>回复 / <span>{props.visit_count}</span> 浏览
            </div>
          </div>
          <TimeAgo
          style={{ fontSize: 12,
            color: '#778087'}}
            datetime={props.last_reply_at}
            locale="zh_CN"
            live={false}
          />
        </Extra>
      </Content>
    </ListItem>
  </Link>
  </Container>
)

Topic.propTypes = {
  id: PropTypes.string.isRequired,
  author: PropTypes.shape({
    avatar_url: PropTypes.string.isRequired,
    loginname: PropTypes.string.isRequired,
  }).isRequired,
  reply_count: PropTypes.number.isRequired,
  visit_count: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  last_reply_at: PropTypes.string.isRequired,
  // dispatch: PropTypes.func.isRequired,
}

export default pure(Topic)

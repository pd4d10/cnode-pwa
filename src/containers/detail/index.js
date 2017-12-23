import React, { Component } from 'react'; import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { Link } from 'react-router'
import TimeAgo from 'timeago-react'
import Helmet from 'react-helmet'

import { fetchTopic } from '../../actions/detail'
import Reply from '../../components/reply'
import Loading from '../../components/loading'
import './detail.css'
import './github-markdown.css'
import styled from 'styled-components';

const mapStateToProps = state => state.detail

const Container = styled.div`
  padding: 12px;

  & h2 {
    font-size: 20px;
  }
`

const Title = styled.h2`
font-size: 20px;
margin-bottom: 12px;`

const Info = styled.div`
display: flex;
  margin: 12px 0;`

const Avatar = styled.img`
width: 48px;
border-radius: 50%;
margin-right: 8px;
`

const Extra = styled.div`
display: flex;
  flex-direction: column;
  justify-content: space-between;
  line-height: 24px;`

const Time = styled.div`
font-size: 12px;
color: #555;
& time {
  color: '#838383'
}`

const ReplyHeader = styled.div`
background: #eee;
padding: 6px;
`

class Detail extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTopic(this.props.params.id))
  }

  render() {
    const { props } = this
    return (
      <div>
        {(props.isLoading || !props.topic) ? <Loading /> : (
          <div>
            <Helmet
              title={props.topic.title}
            />
            <Container>
              <Title>{props.topic.title}</Title>
              <Info>
                <div>
                  <Avatar src={props.topic.author.avatar_url} alt={props.topic.author.loginnam} />
                </div>
                <Extra>
                  <div>{props.topic.author.loginname}</div>
                  <Time>
                    <span>
                        创建于
                        <TimeAgo
                          datetime={props.topic.create_at}
                          locale="zh_CN"
                          live={false}
                        />
                    </span>
                    <span style={{ marginLeft: '6px' }}>
                      {props.topic.visit_count}
                        次浏览
                      </span>
                  </Time>
                </Extra>
              </Info>
              <div
                className="markdown-body"
                dangerouslySetInnerHTML={{ __html: props.topic.content }}
              />
              <div>
                <ReplyHeader>
                  {props.topic.reply_count ? `共 ${props.topic.reply_count} 条回复` : '暂无回复'}
                </ReplyHeader>
                {props.topic.replies.map(reply => (
                  <Reply {...reply} key={reply.id} />
                  ))}
              </div>
            </Container>
          </div>
        )}
      </div>
    )
  }
}

Detail.propTypes = {
  // isLoading: PropTypes.bool.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  topic: PropTypes.shape({ // eslint-disable-line
    content: PropTypes.string.isRequired,
  }),
}

export default connect(mapStateToProps)(Detail)

// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TimeAgo from 'timeago-react'
import Helmet from 'react-helmet'
import { withRouter } from 'react-router-dom'
import Reply from '../components/reply'
import Loading from '../components/loading'
import style from './detail.module.css'
import { fetchAPI } from '../utils'

export const Avatar = props => <img className={style.avatar} {...props} />

export const Extra = props => <div className={style.extra} {...props} />

export const Time = props => <div className={style.time} {...props} />

type DetailProps = {}

export type Author = {
  loginname: string,
  avatar_url: string,
}

type DetailState = {
  topic: ?{
    id: string,
    author_id: string,
    tab: string,
    content: string,
    title: string,
    last_reply_at: string,
    good: boolean,
    top: boolean,
    reply_count: number,
    visit_count: number,
    create_at: string,
    author: Author,
    replies: {
      id: string,
      author: Author,
      content: string,
      ups: string[],
      create_at: string,
      reply_id: string,
      is_uped: boolean,
    }[],
    is_collect: boolean,
  },
  isLoading: boolean,
}

class Detail extends React.Component<{}, DetailState> {
  state = {
    topic: null,
    isLoading: false,
  }

  fetchTopic = async () => {
    try {
      this.setState({ isLoading: true })
      const { id } = this.props.match.params
      const { data } = await fetchAPI(`/topic/${id}`)
      this.setState({ topic: data })
    } finally {
      this.setState({ isLoading: false })
    }
  }

  componentDidMount() {
    this.fetchTopic()
  }

  render() {
    const { topic, isLoading } = this.state
    return (
      <div>
        {isLoading || !topic ? (
          <Loading />
        ) : (
          <>
            <Helmet title={topic.title} />
            <div className={style.container}>
              <div style={{ fontSize: 20, marginBottom: 12 }}>
                {topic.title}
              </div>
              <div
                style={{
                  display: 'flex',
                  margin: '12px 0',
                }}
              >
                <div>
                  <img
                    className={style.avatar}
                    src={topic.author.avatar_url}
                    alt={topic.author.loginname}
                  />
                </div>
                <div className={style.extra}>
                  <div>{topic.author.loginname}</div>
                  <div
                    style={{
                      fontSize: 12,
                      color: '#555',
                    }}
                  >
                    <span>
                      创建于
                      <TimeAgo
                        datetime={topic.create_at}
                        locale="zh_CN"
                        live={false}
                        style={{ color: '#838383' }}
                      />
                    </span>
                    <span style={{ marginLeft: '6px' }}>
                      {topic.visit_count}
                      次浏览
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="markdown-body"
                dangerouslySetInnerHTML={{ __html: topic.content }}
              />
              <div>
                <div
                  style={{
                    background: '#eee',
                    padding: 6,
                  }}
                >
                  {topic.reply_count
                    ? `共 ${topic.reply_count} 条回复`
                    : '暂无回复'}
                </div>
                {topic.replies.map(reply => (
                  <Reply {...reply} key={reply.id} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    )
  }
}

export default withRouter(Detail)

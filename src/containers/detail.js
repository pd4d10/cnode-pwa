import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TimeAgo from 'timeago-react'
import Helmet from 'react-helmet'
import { withRouter } from 'react-router-dom'
import { fetchTopic } from '../actions/detail'
import Reply from '../components/reply'
import Loading from '../components/loading'
import style from './detail.module.css'

export const Avatar = props => <img className={style.avatar} {...props} />

export const Extra = props => <div className={style.extra} {...props} />

export const Time = props => <div className={style.time} {...props} />

class Detail extends Component {
  componentDidMount() {
    this.props.fetchTopic(this.props.match.params.id)
  }

  render() {
    const { props } = this
    return (
      <div>
        {props.isLoading || !props.topic ? (
          <Loading />
        ) : (
          <div>
            <Helmet title={props.topic.title} />
            <div className={style.container}>
              <div style={{ fontSize: 20, marginBottom: 12 }}>
                {props.topic.title}
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
                    src={props.topic.author.avatar_url}
                    alt={props.topic.author.loginnam}
                  />
                </div>
                <div className={style.extra}>
                  <div>{props.topic.author.loginname}</div>
                  <div
                    style={{
                      fontSize: 12,
                      color: '#555',
                    }}
                  >
                    <span>
                      创建于
                      <TimeAgo
                        datetime={props.topic.create_at}
                        locale="zh_CN"
                        live={false}
                        style={{ color: '#838383' }}
                      />
                    </span>
                    <span style={{ marginLeft: '6px' }}>
                      {props.topic.visit_count}
                      次浏览
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="markdown-body"
                dangerouslySetInnerHTML={{ __html: props.topic.content }}
              />
              <div>
                <div
                  style={{
                    background: '#eee',
                    padding: 6,
                  }}
                >
                  {props.topic.reply_count
                    ? `共 ${props.topic.reply_count} 条回复`
                    : '暂无回复'}
                </div>
                {props.topic.replies.map(reply => (
                  <Reply {...reply} key={reply.id} />
                ))}
              </div>
            </div>
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
  topic: PropTypes.shape({
    // eslint-disable-line
    content: PropTypes.string.isRequired,
  }),
}

export default withRouter(
  connect(
    s => s.detail,
    { fetchTopic },
  )(Detail),
)

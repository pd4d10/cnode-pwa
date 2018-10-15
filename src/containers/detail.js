// @flow
import React from 'react'
import { Dialog, Slide } from '@material-ui/core'
import TimeAgo from 'timeago-react'
import Helmet from 'react-helmet'
import { withRouter } from 'react-router-dom'
import { Reply } from '../components'
import Loading from '../components/loading'
import style from './detail.module.css'
import { fetchAPI } from '../utils'
import * as types from '../types'

type DetailState = {
  topic: ?types.DetailTopic,
  isLoading: boolean,
}

const Transition = props => <Slide direction="up" {...props} />

class DetailComponent extends React.Component<any, DetailState> {
  state = {
    topic: null,
    isLoading: false,
  }

  fetchTopic = async () => {
    try {
      this.setState({ isLoading: true })
      const id = this.props.match.params.id
      const { data } = await fetchAPI(`/topic/${id}`)
      this.setState({ topic: data })
    } finally {
      this.setState({ isLoading: false })
    }
  }

  isTopicScreen = props => /^\/topic\//.test(props.location.pathname)

  componentDidUpdate(prevProps) {
    console.log(prevProps, this.props)
    if (
      this.isTopicScreen(this.props) &&
      (!this.isTopicScreen(prevProps) ||
        prevProps.match.params.id !== this.props.match.params.id)
    ) {
      this.fetchTopic()
    }
  }

  render() {
    const { topic, isLoading } = this.state
    return (
      <Dialog
        fullScreen
        open={this.isTopicScreen(this.props)}
        onClose={() => {
          this.props.history.push('/')
        }}
        TransitionComponent={Transition}
      >
        {isLoading || !topic ? (
          <Loading />
        ) : (
          <>
            <Helmet title={topic.title} />
            <div className={style.container}>
              <div className={style.title}>{topic.title}</div>
              <div className={style.info}>
                <div>
                  <img
                    className={style.avatar}
                    src={topic.author.avatar_url}
                    alt={topic.author.loginname}
                  />
                </div>
                <div className={style.extra}>
                  <div>{topic.author.loginname}</div>
                  <div className={style.tip}>
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
      </Dialog>
    )
  }
}

export const Detail = withRouter(DetailComponent)

// @flow
import React from 'react'
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import { ArrowBack, Share } from '@material-ui/icons'
import TimeAgo from 'timeago-react'
import Helmet from 'react-helmet'
import { withRouter } from 'react-router-dom'
import { Reply } from '../components'
import Loading from '../components/loading'
import { TopicConsumer } from '../contexts'
import $s from './detail.module.css'
import { fetchAPI } from '../utils'
import * as types from '../types'

type DetailState = {
  topic: ?types.DetailTopic,
  isLoading: boolean,
}

class Detail extends React.Component<any, DetailState> {
  state = {
    topic: null,
    isLoading: false,
  }

  getTopicId = () => this.props.match.params.id

  fetchTopic = async () => {
    try {
      this.setState({ isLoading: true })
      const id = this.getTopicId()
      const { data } = await fetchAPI(`/topic/${id}`)
      this.setState({ topic: data })
    } finally {
      this.setState({ isLoading: false })
    }
  }

  isTopicScreen = props => /^\/topic\//.test(props.location.pathname)

  componentDidMount() {
    // this.fetchTopic()
  }

  componentDidUpdate(prevProps) {
    // console.log(prevProps, this.props)
    if (
      this.isTopicScreen(this.props) &&
      (!this.isTopicScreen(prevProps) ||
        prevProps.match.params.id !== this.props.match.params.id)
    ) {
      // this.fetchTopic()
    }
  }

  render() {
    const { topic, isLoading } = this.state
    const { history } = this.props
    return (
      <TopicConsumer>
        {({ topicMapper }) => {
          const topic = topicMapper[this.getTopicId()]
          return (
            <>
              <Helmet title={topic.title} />

              <AppBar>
                <Toolbar variant="dense">
                  <IconButton
                    color="inherit"
                    style={{ marginLeft: -12, marginRight: 20 }}
                    onClick={() => {
                      if (history.length === 1) {
                        // If no history, go to homepage
                        history.push('/')
                      } else {
                        history.goBack()
                      }
                    }}
                  >
                    <ArrowBack />
                  </IconButton>
                  <Typography
                    variant="title"
                    color="inherit"
                    style={{ flexGrow: 1 }}
                  >
                    话题
                  </Typography>
                  <IconButton
                    color="inherit"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: topic.title,
                          text: 'Hello World',
                          url: window.location.href,
                        })
                      }
                    }}
                  >
                    <Share />
                  </IconButton>
                </Toolbar>
              </AppBar>

              <div className={$s.container}>
                <div className={$s.title}>{topic.title}</div>
                <div className={$s.info}>
                  <div>
                    <img
                      className={$s.avatar}
                      src={topic.author.avatar_url}
                      alt={topic.author.loginname}
                    />
                  </div>
                  <div className={$s.extra}>
                    <div>{topic.author.loginname}</div>
                    <div className={$s.tip}>
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
                  {(topic.replies || []).map(reply => (
                    <Reply {...reply} key={reply.id} />
                  ))}
                </div>
              </div>
            </>
          )
        }}
      </TopicConsumer>
    )
  }
}

export default withRouter(Detail)

// @flow
import React from 'react'
import { IconButton } from '@material-ui/core'
import { Share } from '@material-ui/icons'
import TimeAgo from 'timeago-react'
import Helmet from 'react-helmet'
import { Reply, AvatarRow, Header, Loading } from '../components'
import { HintConsumer } from '../contexts'
import { fetchAPI, copy } from '../utils'
import * as types from '../types'
import 'github-markdown-css'
import $s from './detail.module.css'

type DetailState = {
  topic: ?types.DetailTopic,
  isLoading: boolean,
}

class Detail extends React.Component<any, DetailState> {
  state = {
    topic: null,
    isLoading: false,
  }

  fetchTopic = async () => {
    try {
      this.setState({ isLoading: true })
      const { data } = await fetchAPI(`/topic/${this.props.match.params.id}`)
      this.setState({ topic: data })
    } finally {
      this.setState({ isLoading: false })
    }
  }

  componentDidMount() {
    this.fetchTopic()
  }

  render() {
    const { topic } = this.state
    return (
      <>
        {topic && <Helmet title={topic.title} />}
        <Header
          title="话题"
          rightWidget={() => (
            <HintConsumer>
              {({ show }) => (
                <IconButton
                  color="default"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: topic.title,
                        text: 'Hello World',
                        url: window.location.href,
                      })
                    } else {
                      copy(window.location.href)
                      show('链接已复制至剪贴板')
                    }
                  }}
                >
                  <Share />
                </IconButton>
              )}
            </HintConsumer>
          )}
        />

        {!topic ? (
          <Loading />
        ) : (
          <div className={$s.container}>
            <div className={$s.title}>{topic.title}</div>
            <AvatarRow author={topic.author}>
              <div>{topic.author.loginname}</div>
              <div className={$s.tip}>
                <span>
                  发布于
                  <TimeAgo
                    datetime={topic.create_at}
                    locale="zh_CN"
                    live={false}
                  />
                </span>
                <span style={{ marginLeft: 12 }}>
                  {topic.visit_count}
                  次浏览
                </span>
              </div>
            </AvatarRow>
            <div
              style={{ marginTop: 12 }}
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
        )}
      </>
    )
  }
}

export default Detail

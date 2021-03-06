import React from 'react'
import Helmet from 'react-helmet'
import {
  Reply,
  AvatarRow,
  Header,
  Loading,
  NoMore,
  ShareTo,
  TimeAgo,
} from '../components'
import { HintConsumer } from '../contexts'
import { fetchAPI } from '../utils'
import 'github-markdown-css'
import $s from './detail.module.css'

class Detail extends React.Component {
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
          rightWidget={() => <ShareTo text={topic ? topic.title : ''} />}
        />

        {!topic ? (
          <Loading />
        ) : (
          <div className={$s.container}>
            <div className={$s.title}>{topic.title}</div>
            <AvatarRow author={topic.author}>
              <div>{topic.author.loginname}</div>
              <div className={$s.tip}>
                <TimeAgo text="发布于" time={topic.create_at} />
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
              {topic.replies.map(reply => (
                <Reply {...reply} key={reply.id} />
              ))}
              <NoMore />
            </div>
          </div>
        )}
      </>
    )
  }
}

export default Detail

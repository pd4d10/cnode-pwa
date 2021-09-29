import { useState, useEffect } from 'react'
import {
  Reply,
  AvatarRow,
  Header,
  Loading,
  NoMore,
  ShareTo,
  TimeAgo,
} from '../../components'
import { fetchAPI } from '../../utils'
import 'github-markdown-css'
import $s from './detail.module.css'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const Detail: NextPage = () => {
  const router = useRouter()
  const [topic, setTopic] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!router.query.id) return

    const init = async () => {
      try {
        setIsLoading(true)
        const { data } = await fetchAPI(`/topic/${router.query.id}`)
        setTopic(data)
      } finally {
        setIsLoading(false)
      }
    }

    init()
  }, [router.query.id])

  useEffect(() => {
    if (topic) {
      document.title = topic.title
    }
  }, [topic])

  return (
    <>
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
            {topic.replies.map((reply) => (
              <Reply {...reply} key={reply.id} />
            ))}
            <NoMore />
          </div>
        </div>
      )}
    </>
  )
}

export default Detail

import { useState, useEffect } from 'react'
import { fetchAPI, shareCurrentUrl } from '@/utils'
import $s from './detail.module.css'
import { SendOutline } from 'antd-mobile-icons'
import { Header } from '@/components/header'
import { MarkdownViewer } from '@/components/markdown'
import { Reply } from '@/components/reply'
import { AvatarRow } from '@/components/avatar'
import { Loading } from '@/components/loading'
import { NoMore } from '@/components/no-more'
import { TimeAgo } from '@/components/timeago'
import { useParams } from 'react-router-dom'

export default function Topic() {
  const params = useParams<'id'>()

  const [topic, setTopic] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!params.id) return

    const init = async () => {
      try {
        setIsLoading(true)
        const { data } = await fetchAPI(`/topic/${params.id}?mdrender=false`)
        setTopic(data)
      } finally {
        setIsLoading(false)
      }
    }

    init()
  }, [params.id])

  return (
    <>
      <Header
        right={
          <SendOutline
            onClick={() => {
              shareCurrentUrl(topic ? topic.title : '')
            }}
          />
        }
      >
        话题
      </Header>
      {!topic ? (
        <Loading />
      ) : (
        <div className={$s.container}>
          <div className={$s.title}>{topic.title}</div>
          <AvatarRow author={topic.author} style={{ marginBottom: 12 }}>
            <div>{topic.author.loginname}</div>
            <div className={$s.tip}>
              <TimeAgo text="发布于" time={topic.create_at} />
              <span style={{ marginLeft: 12 }}>
                {topic.visit_count}
                次浏览
              </span>
            </div>
          </AvatarRow>
          <MarkdownViewer value={topic.content} />
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

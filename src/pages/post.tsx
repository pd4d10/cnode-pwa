import { useState } from 'react'
import { useRouter } from 'next/router'
import { Header } from '../components'
import { fetchAPI } from '../utils'
import $s from './post.module.css'
import { useAuth, useHint } from '../hooks'
import { PlayOutline } from 'antd-mobile-icons'
import { Input } from 'antd-mobile'

const postTabs = [
  { id: 'ask', name: '问答' },
  { id: 'share', name: '分享' },
  { id: 'job', name: '招聘' },
  { id: 'dev', name: '客户端测试' },
]

const Post = (props) => {
  const router = useRouter()
  const [tab, setTab] = useState('ask')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [titleErrorVisible, setTitleErrorVisible] = useState(false)
  const [contentErrorVisible, setContentErrorVisible] = useState(false)

  const { token } = useAuth()
  const { show } = useHint()

  const showTitleError = titleErrorVisible && !title
  const showContentError = contentErrorVisible && !content

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        if (!title || !content) {
          setTitleErrorVisible(!title)
          setContentErrorVisible(!content)
          return
        }
        try {
          const { topic_id } = await fetchAPI('/topics', {
            title,
            tab: 'dev', // for test
            // tab,
            content,
            accesstoken: token,
          })
          router.replace(`/topic/${topic_id}`)
        } catch (err) {
          show(err.message)
        }
      }}
    >
      <Header
        title="发布话题"
        rightWidget={() => <PlayOutline></PlayOutline>}
      />
      <div style={{ padding: 10 }}>
        <Input
          className={$s.control}
          // label="标题"
          // InputProps={{
          //   id: 'title',
          //   value: title,
          //   onChange: (e) => {
          //     setTitle(e.target.value)
          //   },
          //   error: showTitleError,
          // }}
          // error={showTitleError}
          // helperText={showTitleError ? '请输入标题' : null}
        />
        <Input
          // fullWidth
          className={$s.control}
          select
          label="分区"
          id="tab"
          SelectProps={{
            native: true,
            id: 'tab',
            value: tab,
            onChange: (e) => {
              setTab(e.target.value)
            },
          }}
        >
          {postTabs.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </Input>
        <Input
          // TODO: markdown
          // multiline
          // rows="10"
          // fullWidth
          className={$s.control}
          // label="内容"
          // InputLabelProps={{ htmlFor: 'content' }}
          // InputProps={{
          //   id: 'content',
          //   value: content,
          //   onChange: (e) => {
          //     setContent(e.target.value)
          //   },
          //   error: showContentError,
          // }}
          // error={showContentError}
          // helperText={showContentError ? '请输入内容' : null}
        />
      </div>
    </form>
  )
}

export default Post

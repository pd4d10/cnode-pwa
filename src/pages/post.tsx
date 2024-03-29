import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/components/header'
import { fetchAPI } from '@/utils'
import $s from './post.module.css'
import { useAuth } from '@/hooks/auth'
import { PlayOutline } from 'antd-mobile-icons'
import { Input, Toast } from 'antd-mobile'

const postTabs = [
  { id: 'ask', name: '问答' },
  { id: 'share', name: '分享' },
  { id: 'job', name: '招聘' },
  { id: 'dev', name: '客户端测试' },
]

export default function Post() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('ask')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [titleErrorVisible, setTitleErrorVisible] = useState(false)
  const [contentErrorVisible, setContentErrorVisible] = useState(false)

  const { token } = useAuth()

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
          navigate(`/topic/${topic_id}`, { replace: true })
        } catch (err) {
          Toast.show(err.message)
        }
      }}
    >
      <Header right={<PlayOutline />}>发布话题</Header>
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
        {/* <Input
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
        </Input> */}
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

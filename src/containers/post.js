import React, { useState } from 'react'
import {
  IconButton,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'
import { Route } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Send } from '@material-ui/icons'
import { Header } from '../components'
import { fetchAPI } from '../utils'
import $s from './post.module.css'
import { useAuth, useHint } from '../hooks'

const postTabs = [
  { id: 'ask', name: '问答' },
  { id: 'share', name: '分享' },
  { id: 'job', name: '招聘' },
  { id: 'dev', name: '客户端测试' },
]

export const Post = (props) => {
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
    <Route>
      {({ history }) => (
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
              history.replace(`/topic/${topic_id}`)
            } catch (err) {
              show(err.message)
            }
          }}
        >
          <Header
            title="发布话题"
            rightWidget={() => (
              <IconButton color="default" type="submit">
                <Send />
              </IconButton>
            )}
          />
          <div style={{ padding: 10 }}>
            <TextField
              fullWidth
              className={$s.control}
              label="标题"
              InputLabelProps={{ htmlFor: 'title' }}
              InputProps={{
                id: 'title',
                value: title,
                onChange: (e) => {
                  setTitle(e.target.value)
                },
                error: showTitleError,
              }}
              error={showTitleError}
              helperText={showTitleError ? '请输入标题' : null}
            />
            <TextField
              fullWidth
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
            </TextField>
            <TextField
              // TODO: markdown
              multiline
              rows="10"
              fullWidth
              className={$s.control}
              label="内容"
              InputLabelProps={{ htmlFor: 'content' }}
              InputProps={{
                id: 'content',
                value: content,
                onChange: (e) => {
                  setContent(e.target.value)
                },
                error: showContentError,
              }}
              error={showContentError}
              helperText={showContentError ? '请输入内容' : null}
            />
          </div>
        </form>
      )}
    </Route>
  )
}

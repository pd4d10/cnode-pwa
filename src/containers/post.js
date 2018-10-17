import React from 'react'
import { IconButton, TextField } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { Send } from '@material-ui/icons'
import { Header } from '../components'
import { fetchAPI } from '../utils'
import { withContext, AuthConsumer } from '../contexts'
import $s from './post.module.css'

const postTabs = [
  { id: 'ask', name: '问答' },
  { id: 'share', name: '分享' },
  { id: 'job', name: '招聘' },
  { id: 'dev', name: '客户端测试' },
]

class Post extends React.Component {
  state = {
    tab: 'ask',
    title: '',
    content: '',
    titleErrorVisible: false,
    contentErrorVisible: false,
  }

  handleSubmit = async e => {
    e.preventDefault()
    const { tab, title, content } = this.state
    if (!title || !content) {
      this.setState({
        titleErrorVisible: !title,
        contentErrorVisible: !content,
      })
      return
    }
    const id = await this.props.postTopic({ tab, title, content })
    this.props.history.replace(`/topic/${id}`)
  }

  handleTabChange = e => {
    this.setState({ tab: e.target.value })
  }

  shouldShowTitleError = () => this.state.titleErrorVisible && !this.state.title
  shouldShowContentError = () =>
    this.state.contentErrorVisible && !this.state.content

  render() {
    const showTitleError = this.shouldShowTitleError()
    const showContentError = this.shouldShowContentError()

    return (
      <form onSubmit={this.handleSubmit}>
        <Header
          title="发布话题"
          rightWidget={() => (
            <IconButton color="inherit" type="submit">
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
              value: this.state.title,
              onChange: e => {
                this.setState({ title: e.target.value })
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
              value: this.state.tab,
              onChange: this.handleTabChange,
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
              value: this.state.content,
              onChange: e => {
                this.setState({ content: e.target.value })
              },
              error: showContentError,
            }}
            error={showContentError}
            helperText={showContentError ? '请输入内容' : null}
          />
        </div>
        {/* <MdEditor
          value={this.state.content}
          onChange={content => {
            this.setState({ content })
          }}
        /> */}
      </form>
    )
  }
}

export default compose(
  withContext(AuthConsumer),
  withRouter,
)(Post)

import React from 'react'
import {
  IconButton,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'
import { Route } from 'react-router-dom'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { Send } from '@material-ui/icons'
import { Header } from '../components'
import { fetchAPI } from '../utils'
import { AuthConsumer, HintConsumer } from '../contexts'
import { withContext } from '../utils'
import $s from './post.module.css'

const postTabs = [
  { id: 'ask', name: '问答' },
  { id: 'share', name: '分享' },
  { id: 'job', name: '招聘' },
  { id: 'dev', name: '客户端测试' },
]

export default class Post extends React.Component {
  state = {
    tab: 'ask',
    title: '',
    content: '',
    addSuffix: true,
    titleErrorVisible: false,
    contentErrorVisible: false,
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
      <AuthConsumer>
        {({ postTopic }) => (
          <Route>
            {({ history }) => (
              <HintConsumer>
                {({ show }) => (
                  <form
                    onSubmit={async e => {
                      e.preventDefault()
                      let { tab, title, content, addSuffix } = this.state
                      if (!title || !content) {
                        this.setState({
                          titleErrorVisible: !title,
                          contentErrorVisible: !content,
                        })
                        return
                      }
                      if (addSuffix) {
                        content += '\n\n来自 [cnode.rocks](https://cnode.rocks)'
                      }
                      try {
                        const id = await postTopic({
                          tab,
                          title,
                          content,
                        })
                        history.replace(`/topic/${id}`)
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
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.addSuffix}
                            onChange={e => {
                              this.setState({ addSuffix: e.target.checked })
                            }}
                          />
                        }
                        label="添加后缀"
                      />
                    </div>
                  </form>
                )}
              </HintConsumer>
            )}
          </Route>
        )}
      </AuthConsumer>
    )
  }
}

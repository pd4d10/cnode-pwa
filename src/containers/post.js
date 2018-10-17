import React from 'react'
import {
  IconButton,
  FormControl,
  Input,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { Send } from '@material-ui/icons'
import { Header } from '../components'
import $s from './post.module.css'
import { fetchAPI } from '../utils'
import { withContext, AuthConsumer } from '../contexts'

const postTabs = [
  { id: 'ask', name: '问答' },
  { id: 'share', name: '分享' },
  { id: 'job', name: '招聘' },
  { id: 'dev', name: '客户端测试' },
]

class Post extends React.Component {
  state = { tab: 'ask', title: '', content: '' }

  handleSubmit = async e => {
    e.preventDefault()
    const id = await this.props.postTopic(this.state)
    this.props.history.replace(`/topic/${id}`)
  }

  handleTabChange = e => {
    this.setState({ tab: e.target.value })
  }

  render() {
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
          <FormControl fullWidth className={$s.control}>
            <InputLabel htmlFor="title">标题</InputLabel>
            <Input
              id="title"
              value={this.state.title}
              onChange={e => {
                this.setState({ title: e.target.value })
              }}
            />
          </FormControl>
          <FormControl fullWidth className={$s.control}>
            <InputLabel htmlFor="tab">分区</InputLabel>
            <Select
              native
              id="tab"
              value={this.state.tab}
              onChange={this.handleTabChange}
              // input={
              //   <OutlinedInput
              //     labelWidth={this.state.labelWidth}
              //     name="age"
              //     id="outlined-age-simple"
              //   />
              // }
            >
              {postTabs.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth className={$s.control}>
            <InputLabel htmlFor="content">内容</InputLabel>
            <Input
              multiline
              rows="10"
              id="content"
              value={this.state.content}
              onChange={e => {
                this.setState({ content: e.target.value })
              }}
            />
          </FormControl>
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

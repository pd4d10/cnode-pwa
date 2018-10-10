import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  AppBar,
  Dialog,
  Toolbar,
  IconButton,
  Slide,
  Typography,
  FormControl,
  Input,
  InputLabel,
} from '@material-ui/core'
import { Add, Close, Send } from '@material-ui/icons'
// import MdEditor from 'react-md-editor'
import { withRouter } from 'react-router-dom'
import { throttle } from 'lodash-es'
import { Topic } from '../components'
import * as utils from '../utils'
// import ContentLoader from 'react-content-loader'
import { ListProvider, ListConsumer, withList } from '../contexts'
import * as types from '../types'

// @keyframes spin {
//   100% {
//     transform: rotate(360deg);
//   }
// }

const Transition = props => <Slide direction="up" {...props} />

class ListComponent extends React.Component<any, any> {
  state = {
    title: '',
    content: '',
    dialogVisible: false,
  }

  // TODO better infinity scrolling
  loadMore = throttle(() => {
    const height = 200
    if (
      document.documentElement.scrollHeight -
        document.body.scrollTop -
        document.documentElement.clientHeight <
        height && // eslint-disable-line
      !this.props.isLoadingMore &&
      !this.props.isLoading
    ) {
      this.props.loadMore()
    }
  }, 200)

  componentDidMount() {
    this.props.load()
    window.addEventListener('scroll', this.loadMore)
  }

  // When click drawer item, there are two cases:
  // 1. Tag is same, close drawer and do nothing
  // 2. Tag is different, navigator to new tag URL, and refresh data
  // Once it was implemented in actions, now move it to component
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.props.load()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.loadMore)
  }

  render() {
    const { props } = this
    return (
      <div>
        {props.isLoading ? (
          // <ContentLoader
          //   height={144}
          //   width={750}
          //   speed={2}
          //   primaryColor={'#f3f3f3'}
          //   secondaryColor={'#ecebeb'}
          // >
          //   <circle cx="48" cy="48" r="48" />
          //   <rect x="75" y="13" rx="4" ry="4" width="100" height="13" />
          //   <rect x="75" y="37" rx="4" ry="4" width="50" height="8" />
          //   <rect x="0" y="70" rx="5" ry="5" width="400" height="400" />
          // </ContentLoader>
          <div>loading...</div>
        ) : (
          <div>
            {props.topics.map((topic, index) => (
              // <li
              //   key={topic.id}
              //   style={{
              //     borderTopColor: '#f0f0f0',
              //     borderTopWidth: index ? 1 : 0,
              //     borderTopStyle: 'solid',
              //   }}
              // >
              <Topic {...topic} key={topic.id} />
              // </li>
            ))}
          </div>
        )}

        {props.isLoadingMore && <div>loading more...</div>}

        <Button
          variant="fab"
          color="primary"
          style={{
            //   zIndex: 2,
            position: 'fixed',
            bottom: 16,
            right: 16,
          }}
          onClick={() => {
            this.setState({ dialogVisible: true })
          }}
        >
          <Add />
        </Button>
        <Dialog
          fullScreen
          open={this.state.dialogVisible}
          // onClose={() => {
          //   this.setState({ dialogVisible: false })
          // }}
          TransitionComponent={Transition}
        >
          <AppBar>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={() => {
                  this.setState({ dialogVisible: false })
                }}
                aria-label="close"
              >
                <Close />
              </IconButton>
              <Typography color="inherit" style={{ flexGrow: 1 }}>
                发布话题
              </Typography>
              <Button
                color="inherit"
                onClick={() => {
                  this.setState({ dialogVisible: false })
                }}
              >
                <Send />
              </Button>
            </Toolbar>
          </AppBar>
          <div style={{ marginTop: 56 }}>
            <FormControl fullWidth>
              <InputLabel htmlFor="title">标题</InputLabel>
              <Input
                id="title"
                value={this.state.title}
                onChange={e => {
                  this.setState({ title: e.target.value })
                }}
              />
            </FormControl>
            {/* <MdEditor
              value={this.state.content}
              onChange={content => {
                this.setState({ content })
              }}
            /> */}
          </div>
        </Dialog>
      </div>
    )
  }
}

export const List = withRouter(withList(ListComponent))

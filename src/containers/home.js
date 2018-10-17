import React from 'react'
import {
  Button,
  AppBar,
  Dialog,
  Toolbar,
  IconButton,
  Slide,
  Typography,
  Badge,
} from '@material-ui/core'
import { Close, Edit, Notifications, AccountCircle } from '@material-ui/icons'
// import MdEditor from 'react-md-editor'
import { withRouter } from 'react-router-dom'
import { throttle } from 'lodash-es'
import { Topic } from '../components'
import { Navigation } from './'
// import ContentLoader from 'react-content-loader'
import { TopicConsumer, AuthConsumer, withContext } from '../contexts'

// @keyframes spin {
//   100% {
//     transform: rotate(360deg);
//   }
// }

const Transition = props => <Slide direction="up" {...props} />

class Home extends React.Component {
  state = {
    title: '',
    content: '',
    dialogVisible: false,
  }

  // TODO better infinity scrolling
  loadMore = throttle(() => {
    const toBottom =
      document.documentElement.scrollHeight -
      document.documentElement.scrollTop -
      document.documentElement.clientHeight
    console.log('toBottom', toBottom)
    if (toBottom < 200 && !this.props.isLoadingMore && !this.props.isLoading) {
      this.props.loadMore()
    }
  }, 200)

  componentDidMount() {
    if (this.props.topics.length === 0) {
      this.props.load()
    }
    window.addEventListener('scroll', this.loadMore)
  }

  // When click drawer item, there are two cases:
  // 1. Tag is same, close drawer and do nothing
  // 2. Tag is different, navigator to new tag URL, and refresh data
  // Once it was implemented in actions, now move it to component
  componentDidUpdate(prevProps) {
    // Only scroll when switch tab
    if (this.props.currentIndex !== prevProps.currentIndex) {
      window.scrollTo(0, this.props.scrollY)
    }

    if (
      this.props.topics.length === 0 &&
      !this.props.isLoading &&
      !this.props.isLoadingMore
    ) {
      this.props.load()
      console.log('load')
    }
    // if (
    //   this.props.location.pathname === '/' &&
    //   prevProps.location.pathname === '/' &&
    //   new URLSearchParams(this.props.location.search).get('tab') ===
    //     new URLSearchParams(prevProps.location.search).get('tab')
    // ) {
    //   this.props.load()
    // }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.loadMore)
  }

  goToPost = () => {
    this.props.history.push('/post')
  }

  goToMessage = () => {
    this.props.history.push('/message')
  }

  render() {
    const { props } = this
    return (
      <div>
        <AppBar>
          <Toolbar variant="dense">
            <Typography variant="title" color="inherit" style={{ flexGrow: 1 }}>
              {['社区', '精华', '分享', '问答', '招聘'][props.currentIndex]}
            </Typography>
            <IconButton color="inherit" onClick={this.goToPost}>
              <Edit />
            </IconButton>
            <IconButton color="inherit" onClick={this.goToMessage}>
              <AuthConsumer>
                {({ count }) =>
                  count ? (
                    <Badge badgeContent={count} color="secondary">
                      <Notifications />
                    </Badge>
                  ) : (
                    <Notifications />
                  )
                }
              </AuthConsumer>
            </IconButton>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
        {props.isLoading && <div>loading...</div>}
        <div>
          {props.topics.map((topic, index) => (
            <Topic {...topic} key={topic.id} />
          ))}
        </div>

        {props.isLoadingMore && <div>loading more...</div>}
        <Navigation />
      </div>
    )
  }
}

export default withRouter(withContext(TopicConsumer)(Home))

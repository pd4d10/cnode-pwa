import React from 'react'
import {
  Button,
  AppBar,
  Dialog,
  Toolbar,
  IconButton,
  Slide,
  Typography,
  Paper,
  Badge,
  Tabs,
  Tab,
} from '@material-ui/core'
import { Close, Edit, Notifications, AccountCircle } from '@material-ui/icons'
// import MdEditor from 'react-md-editor'
import { withRouter } from 'react-router-dom'
import { throttle } from 'lodash-es'
import { Topic, Loading } from '../components'
import { Navigation } from './'
// import ContentLoader from 'react-content-loader'
import { tabData, tabs } from '../utils'
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
    if (toBottom < 96 && !this.props.isLoadingMore && !this.props.isLoading) {
      this.props.loadMore()
    }
  }, 500)

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
      <div style={{ marginBottom: 48 }}>
        <TopicConsumer>
          {({ setScrollY, currentIndex, load }) => (
            <Paper square style={{ position: 'sticky', top: -48, zIndex: 1 }}>
              <Toolbar variant="dense">
                <Typography
                  variant="title"
                  color="inherit"
                  style={{ flexGrow: 1 }}
                >
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
              <Tabs
                style={{ background: '#fff' }}
                value={currentIndex}
                onChange={(_, index) => {
                  // console.log(window.scrollY)
                  if (currentIndex === index) {
                    // scroll to top and refresh
                    window.scrollTo(0, 0)
                    load()
                  } else {
                    // save scroll position and push new route
                    setScrollY(window.scrollY)

                    if (index === 0) {
                      this.props.history.push('/')
                    }
                    this.props.history.push('/?tab=' + tabs[index])
                  }
                }}
                indicatorColor="primary"
                textColor="primary"
                fullWidth
              >
                {tabData.map(tab => (
                  <Tab key={tab.pathname} label={tab.title} value={tab.ids} />
                ))}
              </Tabs>
            </Paper>
          )}
        </TopicConsumer>

        {props.isLoading && <Loading />}
        <div>
          {props.topics.map((topic, index) => (
            <Topic {...topic} key={topic.id} />
          ))}
        </div>

        {props.isLoadingMore && <Loading />}
        {/* <Navigation /> */}
      </div>
    )
  }
}

export default withRouter(withContext(TopicConsumer)(Home))

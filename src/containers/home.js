import React from 'react'
import {
  Button,
  Toolbar,
  IconButton,
  Slide,
  Paper,
  Badge,
  Tabs,
  Tab,
} from '@material-ui/core'
import { Close, Edit, Notifications, AccountCircle } from '@material-ui/icons'
import { withRouter } from 'react-router-dom'
import { throttle } from 'lodash-es'
import { Topic, Loading } from '../components'
import { ReactComponent as Logo } from '../logo.svg'
import { tabData, tabs } from '../utils'
import { TopicConsumer, AuthConsumer, withContext } from '../contexts'

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
    // console.log('toBottom', toBottom)
    if (toBottom < 120 && !this.props.isLoadingMore && !this.props.isLoading) {
      this.props.loadMore()
    }
  }, 500)

  componentDidMount() {
    if (this.props.topics.length === 0) {
      this.props.load()
    }
    window.addEventListener('scroll', this.loadMore)
  }

  componentDidUpdate(prevProps) {
    // if tab switchs then load the latest data
    if (
      this.props.location.key !== prevProps.location.key &&
      this.props.location.pathname === '/' &&
      prevProps.location.pathname === '/' &&
      !this.props.isLoading &&
      !this.props.isLoadingMore
    ) {
      console.log('reload')
      this.props.load()
    }
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
      <div style={{ marginBottom: 84, marginTop: -48 }}>
        <TopicConsumer>
          {({ setScrollY, currentIndex, load }) => (
            <Paper square style={{ position: 'sticky', top: -48, zIndex: 1 }}>
              <Toolbar variant="dense">
                <Logo width={24} height={24} />
                <div style={{ flexGrow: 1 }} />
                <IconButton color="default" onClick={this.goToMessage}>
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
                <IconButton color="default">
                  <AccountCircle />
                </IconButton>
              </Toolbar>
              <Tabs
                style={{ background: '#fff' }}
                value={currentIndex}
                onChange={(_, index) => {
                  if (index === 0) {
                    this.props.history.push('/')
                  } else {
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

        {props.isLoading ? (
          <Loading />
        ) : (
          <div>
            {props.topics.map((topic, index) => (
              <Topic {...topic} key={topic.id} />
            ))}
          </div>
        )}

        {props.isLoadingMore && <Loading />}

        <Button
          variant="fab"
          // color="secondary"
          style={{ position: 'fixed', bottom: 16, right: 16 }}
          onClick={this.goToPost}
        >
          <Edit />
        </Button>
      </div>
    )
  }
}

export default withRouter(withContext(TopicConsumer)(Home))

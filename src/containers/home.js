import React from 'react'
import { Button } from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import { withRouter } from 'react-router-dom'
import { throttle } from 'lodash-es'
import { compose } from 'recompose'
import { Topic, Loading, HomeHeader } from '../components'
import { TopicConsumer } from '../contexts'
import { withContext } from '../utils'

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

  render() {
    const { props } = this
    return (
      <div style={{ marginBottom: 84, marginTop: -48 }}>
        <HomeHeader />
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
          onClick={() => {
            this.props.history.push('/post')
          }}
        >
          <Edit />
        </Button>
      </div>
    )
  }
}

export default compose(
  withRouter,
  withContext(TopicConsumer),
)(Home)

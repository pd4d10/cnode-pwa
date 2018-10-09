import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import { throttle } from 'lodash-es'
import Topic from '../components/topic'
import * as utils from '../utils'
// import ContentLoader from 'react-content-loader'
import { withRouter } from 'react-router-dom'
import { ListProvider, ListConsumer, withList } from '../contexts'

// @keyframes spin {
//   100% {
//     transform: rotate(360deg);
//   }
// }

class List extends React.Component {
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
    if (nextProps.location.search !== this.props.location.search) {
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
          <ul>
            {props.topics.map((topic, index) => (
              <li
                key={topic.id}
                style={{
                  borderTopColor: '#f0f0f0',
                  borderTopWidth: index ? 1 : 0,
                  borderTopStyle: 'solid',
                }}
              >
                <Topic {...topic} dispatch={props.dispatch} />
              </li>
            ))}
          </ul>
        )}

        {props.isLoadingMore && <div>loading more...</div>}

        <Button
          style={{
            zIndex: 2,
            position: 'fixed',
            right: 20,
            bottom: 20,
          }}
          onClick={() => props.show('发贴')}
        >
          {/* <ContentCreate /> */}
          add
        </Button>
      </div>
    )
  }
}

export default withRouter(withList(List))

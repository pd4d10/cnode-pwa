import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import throttle from 'lodash/throttle'
import { load, loadMore } from '../actions/list'
// import * as drawerActions from '../actions/drawer'
// import * as authActions from '../actions/auth'
import { show } from '../actions/toast'
import Topic from '../components/topic'
import Loading from '../components/loading'
import LoadingMore from '../components/loading-more'
import * as utils from '../utils'
import styled from 'styled-components'
// import ContentLoader from 'react-content-loader'
import { withRouter } from 'react-router-dom'

const Item = styled.li`
  border-top: 1px solid #f0f0f0;
  &:first {
    border-top: none;
  }
`

// @keyframes spin {
//   100% {
//     transform: rotate(360deg);
//   }
// }

class ListComponent extends Component {
  constructor(props) {
    super(props)
    const throttleTime = 200

    // TODO better infinity scrolling
    this.loadMore = throttle(() => {
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
    }, throttleTime)
  }

  // After upgrading to React Router v4, we should handle query string manually
  loadListData = props => {
    const params = new URLSearchParams(props.location.search)
    const tab = params.get('tab') || 'all'
    props.load(tab)
  }

  componentDidMount() {
    this.loadListData(this.props)
    // this.props.dispatch(authActions.load())
    window.addEventListener('scroll', this.loadMore)
  }

  // When click drawer item, there are two cases:
  // 1. Tag is same, close drawer and do nothing
  // 2. Tag is different, navigator to new tag URL, and refresh data
  // Once it was implemented in actions, now move it to component
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.loadListData(nextProps)
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
          <Loading key="loading" />
        ) : (
          <ul>
            {props.topics.map(topic => (
              <Item key={topic.id}>
                <Topic {...topic} dispatch={props.dispatch} />
              </Item>
            ))}
          </ul>
        )}
        <LoadingMore isVisible={props.isLoadingMore} />
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

ListComponent.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoadingMore: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    query: PropTypes.shape({
      tab: PropTypes.string,
    }).isRequired,
  }).isRequired,
  load: PropTypes.func.isRequired,
  loadMore: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
}

export default withRouter(
  connect(
    s => s.list,
    { load, loadMore, show }
  )(ListComponent)
)

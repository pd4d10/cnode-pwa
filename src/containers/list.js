import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentCreate from 'material-ui/svg-icons/content/create'
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
          <Loading key="loading" />
        ) : (
          // <ul key={props.location.query.tab}>
          <ul>
            {props.topics.map(topic => (
              <Item key={topic.id}>
                <Topic {...topic} dispatch={props.dispatch} />
              </Item>
            ))}
          </ul>
        )}
        <LoadingMore isVisible={props.isLoadingMore} />
        <FloatingActionButton
          style={{
            zIndex: 2,
            position: 'fixed',
            right: 20,
            bottom: 20,
          }}
          onClick={() => props.show('发贴')}
        >
          <ContentCreate />
        </FloatingActionButton>
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

const mapStateToProps = state => {
  // const { tab } = state.routing.locationBeforeTransitions.query
  // const title = !tab || tab === 'all' ? 'CNode 社区' : utils.tabsMap[tab]
  const title = 'ABC'
  return {
    ...state.list,
    title,
  }
}

export default withRouter(
  connect(mapStateToProps, { load, loadMore, show })(ListComponent)
)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentCreate from 'material-ui/svg-icons/content/create'
import throttle from 'lodash/throttle'

import * as listActions from '../../actions/list'
// import * as drawerActions from '../../actions/drawer'
// import * as authActions from '../../actions/auth'
import * as toastActions from '../../actions/toast'
import Topic from '../../components/topic'
import Loading from '../../components/loading'
import LoadingMore from '../../components/loading-more'
import * as utils from '../../utils'
import './list.css'
import styledComponents from 'styled-components'

const Item = styledComponents.li`
border-top: 1px solid #f0f0f0;
&:first {
  border-top: none;
}`

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
        this.props.dispatch(listActions.loadMore())
      }
    }, throttleTime)
  }

  componentDidMount() {
    if (this.props.topics.length === 0) {
      this.props.dispatch(listActions.load(this.props.location.query.tab))
    }
    // this.props.dispatch(authActions.load())
    window.addEventListener('scroll', this.loadMore)
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
          <ul key={props.location.query.tab}>
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
          onClick={() => props.dispatch(toastActions.show('发贴'))}
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
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  const { tab } = state.routing.locationBeforeTransitions.query
  const title = !tab || tab === 'all' ? 'CNode 社区' : utils.tabsMap[tab]
  return {
    ...state.list,
    title,
  }
}

export default connect(mapStateToProps)(ListComponent)

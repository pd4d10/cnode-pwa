import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { FloatingActionButton, AppBar, IconButton } from 'material-ui'
import ContentCreate from 'material-ui/svg-icons/content/create'
import { throttle } from 'lodash'

import Refresh from 'material-ui/svg-icons/navigation/refresh'
import Cached from 'material-ui/svg-icons/action/cached'
import * as listActions from '../../actions/list'
import * as drawerActions from '../../actions/drawer'
// import * as authActions from '../../actions/auth'
import * as toastActions from '../../actions/toast'
import Topic from '../../components/topic'
import Loading from '../../components/loading'
import LoadingMore from '../../components/loading-more'
import * as utils from '../../utils'
import style from './list.css'

class ListComponent extends Component {
  constructor(props) {
    super(props)
    const throttleTime = 200

    // TODO better infinity scrolling
    this.loadMore = throttle(() => {
      const height = 200
      if (
        document.documentElement.scrollHeight - document.body.scrollTop - document.documentElement.clientHeight < height // eslint-disable-line
        && !this.props.isLoadingMore
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
      <div className={style.container}>
        <AppBar
          style={{
            position: 'fixed',
          }}
          title={props.title}
          onLeftIconButtonTouchTap={() => props.dispatch(drawerActions.show())}
          iconElementRight={<IconButton
            style={props.isLoading ? {
              animation: `${style.spin} 5s linear infinite`,
            } : {}}
          >
            <Refresh />
          </IconButton>}
          onRightIconButtonTouchTap={() => props.dispatch(listActions.load())}
        />
        {props.isLoading ? <Loading key="loading" /> : (
          <ul style={{ paddingTop: '64px' }} key={props.location.query.tab}>
            {props.topics.map(topic => (
              <li key={topic.id}>
                <Topic {...topic} />
              </li>
              ))}
          </ul>
        )}
        <LoadingMore isVisible={props.isLoadingMore} />
        <FloatingActionButton
          className={style.post}
          style={{ zIndex: 2 }}
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
  isLoadingMore: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    query: PropTypes.shape({
      tab: PropTypes.string,
    }).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  ...state.list,
  title: utils.tabsMap[state.routing.locationBeforeTransitions.query.tab],
})

export default connect(mapStateToProps)(ListComponent)

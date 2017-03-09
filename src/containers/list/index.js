import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { AppBar, Drawer, Divider, List, ListItem, FloatingActionButton, IconButton, Avatar } from 'material-ui'
import ContentCreate from 'material-ui/svg-icons/content/create'
import { green500, grey300 } from 'material-ui/styles/colors'
import IconAll from 'material-ui/svg-icons/content/inbox'
import IconGood from 'material-ui/svg-icons/action/thumb-up'
import IconShare from 'material-ui/svg-icons/action/timeline'
import IconAsk from 'material-ui/svg-icons/action/question-answer'
import IconJob from 'material-ui/svg-icons/action/group-work'
import DefaultAvatar from 'material-ui/svg-icons/social/person'
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import * as listActions from '../../actions/list'
import * as drawerActions from '../../actions/drawer'
import * as messageActions from '../../actions/message'
import * as authActions from '../../actions/auth'
import Topic from '../../components/topic'
import Loading from '../../components/loading'
import LoadingMore from '../../components/loading-more'
import style from './list.css'
import { tabs, tabsMap } from '../../utils'

const iconsMap = {
  all: IconAll,
  good: IconGood,
  share: IconShare,
  ask: IconAsk,
  job: IconJob,
}

const Item = props => (
  <ListItem
    leftIcon={<props.icon />}
    primaryText={tabsMap[props.tab]}
    onClick={() => props.dispatch(listActions.load(props.tab))}
    innerDivStyle={props.activeItem[props.tab] ? {
      color: green500,
      backgroundColor: grey300,
    } : {}}
  />
)

Item.propTypes = {
  tab: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}

class ListComponent extends Component {
  constructor(props) {
    super(props)
    this.loadMore = () => {
      if (document.documentElement.scrollHeight - document.body.scrollTop - document.documentElement.clientHeight < 100 && !this.props.isLoadingMore) {
        this.props.dispatch(listActions.loadMore())
      }
    }
  }

  componentDidMount() {
    this.props.dispatch(listActions.load(this.props.location.query.tab))
    this.props.dispatch(authActions.load())
    window.addEventListener('scroll', this.loadMore)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.loadMore)
  }

  render() {
    const { props } = this
    return (
      <div className={style.container} style={props.location.pathname !== '/' ? { display: 'none' } : {}}>
        <AppBar
          style={{
            position: 'fixed',
          }}
          title={props.title}
          onLeftIconButtonTouchTap={() => props.dispatch(drawerActions.show())}
          iconElementRight={<IconButton><Refresh /></IconButton>}
          onRightIconButtonTouchTap={() => props.dispatch(listActions.load())}
        />
        <Drawer
          docked={false}
          open={props.isVisible}
          onRequestChange={() => props.dispatch(drawerActions.hide())}
        >
          <List style={{ marginTop: '40px' }}>
            <ListItem
              leftAvatar={<Avatar
                src={props.avatar ? props.avatar : null}
                icon={props.avatar ? null : <DefaultAvatar />}
              />}
              primaryText={props.name ? props.name : '点击登录'}
            />
            <Divider />
            {tabs.map(tab => (
              <Item
                key={tab.key}
                tab={tab.key}
                icon={iconsMap[tab.key]}
                activeItem={props.activeItem}
                dispatch={props.dispatch}
              />
            ))}
            <Divider />
            <ListItem primaryText="消息" onClick={() => props.dispatch(messageActions.load())} />
            <ListItem primaryText="关于" />
          </List>
        </Drawer>
        {props.isLoading ? <Loading /> : (
          <ul style={{ paddingTop: '64px' }}>
            {props.topics.map(topic => (
              <li key={topic.id}>
                <Topic {...topic} />
              </li>
              ))}
          </ul>
        )}
        {props.isLoadingMore ? <LoadingMore /> : (
          <div>加载更多</div>
        )}
        <FloatingActionButton className={style.post} style={{ zIndex: 2 }}>
          <ContentCreate />
        </FloatingActionButton>
      </div>
    )
  }
}

ListComponent.propTypes = {
  // topics: PropTypes.arrayOf(PropTypes.object).isRequired,
  // isLoading: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    query: PropTypes.shape({
      tab: PropTypes.string,
    }).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
}

function getActiveItem({
  pathname,
  query,
}) {
  switch (pathname) {
    case '/':
      return query.tab
    case '/about':
      return 'about'
    case '/message':
      return 'message'
    default: {
      if (/^\/topics/.test(pathname)) {
        return 'topics'
      }
      return undefined
    }
  }
}

const mapStateToProps = (state) => {
  const activeItem = {
    all: false,
    good: false,
    share: false,
    ask: false,
    job: false,
    topic: false,
    message: false,
    about: false,
  }

  const key = getActiveItem(state.routing.locationBeforeTransitions)
  activeItem[key] = true

  return {
    ...state.list,
    isVisible: state.drawer.isVisible,
    title: tabsMap[state.routing.locationBeforeTransitions.query.tab],
    activeItem,
    avatar: state.auth.avatar,
    name: state.auth.name,
  }
}

export default connect(mapStateToProps)(ListComponent)

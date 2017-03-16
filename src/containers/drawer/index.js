import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { pure } from 'recompose'
import * as MUI from 'material-ui'
import DefaultAvatar from 'material-ui/svg-icons/social/person'

import IconAll from 'material-ui/svg-icons/content/inbox'
import IconGood from 'material-ui/svg-icons/action/thumb-up'
import IconShare from 'material-ui/svg-icons/action/timeline'
import IconAsk from 'material-ui/svg-icons/action/question-answer'
import IconJob from 'material-ui/svg-icons/action/group-work'
import IconMessage from 'material-ui/svg-icons/communication/message'
import IconAbout from 'material-ui/svg-icons/action/info'

import * as utils from '../../utils'
import * as drawerActions from '../../actions/drawer'
import * as listActions from '../../actions/list'
// import * as messageActions from '../../actions/message'
// import * as authActions from '../../actions/auth'
import * as toastActions from '../../actions/toast'

const iconsMap = {
  all: IconAll,
  good: IconGood,
  share: IconShare,
  ask: IconAsk,
  job: IconJob,
  message: IconMessage,
  about: IconAbout,
}

const Item = pure((props) => {
  const Icon = iconsMap[props.tab]
  return (
    <MUI.ListItem
      leftIcon={<Icon style={props.activeItem[props.tab] ? { fill: utils.colors.primary } : {}} />}
      primaryText={utils.tabsMap[props.tab]}
      onClick={() => props.dispatch(listActions.load(props.tab))}
      innerDivStyle={props.activeItem[props.tab] ? {
        color: utils.colors.primary,
        backgroundColor: utils.colors.avatarBackground,
      } : {}}
    />
  )
})

Item.propTypes = {
  tab: PropTypes.string.isRequired,
  activeItem: PropTypes.object.isRequired, // eslint-disable-line
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

const MyDrawer = props => (
  <MUI.Drawer
    docked={false}
    open={props.isVisible}
    onRequestChange={open => props.dispatch(open ? drawerActions.show() : drawerActions.hide())}
  >
    <MUI.List>
      <MUI.ListItem
        style={{ marginTop: '40px' }}
        leftAvatar={<MUI.Avatar
          src={props.avatar ? props.avatar : null}
          icon={props.avatar ? null : <DefaultAvatar />}
        />}
        primaryText={props.name}
        onClick={() => props.dispatch(toastActions.show('登录'))}
      />
      <MUI.Divider />
      {utils.tabs.map(tab => (
        <Item
          key={tab.key}
          tab={tab.key}
          activeItem={props.activeItem}
          dispatch={props.dispatch}
        />
      ))}
      <MUI.Divider />
      <MUI.Divider />
      <Link to="/about">
        <MUI.ListItem
          primaryText="关于"
          leftIcon={<IconAbout />}
          onClick={() => props.dispatch(drawerActions.hide())}
        />
      </Link>
    </MUI.List>
  </MUI.Drawer>
)

MyDrawer.defaultProps = {
  name: '点击登录',
}

MyDrawer.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
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
    title: utils.tabsMap[state.routing.locationBeforeTransitions.query.tab],
    activeItem,
    avatar: state.auth.avatar,
    name: state.auth.name,
  }
}

export default connect(mapStateToProps)(MyDrawer)

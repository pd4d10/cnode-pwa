import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import pure from 'recompose/pure'
import Avatar from '@material-ui/core/Avatar'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import DefaultAvatar from '@material-ui/icons/Delete'

import IconAll from '@material-ui/icons/Delete'
import IconGood from '@material-ui/icons/Delete'
import IconShare from '@material-ui/icons/Delete'
import IconAsk from '@material-ui/icons/Delete'
import IconJob from '@material-ui/icons/Delete'
import IconMessage from '@material-ui/icons/Delete'
import IconAbout from '@material-ui/icons/Delete'

import * as utils from '../utils'
import * as drawerActions from '../actions/drawer'
import * as listActions from '../actions/list'
// import * as messageActions from '../actions/message'
// import * as authActions from '../actions/auth'
import * as toastActions from '../actions/toast'
import { withRouter } from 'react-router-dom'

const iconsMap = {
  all: IconAll,
  good: IconGood,
  share: IconShare,
  ask: IconAsk,
  job: IconJob,
  message: IconMessage,
  about: IconAbout,
}

const Item = p => {
  const Icon = iconsMap[p.tab]
  return (
    <Link to={`/?tab=${p.tab}`}>
      <ListItem
        leftIcon={
          <Icon
            style={p.activeItem[p.tab] ? { fill: utils.colors.primary } : {}}
          />
        }
        primaryText={utils.tabsMap[p.tab]}
        // onClick={() => props.dispatch(listActions.load(props.tab))}
        // onClick
        innerDivStyle={
          p.activeItem[p.tab]
            ? {
                color: utils.colors.primary,
                backgroundColor: utils.colors.avatarBackground,
              }
            : {}
        }
      />
    </Link>
  )
}

Item.propTypes = {
  tab: PropTypes.string.isRequired,
  activeItem: PropTypes.object.isRequired, // eslint-disable-line
  dispatch: PropTypes.func.isRequired,
}

const MyDrawer = props => (
  <Drawer
    docked={false}
    open={props.isVisible}
    width={220}
    onRequestChange={open =>
      props.dispatch(open ? drawerActions.show() : drawerActions.hide())
    }
  >
    <List>
      <ListItem
        style={{ marginTop: '20px' }}
        leftAvatar={
          <Avatar
            src={props.avatar ? props.avatar : null}
            icon={props.avatar ? null : <DefaultAvatar />}
          />
        }
        primaryText={props.name}
        onClick={() => props.dispatch(toastActions.show('登录'))}
      />
      <Divider />
      {utils.tabs.map(tab => (
        <Item
          key={tab.key}
          tab={tab.key}
          activeItem={props.activeItem}
          dispatch={props.dispatch}
        />
      ))}
      <Divider />
      <Divider />
      <Link to="/about">
        <ListItem
          primaryText="关于"
          leftIcon={<IconAbout />}
          onClick={() => props.dispatch(drawerActions.hide())}
        />
      </Link>
    </List>
  </Drawer>
)

MyDrawer.defaultProps = {
  name: '点击登录',
}

MyDrawer.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string, // eslint-disable-line
  isVisible: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  return {
    ...state.list,
    isVisible: state.drawer.isVisible,
    avatar: state.auth.avatar,
    name: state.auth.name,
  }
}

export default withRouter(connect(mapStateToProps)(MyDrawer))

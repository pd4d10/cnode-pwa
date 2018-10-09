import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import pure from 'recompose/pure'
import Avatar from '@material-ui/core/Avatar'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

import {
  Person,
  Forum,
  ThumbUp,
  Share,
  LiveHelp,
  SwitchCamera,
  Notifications,
  Settings,
  Info,
} from '@material-ui/icons'

import * as utils from '../utils'
import { withRouter } from 'react-router-dom'

const Item = props => {
  const Icon = {
    all: Forum,
    good: ThumbUp,
    share: Share,
    ask: LiveHelp,
    job: SwitchCamera,
    message: Notifications,
    settings: Settings,
    about: Info,
  }[props.tab]

  return (
    <Link to={`/?tab=${props.tab}`}>
      <ListItem
        button
        // onClick={() => props.dispatch(listActions.load(props.tab))}
        innerDivStyle={
          props.activeItem[props.tab]
            ? {
                color: utils.colors.primary,
                backgroundColor: utils.colors.avatarBackground,
              }
            : {}
        }
      >
        <ListItemIcon>
          <Icon
            style={
              props.activeItem[props.tab] ? { fill: utils.colors.primary } : {}
            }
          />
        </ListItemIcon>
        <ListItemText primary={utils.tabsMap[props.tab]} />
      </ListItem>
    </Link>
  )
}

Item.propTypes = {
  tab: PropTypes.string.isRequired,
  activeItem: PropTypes.object.isRequired, // eslint-disable-line
  dispatch: PropTypes.func.isRequired,
}

const MyDrawer = props => (
  <SwipeableDrawer open={props.isVisible} onOpen={() => {}} onClose={() => {}}>
    <List>
      <ListItem button>
        <ListItemIcon>
          <Avatar src={props.avatar ? props.avatar : null}>
            {props.avatar || <Person />}
          </Avatar>
        </ListItemIcon>
        <ListItemText primary={props.name} />
      </ListItem>

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
        <ListItem button>
          <ListItemIcon>
            <Info />
          </ListItemIcon>
          <ListItemText primary="关于" />
        </ListItem>
      </Link>
    </List>
  </SwipeableDrawer>
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

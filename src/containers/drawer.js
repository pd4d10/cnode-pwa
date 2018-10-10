import React from 'react'

import { Link } from 'react-router-dom'
import { pure } from 'recompose'
import Avatar from '@material-ui/core/Avatar'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import { Person } from '@material-ui/icons'
import * as utils from '../utils'
import { withRouter } from 'react-router-dom'
import { DrawerConsumer } from '../contexts'

export const Drawer = withRouter(props => {
  return (
    <DrawerConsumer>
      {({ visible, setVisible }) => (
        <SwipeableDrawer
          open={visible}
          onOpen={() => {
            setVisible(true)
          }}
          onClose={() => {
            setVisible(false)
          }}
        >
          <List>
            <ListItem button>
              <ListItemIcon>
                <Avatar src={props.avatar ? props.avatar : null}>
                  {props.avatar || <Person />}
                </Avatar>
              </ListItemIcon>
              <ListItemText primary={props.name || '点击登录'} />
            </ListItem>

            <Divider />
            {Object.entries(utils.mapper).map(([pathname, [title, Icon]]) => (
              <ListItem
                button
                component={Link}
                to={pathname}
                key={pathname}
                onClick={() => {
                  setVisible(false)
                }}
                // innerDivStyle={
                //   props.activeItem[props.tab]
                //     ? {
                //         color: utils.colors.primary,
                //         backgroundColor: utils.colors.avatarBackground,
                //       }
                //     : {}
                // }
              >
                <ListItemIcon>
                  <Icon
                    style={
                      props.location.pathname === pathname
                        ? { fill: utils.colors.primary }
                        : {}
                    }
                  />
                </ListItemIcon>
                <ListItemText primary={title} />
              </ListItem>
            ))}
          </List>
        </SwipeableDrawer>
      )}
    </DrawerConsumer>
  )
})

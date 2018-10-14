// @flow
import React from 'react'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { ArrowBack, Menu } from '@material-ui/icons'
import { DrawerConsumer } from '../contexts'
import { mapper } from '../utils'

function getTitle(pathname) {
  if (mapper[pathname]) {
    return mapper[pathname][0]
  }

  if (/^\/topic/.test(pathname)) {
    return '话题'
  }

  return '未知'
}

export const Header = props => {
  const isList = ['', 'good', 'share', 'ask', 'job'].includes(
    props.location.pathname.slice(1),
  )

  return (
    <AppBar>
      <Toolbar>
        <DrawerConsumer>
          {({ setVisible }) => (
            <IconButton
              color="inherit"
              aria-label="menu"
              style={{
                marginLeft: -12,
                marginRight: 20,
              }}
              onClick={() => {
                if (isList) {
                  // https://github.com/callemall/material-ui/issues/5070#issuecomment-244127708
                  setVisible(true)
                } else if (props.history.length === 1) {
                  // If no history, go to list page
                  props.history.push('/')
                } else {
                  props.history.goBack()
                }
              }}
            >
              {isList ? <Menu /> : <ArrowBack />}
            </IconButton>
          )}
        </DrawerConsumer>
        <Typography variant="title" color="inherit" style={{ flexGrow: 1 }}>
          {getTitle(props.location.pathname)}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default withRouter(Header)

// @flow
import React from 'react'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { ArrowBack } from '@material-ui/icons'
import { mapper, firstScreenPaths } from '../utils'

function getTitle(pathname) {
  if (mapper[pathname]) {
    return mapper[pathname][0]
  }

  if (/^\/topic/.test(pathname)) {
    return '话题'
  }

  return '未知'
}

const Header = props => {
  // const isList = ['', 'good', 'share', 'ask', 'job'].includes(
  //   props.location.pathname.slice(1),
  // )

  return (
    <AppBar>
      <Toolbar>
        {/* <DrawerConsumer>
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
        </DrawerConsumer> */}
        {firstScreenPaths.includes(props.location.pathname) || (
          <IconButton
            color="inherit"
            style={{
              marginLeft: -12,
              marginRight: 20,
            }}
            onClick={() => {
              if (props.history.length === 1) {
                // If no history, go to list page
                props.history.push('/')
              } else {
                props.history.goBack()
              }
            }}
          >
            <ArrowBack />
          </IconButton>
        )}
        <Typography variant="title" color="inherit" style={{ flexGrow: 1 }}>
          {getTitle(props.location.pathname)}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default withRouter(Header)

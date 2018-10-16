import React from 'react'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { ArrowBack } from '@material-ui/icons'
import { mapper, firstScreenPaths } from '../utils'

const Header = ({ title, rightWidget: Widget, history }) => {
  return (
    <AppBar>
      <Toolbar variant="dense">
        <IconButton
          color="inherit"
          style={{ marginLeft: -12, marginRight: 20 }}
          onClick={() => {
            if (history.length === 1) {
              // If no history, go to homepage
              history.push('/')
            } else {
              history.goBack()
            }
          }}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="title" color="inherit" style={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <Widget />
      </Toolbar>
    </AppBar>
  )
}

export default withRouter(Header)

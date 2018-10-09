// @flow
import React from 'react'
import MUIAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { withRouter } from 'react-router-dom'
import { ArrowBack } from '@material-ui/icons'
import { DrawerConsumer } from '../contexts'

const AppBar = props => (
  <MUIAppBar position="fixed">
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
              if (props.isListPage) {
                // https://github.com/callemall/material-ui/issues/5070#issuecomment-244127708
                setVisible(false)
              } else if (props.history.length === 1) {
                // If no history, go to list page
                props.history.push('/')
              } else {
                props.history.goBack()
              }
            }}
          >
            {props.isListPage ? <MenuIcon /> : <ArrowBack />}
          </IconButton>
        )}
      </DrawerConsumer>
      <Typography variant="title" color="inherit" style={{ flexGrow: 1 }}>
        {props.title}
      </Typography>
    </Toolbar>
  </MUIAppBar>
)

export default withRouter(AppBar)

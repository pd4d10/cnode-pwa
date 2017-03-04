import React, { PropTypes } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
// import RaisedButton from 'material-ui/RaisedButton'
import { showDrawer, hideDrawer } from '../actions/drawer'

const App = props => (
  <MuiThemeProvider>
    <div>
      <AppBar
        title="Title"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        onLeftIconButtonTouchTap={() => props.dispatch(showDrawer())}
      />
      <Drawer
        docked={false}
        width={200}
        open={props.isVisible}
        onRequestChange={() => props.dispatch(hideDrawer())}
      >
        <MenuItem>
          <Link to="/">首页</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/about">关于</Link>
        </MenuItem>
      </Drawer>
      {props.children}
    </div>
  </MuiThemeProvider>
)

App.propTypes = {
  children: PropTypes.element.isRequired,
  isVisible: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = state => state.drawer

export default connect(mapStateToProps)(App)

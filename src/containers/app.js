import React, { PropTypes } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { connect } from 'react-redux'
// import { push } from 'react-router-redux'
import {
  AppBar,
  Drawer,
  List,
  ListItem,
} from 'material-ui'
// import RaisedButton from 'material-ui/RaisedButton'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { green800 } from 'material-ui/styles/colors'
import { showDrawer, hideDrawer } from '../actions/drawer'
import { fetchTopics } from '../actions/list'

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
  palette: {
    textColor: green800,
  },
  appBar: {
    color: '#444',
    height: 50,
  },
})

const App = props => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <AppBar
        title={props.title}
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        onLeftIconButtonTouchTap={() => props.dispatch(showDrawer())}
      />
      <Drawer
        docked={false}
        width={200}
        open={props.isVisible}
        onRequestChange={() => props.dispatch(hideDrawer())}
      >
        <List style={{ marginTop: '40px' }}>
          {props.tabs.map(tab => (
            <ListItem
              primaryText={tab.label}
              key={tab.value}
              onClick={() => props.dispatch(fetchTopics(tab.value))}
            />
          ))}
        </List>
      </Drawer>
      {props.children}
    </div>
  </MuiThemeProvider>
)

App.propTypes = {
  title: PropTypes.string.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  children: PropTypes.element.isRequired,
  isVisible: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

App.defaultProps = {
  tabs: [
    { label: '全部', value: 'all' },
    { label: '精华', value: 'good' },
    { label: '分享', value: 'share' },
    { label: '问答', value: 'ask' },
    { label: '招聘', value: 'job' },
  ],
}

const mapStateToProps = state => ({
  isVisible: state.drawer.isVisible,
  title: state.list.activeTab,
})

export default connect(mapStateToProps)(App)

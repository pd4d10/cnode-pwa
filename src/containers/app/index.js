import React from 'react'
import PropTypes from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { connect } from 'react-redux'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Helmet from 'react-helmet'

import { colors, tabsMap } from '../../utils'
import AppBar from '../../components/app-bar'
import Login from '../login'
import Drawer from '../drawer'
import Toast from '../../components/unfinished'
import ErrorToast from '../../containers/toast'
import * as toastActions from '../../actions/toast'

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
  palette: {
    // textColor: green800,
  },
  appBar: {
    color: colors.background,
  },
  floatingActionButton: {
    color: colors.primary,
  },
  raisedButton: {
    secondaryColor: colors.primary,
  },
})

const App = props => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <main>
      <Helmet titleTemplate="%s - CNode PWA" defaultTitle="CNode PWA" />
      <Login />
      <Drawer />
      <Toast
        isVisible={props.isToastVisible}
        feature={props.feature}
        close={() => props.dispatch(toastActions.hide())}
      />
      <AppBar
        title={props.title}
        isListPage={props.isListPage}
        dispatch={props.dispatch}
      />
      <div style={{ marginTop: '56px' }}>{props.children}</div>
      <ErrorToast />
    </main>
  </MuiThemeProvider>
)

App.propTypes = {
  title: PropTypes.string.isRequired,
  isListPage: PropTypes.bool.isRequired,
  feature: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  dispatch: PropTypes.func.isRequired,
  isToastVisible: PropTypes.bool.isRequired,
}

function getTitle(state) {
  const { pathname, query } = state.routing.locationBeforeTransitions

  switch (pathname) {
    case '/': {
      return tabsMap[query.tab] || 'CNode 社区'
    }
    case '/about':
      return '关于'
    default: {
      if (/^\/topic/.test(pathname)) {
        return '话题'
      }
      return '404'
    }
  }
}

function getIsListPage(state) {
  return state.routing.locationBeforeTransitions.pathname === '/'
}

const mapStateToProps = state => ({
  isListPage: getIsListPage(state),
  title: getTitle(state),
  input: state.auth.input,
  isLoginVisible: state.auth.isVisible,
  isToastVisible: state.toast.isVisible,
  feature: state.toast.feature,
})

export default connect(mapStateToProps)(App)

import React from 'react'
import PropTypes from 'prop-types'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { teal } from '@material-ui/core/colors'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { withRouter } from 'react-router-dom'
import { colors, tabsMap } from '../utils'
import AppBar from '../components/app-bar'
import Login from './login'
import Drawer from './drawer'
import Toast from '../components/unfinished'
import ErrorToast from './toast'
import { ListProvider, DrawerProvider } from '../contexts'

// :global(.back-enter) {
//   opacity: 0;
//   &:global(.back-enter-active) {
//     opacity: 1;
//     transition: all 1000ms;
//   }
// }

// :global(.back-leave) {
//   opacity: 1;
//   &:global(.back-leave-active) {
//     opacity: 0;
//     transition: all 1000ms;
//   }
// }

const theme = createMuiTheme({
  palette: {
    primary: teal,
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

const App = props => {
  const title = getTitle(props.location)
  const isListPage = props.location.pathname === '/'

  return (
    <ListProvider>
      <DrawerProvider>
        <MuiThemeProvider theme={theme}>
          <main>
            <Helmet titleTemplate="%s - CNode PWA" defaultTitle="CNode PWA" />
            <Login />
            <Drawer
              title={title}
              activeItem={getDrawerActiveItem(props.location)}
            />
            <Toast
              isVisible={props.isToastVisible}
              feature={props.feature}
              close={() => {}}
            />
            <AppBar
              title={title}
              isListPage={isListPage}
              dispatch={props.dispatch}
            />
            <div style={{ marginTop: '56px' }}>{props.children}</div>
            <ErrorToast />
          </main>
        </MuiThemeProvider>
      </DrawerProvider>
    </ListProvider>
  )
}

App.propTypes = {
  title: PropTypes.string.isRequired,
  isListPage: PropTypes.bool.isRequired,
  feature: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  dispatch: PropTypes.func.isRequired,
  isToastVisible: PropTypes.bool.isRequired,
}

function getTitle(location) {
  const { pathname } = location
  const params = new URLSearchParams(location.search)
  const tab = params.get('tab') || 'all'

  switch (pathname) {
    case '/': {
      return tabsMap[tab] || 'CNode 社区'
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

function getActiveItem(location) {
  const { pathname } = location
  const params = new URLSearchParams(location.search)
  const tab = params.get('tab') || 'all'
  switch (pathname) {
    case '/':
      return tab
    case '/about':
      return 'about'
    case '/message':
      return 'message'
    default: {
      if (/^\/topics/.test(pathname)) {
        return 'topics'
      }
      return undefined
    }
  }
}

function getDrawerActiveItem(location) {
  const activeItem = {
    all: false,
    good: false,
    share: false,
    ask: false,
    job: false,
    topic: false,
    message: false,
    about: false,
  }

  const key = getActiveItem(location)
  activeItem[key] = true

  return activeItem
}

const mapStateToProps = state => ({
  input: state.auth.input,
  isLoginVisible: state.auth.isVisible,
  isToastVisible: state.toast.isVisible,
  feature: state.toast.feature,
})

export default withRouter(connect(mapStateToProps)(App))

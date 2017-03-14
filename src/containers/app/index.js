import React, { PropTypes } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { connect } from 'react-redux'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import { colors } from '../../utils'
import style from './app.css'
import Login from '../login'
import Drawer from '../drawer'
import Toast from '../../components/unfinished'
import * as toastActions from '../../actions/toast'

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
  palette: {
    // textColor: green800,
  },
  appBar: {
    color: colors.primary,
  },
  floatingActionButton: {
    color: colors.primary,
  },
})

const App = props => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <main className={style.container}>
      <Login />
      <Drawer />
      <Toast
        isVisible={props.isToastVisible}
        feature={props.feature}
        close={() => props.dispatch(toastActions.hide())}
      />
      {props.children}
    </main>
  </MuiThemeProvider>
)

App.propTypes = {
  feature: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  input: state.auth.input,
  isLoginVisible: state.auth.isVisible,
  isToastVisible: state.toast.isVisible,
  feature: state.toast.feature,
})

export default connect(mapStateToProps)(App)

import React, { PropTypes } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { connect } from 'react-redux'
// import { push } from 'react-router-redux'
// import { Link } from 'react-router'
import { TextField, RaisedButton } from 'material-ui'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { colors } from '../../utils'
import style from './app.css'
import { login, hideLogin, inputToken } from '../../actions/auth'

import Drawer from '../drawer'

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
      <form style={props.isLoginVisible ? {} : { display: 'none' }} className={style.login}>
        <TextField
          value={props.input}
          floatingLabelText="Token"
          onChange={e => props.dispatch(inputToken(e.target.value))}
        />
        <RaisedButton label="登录" primary onClick={() => props.dispatch(login())} />
        <RaisedButton label="取消" secondary onClick={() => props.dispatch(hideLogin())} />
      </form>

      <Drawer />

      {/* https://github.com/ReactTraining/react-router/blob/master/examples/animations/app.js*/}
      {/* <ReactCSSTransitionGroup
        transitionName="test"
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}
      >
        {React.cloneElement(props.children, {
          key: props.location.pathname,
        })}
      </ReactCSSTransitionGroup>*/}
      {props.children}
    </main>
  </MuiThemeProvider>
)

App.propTypes = {
  input: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  isLoginVisible: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  input: state.auth.input,
  isLoginVisible: state.auth.isVisible,
})

export default connect(mapStateToProps)(App)

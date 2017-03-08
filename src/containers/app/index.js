import React, { PropTypes } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { connect } from 'react-redux'
// import { push } from 'react-router-redux'
// import { Link } from 'react-router'
import { TextField, RaisedButton } from 'material-ui'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { grey800, green500 } from 'material-ui/styles/colors'
import style from './app.css'
import { login, hideLogin, inputToken } from '../../actions/login'

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
  palette: {
    // textColor: green800,
  },
  appBar: {
    color: grey800,
  },
  floatingActionButton: {
    color: green500,
  },
})

const App = props => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div className={style.container}>
      <form style={props.isLoginVisible ? {} : { display: 'none' }} className={style.login}>
        <TextField
          value={props.input}
          floatingLabelText="Token"
          onChange={e => props.dispatch(inputToken(e.target.value))}
        />
        <RaisedButton label="登录" primary onClick={() => props.dispatch(login())} />
        <RaisedButton label="取消" secondary onClick={() => props.dispatch(hideLogin())} />
      </form>
      {props.children}
    </div>
  </MuiThemeProvider>
)

App.propTypes = {
  input: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  isLoginVisible: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  input: state.login.input,
  isLoginVisible: state.login.isVisible,
})

export default connect(mapStateToProps)(App)

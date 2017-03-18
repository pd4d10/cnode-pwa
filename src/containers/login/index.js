import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import * as authActions from '../../actions/auth'
// import { colors } from '../../utils'
// import style from './login.css'

const Login = props => (
  <Dialog
    // title="登录"
    // actions={actions}
    modal={false}
    open={props.isVisible}
    onRequestClose={() => props.dispatch(authActions.hideLogin())}
  >
    请在 PC 端登录后，点击右上角的<strong>设置</strong>进入设置页面获取 Access Token
    <TextField
      value={props.input}
      floatingLabelText="Access Token"
      onChange={e => props.dispatch(authActions.inputToken(e.target.value))}
    />
    <RaisedButton onClick={() => props.dispatch(authActions.login())}>登录</RaisedButton>
  </Dialog>
)

Login.propTypes = {
  input: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = state => state.auth

export default connect(mapStateToProps)(Login)

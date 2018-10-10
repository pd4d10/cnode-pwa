import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { withRouter } from 'react-router-dom'
// import { colors } from '../../utils'
// import style from './login.css'

// .container {
//   position: fixed;
//   top: 0;
//   left: 0;
//   background: #fff;
//   bottom: 0;
//   display: flex;
//   flex-direction: column;
//   right: 0;
//   z-index: 9999;

//   /*transform: translate(0, 10px);*/
//   transition: all 300ms;
// }

export const Login = withRouter(props => (
  <Dialog
    title="登录"
    modal={false}
    open={false}
    // onRequestClose={() => props.dispatch(authActions.hideLogin())}
  >
    请在 PC 端登录后，点击右上角的
    <strong>设置</strong>
    进入设置页面获取 Access Token
    <TextField
      value={props.input}
      floatingLabelText="Access Token"
      // onChange={e => props.dispatch(authActions.inputToken(e.target.value))}
    />
    <Button onClick={() => {}}>登录</Button>
  </Dialog>
))

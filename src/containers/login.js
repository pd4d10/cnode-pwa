import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useAuth } from '../hooks'
import { Route } from 'react-router-dom'
import QrReader from 'react-qr-reader'
// import { colors } from '../../utils'
// import style from './login.css'

export const Login = props => {
  // <Dialog
  //   title="登录"
  //   modal={false}
  //   open={false}
  //   // onRequestClose={() => props.dispatch(authActions.hideLogin())}
  // >
  //   请在 PC 端登录后，点击右上角的
  //   <strong>设置</strong>
  //   进入设置页面获取 Access Token
  //   <TextField
  //     value={props.input}
  //     floatingLabelText="Access Token"
  //     // onChange={e => props.dispatch(authActions.inputToken(e.target.value))}
  //   />
  //   <Button onClick={() => {}}>登录</Button>
  // </Dialog>

  const { verifyToken } = useAuth()

  return (
    <Route>
      {({ history }) => (
        <QrReader
          onError={console.error}
          onScan={async token => {
            console.log('scan', token)
            if (!token) return

            const isValid = await verifyToken(token)
            if (isValid) {
              history.push('/')
            }
          }}
          // style={{ width: "100%" }}
        />
      )}
    </Route>
  )
}

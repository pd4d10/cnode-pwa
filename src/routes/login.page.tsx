import { definePage } from '@norm/client'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/auth'
import QrReader from 'react-qr-reader'
// import { colors } from '../../utils'
// import style from './login.css'

export default definePage((props) => {
  const navigate = useNavigate()
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
    <QrReader
      onError={console.error}
      onScan={async (token) => {
        console.log('scan', token)
        if (!token) return

        const isValid = await verifyToken(token)
        if (isValid) {
          navigate('/')
        }
      }}
      // style={{ width: "100%" }}
    />
  )
})

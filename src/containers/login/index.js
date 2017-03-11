import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as MUI from 'material-ui'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

import * as authActions from '../../actions/auth'
import { colors } from '../../utils'
import style from './login.css'

const Login = props => (
  <div
    style={{
      visibility: props.isVisible ? 'visible' : 'hidden',
      transform: props.isVisible ? 'translate(0,0)' : `translate(0, ${document.documentElement.clientHeight}px)`,
    }}
    className={style.container}
  >
    <MUI.AppBar
      title="登录"
      iconElementLeft={
        <MUI.IconButton
          iconStyle={{
            color: colors.primary,
          }}
        >
          <NavigationClose color={colors.primary} />
        </MUI.IconButton>
      }
      onLeftIconButtonTouchTap={() => props.dispatch(authActions.hideLogin())}
      style={{
        backgroundColor: '#fff',
      }}
      titleStyle={{
        color: colors.primary,
      }}
    />
    <div>
      <MUI.TextField
        value={props.input}
        floatingLabelText="Token"
        onChange={e => props.dispatch(authActions.inputToken(e.target.value))}
      />
    </div>
  </div>
)

Login.propTypes = {
  input: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = state => state.auth

export default connect(mapStateToProps)(Login)

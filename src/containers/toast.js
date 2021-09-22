import React from 'react'
import PropTypes from 'prop-types'

/* const Toast = props => (
  <Snackbar
    open={props.isVisible}
    message={props.message}
    autoHideDuration={4000}
    onRequestClose={() => props.dispatch(toastActions.hide())}
  />
)*/

// TODO Use snackbar to show message
export const Toast = (props) => (
  <div
    style={{
      display: props.isVisible ? 'block' : 'none',
      position: 'fixed',
      width: '300px',
      top: '50%',
      left: '50%',
      marginTop: '-150px',
      marginLeft: '-150px',
    }}
  >
    <div
      style={{ fontSize: '120px', textAlign: 'center', marginBottom: '20px' }}
    >
      :(
    </div>
    <h4>无法获取数据，请检查网络</h4>
    <p>错误信息如下：</p>
    <code style={{ color: 'red' }}>{props.message}</code>
  </div>
)

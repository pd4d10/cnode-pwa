import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Snackbar } from 'material-ui'

import * as toastActions from '../../actions/toast'

const Toast = props => (
  <Snackbar
    open={props.isVisible}
    message={props.message}
    autoHideDuration={2000}
    onRequestClose={() => props.dispatch(toastActions.hide())}
  />
)

Toast.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = state => state.toast

export default connect(mapStateToProps)(Toast)

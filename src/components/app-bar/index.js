import React from 'react'; import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MUIAppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import { push, goBack } from 'react-router-redux'
import * as drawerActions from '../../actions/drawer'

// Show drawer on click
// For list page
const handleShowDrawer = dispatch => (e) => {
  // https://github.com/callemall/material-ui/issues/5070#issuecomment-244127708
  e.preventDefault()
  dispatch(drawerActions.show())
}

// Go back on click
// For other pages
const handleGoBack = dispatch => (e) => {
  e.preventDefault()

  // If no history, go to list page
  if (window.history.length === 1) {
    dispatch(push('/'))
    return
  }

  dispatch(goBack())
}

const AppBar = props => (
  <MUIAppBar
    style={{
      position: 'fixed',
      top: 0,
    }}
    iconStyleLeft={{
      width: '44px',
      height: '44px',
      marginTop: '4px',
    }}
    titleStyle={{
      fontSize: '22px',
      height: '56px',
      lineHeight: '56px',
    }}
    title={props.title}
    iconElementLeft={props.isListPage ? undefined : (
      <IconButton><ArrowBack /></IconButton>
      )}
    onLeftIconButtonTouchTap={
      props.isListPage ? handleShowDrawer(props.dispatch) : handleGoBack(props.dispatch)
    }
  />
)

AppBar.propTypes = {
  title: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  isListPage: PropTypes.bool.isRequired,
}

export default connect()(AppBar)

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { AppBar, IconButton } from 'material-ui'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import { goBack } from 'react-router-redux'

const MyAppBar = props => (
  <AppBar
    style={{
      position: 'fixed',
    }}
    title={props.title}
    iconElementLeft={<IconButton><ArrowBack /></IconButton>}
    onLeftIconButtonTouchTap={() => props.dispatch(goBack())}
  />
)

MyAppBar.propTypes = {
  title: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect()(MyAppBar)

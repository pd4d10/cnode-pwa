import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { AppBar, IconButton } from 'material-ui'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import { goBack } from 'react-router-redux'
import style from './container.css'

const Container = props => (
  <div className={style.container}>
    <AppBar
      style={{
        position: 'fixed',
      }}
      title={props.title}
      iconElementLeft={<IconButton><ArrowBack /></IconButton>}
      onLeftIconButtonTouchTap={() => props.dispatch(goBack())}
    />
    <div style={{ paddingTop: '64px' }}>
      {props.children}
    </div>
  </div>
)

Container.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect()(Container)

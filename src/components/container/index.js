import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import { push, goBack } from 'react-router-redux'
import style from './container.css'

const Container = props => (
  <div className={style.container}>
    <AppBar
      style={{
        position: 'fixed',
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
      iconElementLeft={<IconButton><ArrowBack /></IconButton>}
      onLeftIconButtonTouchTap={(e) => {
        e.preventDefault()

        // If no history, go to list page
        if (window.history.length === 1) {
          props.dispatch(push('/'))
          return
        }

        props.dispatch(goBack())
      }}
    />
    <div style={{ paddingTop: '56px' }}>
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

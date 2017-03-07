import React, { PropTypes } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { connect } from 'react-redux'
// import { push } from 'react-router-redux'
// import { Link } from 'react-router'
// import RaisedButton from 'material-ui/RaisedButton'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { grey800, green500 } from 'material-ui/styles/colors'
import style from './app.css'

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
  palette: {
    // textColor: green800,
  },
  appBar: {
    color: grey800,
  },
  floatingActionButton: {
    color: green500,
  },
})

const App = props => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div className={style.container}>
      {props.children}
    </div>
  </MuiThemeProvider>
)

App.propTypes = {
  // title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  // isVisible: PropTypes.bool.isRequired,
  // dispatch: PropTypes.func.isRequired,
}

// const mapStateToProps = state => ({
// })

export default connect()(App)

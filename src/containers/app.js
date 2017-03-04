import React, { PropTypes } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const App = ({ children }) => (
  <MuiThemeProvider>
    <div>{children}</div>
  </MuiThemeProvider>
)

App.propTypes = {
  children: PropTypes.element.isRequired,
}

export default App

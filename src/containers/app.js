import React from 'react'
import PropTypes from 'prop-types'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { teal } from '@material-ui/core/colors'
import Helmet from 'react-helmet'
import { withRouter } from 'react-router-dom'
import { colors } from '../utils'
import { Header } from '../components'
import { Drawer, Login } from './'
import { ContextProvider } from '../contexts'

// :global(.back-enter) {
//   opacity: 0;
//   &:global(.back-enter-active) {
//     opacity: 1;
//     transition: all 1000ms;
//   }
// }

// :global(.back-leave) {
//   opacity: 1;
//   &:global(.back-leave-active) {
//     opacity: 0;
//     transition: all 1000ms;
//   }
// }

const theme = createMuiTheme({
  palette: {
    primary: teal,
  },
  appBar: {
    color: colors.background,
  },
  floatingActionButton: {
    color: colors.primary,
  },
  raisedButton: {
    secondaryColor: colors.primary,
  },
})

export const App = props => {
  return (
    <ContextProvider>
      <MuiThemeProvider theme={theme}>
        <main>
          <Helmet titleTemplate="%s - CNode PWA" defaultTitle="CNode PWA" />
          <Login />
          <Drawer />
          <Header />
          <div style={{ marginTop: 56 }}>{props.children}</div>
        </main>
      </MuiThemeProvider>
    </ContextProvider>
  )
}

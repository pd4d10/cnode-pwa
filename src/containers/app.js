import React from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { teal } from '@material-ui/core/colors'
import Helmet from 'react-helmet'
import { BrowserRouter, Route } from 'react-router-dom'
// import injectTapEventPlugin from 'react-tap-event-plugin'
import { Home, Detail, Login, Message, Post } from './'
import { colors } from '../utils'
import { ContextProvider, withContext, AuthConsumer } from '../contexts'

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

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <ContextProvider>
          <MuiThemeProvider theme={theme}>
            <main>
              <Helmet titleTemplate="%s - CNode PWA" defaultTitle="CNode PWA" />
              <div style={{ marginTop: 48, marginBottom: 56 }}>
                <Route exact path="/" component={Home} />
                <Route exact path="/message" component={Message} />
                <Route path="/topic/:id" component={Detail} />
                <Route path="/login" component={Login} />
                <Route path="/post" component={Post} />

                {/* <Switch>
                  <Route path="/messages" component={Message} />
                  <Route path="/settings" component={Message} />
                  <Route path="/about" component={About} />
                  <Route path="/user/:name" component={User} />
                  <Route component={NotFound} />
                </Switch> */}
              </div>

              <div style={{ marginTop: 56 }} />
            </main>
          </MuiThemeProvider>
        </ContextProvider>
      </BrowserRouter>
    )
  }
}

export default withContext(AuthConsumer)(App)

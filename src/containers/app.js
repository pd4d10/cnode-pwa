import React from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { teal } from '@material-ui/core/colors'
import Helmet from 'react-helmet'
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
  withRouter,
} from 'react-router-dom'
// import injectTapEventPlugin from 'react-tap-event-plugin'
import {
  List,
  Detail,
  About,
  NotFound,
  User,
  Message,
  Drawer,
  Login,
  Navigation,
} from './'
import { colors } from '../utils'
import { Header } from '../components'
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
    <BrowserRouter>
      <ContextProvider>
        <MuiThemeProvider theme={theme}>
          <main>
            <Helmet titleTemplate="%s - CNode PWA" defaultTitle="CNode PWA" />
            <Login />
            {/* <Drawer /> */}
            <Header />

            <div style={{ marginTop: 56, marginBottom: 56 }}>
              <Route exact path="/" component={List} />
              <Route path="/good" component={List} />
              <Route path="/share" component={List} />
              <Route path="/ask" component={List} />
              <Route path="/job" component={List} />
              <Route path="/messages" component={Message} />
              <Route path="/settings" component={Message} />
              <Route path="/about" component={About} />
            </div>

            <div style={{ marginTop: 56 }}>
              <Route path="/topic/:id" component={Detail} />
              <Route path="/user/:name" component={User} />
            </div>
            {/* <Route component={NotFound} /> */}
            <Navigation />
          </main>
        </MuiThemeProvider>
      </ContextProvider>
    </BrowserRouter>
  )
}

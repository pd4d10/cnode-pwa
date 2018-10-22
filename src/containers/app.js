import React from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { colors } from '@material-ui/core'
import Helmet from 'react-helmet'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {
  Home,
  Detail,
  Login,
  Message,
  Post,
  User,
  About,
  NotFound,
  Hint,
} from './'
// import { colors } from '../utils'
import { ContextProvider, AuthConsumer } from '../contexts'
import { withContext } from '../utils'

const theme = createMuiTheme({
  palette: {
    primary: colors.teal,
    secondary: colors.grey,
  },
  appBar: {
    // color: colors.background,
  },
  floatingActionButton: {
    // color: colors.primary,
  },
  raisedButton: {
    // secondaryColor: colors.primary,
  },
})

class App extends React.Component {
  componentDidCatch(error, info) {
    console.log(error, info)
  }

  render() {
    return (
      <BrowserRouter>
        <ContextProvider>
          <MuiThemeProvider theme={theme}>
            <main>
              <Helmet titleTemplate="%s - CNode社区" />
              <div style={{ marginTop: 48 }}>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/message" component={Message} />
                  <Route path="/topic/:id" component={Detail} />
                  <Route path="/login" component={Login} />
                  <Route path="/post" component={Post} />
                  <Route path="/about" component={About} />
                  <Route path="/user/:loginname" component={User} />
                  <Route component={NotFound} />
                </Switch>
              </div>
              <Hint />
            </main>
          </MuiThemeProvider>
        </ContextProvider>
      </BrowserRouter>
    )
  }
}

export default withContext(AuthConsumer)(App)

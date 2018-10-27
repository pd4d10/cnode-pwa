import React, { useEffect } from 'react'
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
import { useAuth } from '../hooks'
// import { colors } from '../utils'

const theme = createMuiTheme({
  palette: {
    primary: colors.teal,
    secondary: colors.grey,
  },
  typography: {
    useNextVariants: true,
  },
})

export const App = () => {
  const { verifyToken } = useAuth()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      verifyToken(token)
    }
  }, [])

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}

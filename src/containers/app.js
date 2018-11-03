import React, { useEffect } from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { colors } from '@material-ui/core'
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
import { useAuth, useTopic } from '../hooks'
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
  // const { topics } = useTopic()
  const { verifyToken, fetchUnreadCount } = useAuth()

  useEffect(async () => {
    const token = localStorage.getItem('token')
    if (token) {
      const isValid = await verifyToken(token)
      if (isValid) {
        fetchUnreadCount(token)
      }
    }
  }, [])

  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <main>
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

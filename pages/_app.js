import React, { useEffect } from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { colors } from '@material-ui/core'
import { useAuth, useTopic } from '../src/hooks'
// import { colors } from '../utils'
import '../styles/globals.css'

const theme = createMuiTheme({
  palette: {
    primary: colors.teal,
    secondary: colors.grey,
  },
  typography: {
    useNextVariants: true,
  },
})

const App = ({ Component, pageProps }) => {
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
    <MuiThemeProvider theme={theme}>
      <main>
        <div style={{ marginTop: 48 }}>
          <Component {...pageProps} />
        </div>
      </main>
    </MuiThemeProvider>
  )
}

export default App

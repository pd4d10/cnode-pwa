import React, { useEffect } from 'react'
import {
  createTheme,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  adaptV4Theme,
} from '@mui/material/styles'
import { colors } from '@mui/material'
import { useAuth, useTopic } from '../src/hooks'
// import { colors } from '../utils'
import '../styles/globals.css'

const theme = createTheme(
  adaptV4Theme({
    palette: {
      primary: colors.teal,
      secondary: colors.grey,
    },
    typography: {
      // useNextVariants: true,
    },
  }),
)

const App = ({ Component, pageProps }) => {
  // const { topics } = useTopic()
  const { verifyToken, fetchUnreadCount } = useAuth()

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        const isValid = await verifyToken(token)
        if (isValid) {
          fetchUnreadCount(token)
        }
      }
    }
    init()
  }, [])

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <main>
          <div style={{ marginTop: 48 }}>
            <Component {...pageProps} />
          </div>
        </main>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default App

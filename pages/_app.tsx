import React, { useEffect } from 'react'
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from '@mui/material/styles'
import { colors } from '@mui/material'
import { useAuth } from '../src/hooks'
import '../styles/globals.css'
import { AppType } from 'next/dist/shared/lib/utils'

const theme = createTheme({
  palette: {
    primary: colors.teal,
    secondary: colors.grey,
  },
  typography: {
    // useNextVariants: true,
  },
})

const App: AppType = ({ Component, pageProps }) => {
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

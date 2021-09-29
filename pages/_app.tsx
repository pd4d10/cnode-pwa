import React, { useEffect } from 'react'
import { useAuth } from '../src/hooks'
import '../styles/globals.css'
import { AppType } from 'next/dist/shared/lib/utils'

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
    <main>
      <div style={{ marginTop: 48 }}>
        <Component {...pageProps} />
      </div>
    </main>
  )
}

export default App

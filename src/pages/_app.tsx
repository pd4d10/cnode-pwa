import { useEffect } from 'react'
import { useAuth } from '../hooks/auth'
import './globals.css'
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
      <Component {...pageProps} />
    </main>
  )
}

export default App

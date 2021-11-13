import { useEffect } from 'react'
import { defineLayout } from '@norm/client'
import { useAuth } from '@/hooks/auth'
import './globals.css'

import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default defineLayout(({ children }) => {
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
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
})

import { Suspense, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import { useAuth } from '@/hooks/auth'
import { QueryClient, QueryClientProvider } from 'react-query'
import './globals.css'
import routes from '~react-pages'

const queryClient = new QueryClient()

const App = () => {
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
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>
    </QueryClientProvider>
  )
}

const root = createRoot(document.getElementById('root')!)
root.render(
  <Router>
    <App />
  </Router>
)

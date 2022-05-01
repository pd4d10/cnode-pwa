import { Suspense, useEffect } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import routes from '~react-pages'
import { useAuth } from '@/hooks/auth'
import { QueryClient, QueryClientProvider } from 'react-query'
import './globals.css'

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
    <Router>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>
      </QueryClientProvider>
    </Router>
  )
}

render(<App />, document.getElementById('root'))

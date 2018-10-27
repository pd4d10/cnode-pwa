import { useState } from 'react'
import { fetchAPI } from '../utils'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [loginname, setLoginname] = useState(null)
  const [count, setCount] = useState(0)

  const queueAfterToken = []

  const runAfterTokenVerified = callback => {
    queueAfterToken.push(callback)
  }

  const fetchUnreadCount = async token => {
    const { data } = await fetchAPI('/message/count?accesstoken=' + token)
    setCount(data)
    setTimeout(() => {
      fetchUnreadCount(token)
    }, 10000)
  }

  const verifyToken = async token => {
    try {
      const { id, loginname, avatar_url } = await fetchAPI('/accesstoken', {
        accesstoken: token,
      })
      setToken(token)
      setLoginname(loginname)
      fetchUnreadCount(token)
      localStorage.setItem('token', token)
      // queueAfterToken.forEach(callback => callback())
      // queueAfterToken = []
      return true
    } catch (err) {
      return false
    }
  }

  return {
    token,
    loginname,
    count,
    fetchUnreadCount,
    runAfterTokenVerified,
    verifyToken,
  }
}

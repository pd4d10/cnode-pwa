import { useState } from 'react'

export const useHint = () => {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState('')

  const show = (message) => {
    setMessage(message)
    setVisible(true)
  }

  const hide = () => {
    setVisible(false)
  }

  return {
    visible,
    message,
    show,
    hide,
  }
}

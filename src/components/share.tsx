import { SendOutline } from 'antd-mobile-icons'
import React from 'react'
import { useHint } from '../hooks'
import { copy } from '../utils'

export const ShareTo = ({ text }) => {
  const { show } = useHint()

  return (
    <a
      color="default"
      onClick={() => {
        if (navigator.share) {
          navigator.share({
            title: text,
            text: text,
            url: window.location.href,
          })
        } else {
          copy(window.location.href)
          show('链接已复制至剪贴板')
        }
      }}
    >
      <SendOutline />
    </a>
  )
}

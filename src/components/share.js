import React from 'react'
import { IconButton } from '@material-ui/core'
import { Share } from '@material-ui/icons'
import { HintConsumer } from '../contexts'
import { copy } from '../utils'

export const ShareTo = ({ text }) => (
  <HintConsumer>
    {({ show }) => (
      <IconButton
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
        <Share />
      </IconButton>
    )}
  </HintConsumer>
)

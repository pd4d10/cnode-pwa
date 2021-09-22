import React from 'react'
import {
  Forum,
  ThumbUp,
  Share,
  LiveHelp,
  SwitchCamera,
  Notifications,
  Settings,
  Info,
} from '@material-ui/icons'

export const colors = {
  background: '#444',
  primary: '#80bd01',
  tag: '#80bd01',
  avatarBorder: '#80bd01',
  avatarBackground: '#f5f5f5',
}

export async function fetchAPI(url, body) {
  let options = {}
  // if body passed in then use posts
  if (body) {
    options.method = 'POST'
    options.headers = {
      // 'Content-Type': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    }
    // options.body = JSON.stringify(body)
    options.body = new URLSearchParams(body).toString()
  }

  const res = await fetch(`https://cnodejs.org/api/v1${url}`, options)
  const json = await res.json()

  if (!json.success) {
    throw new Error(json.error_msg)
  }

  return json
}

export const tabData = [
  {
    id: 'all',
    title: '全部',
    Icon: Forum,
  },
  {
    id: 'good',
    title: '精华',
    Icon: ThumbUp,
  },
  {
    id: 'share',
    title: '分享',
    Icon: Share,
  },
  {
    id: 'ask',
    title: '问答',
    Icon: LiveHelp,
  },
  {
    id: 'job',
    title: '招聘',
    Icon: SwitchCamera,
  },
]

export function getCurrentTab() {
  const params = new URLSearchParams('') // TODO:
  return params.get('tab') || 'all'
}

export function copy(text) {
  const $ = document.createElement('textarea')
  $.value = text
  document.body.appendChild($)
  $.select()
  document.execCommand('copy')
  document.body.removeChild($)
}

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

export const withContext = Consumer => Component => props => (
  <Consumer>{contexts => <Component {...contexts} {...props} />}</Consumer>
)

export const tabData = [
  {
    pathname: '/',
    title: '社区',
    Icon: Forum,
  },
  {
    pathname: '/good',
    title: '精华',
    Icon: ThumbUp,
  },
  {
    pathname: '/share',
    title: '分享',
    Icon: Share,
  },
  {
    pathname: '/ask',
    title: '问答',
    Icon: LiveHelp,
  },
  {
    pathname: '/job',
    title: '招聘',
    Icon: SwitchCamera,
  },
]

export const tabs = ['all', 'good', 'share', 'ask', 'job']

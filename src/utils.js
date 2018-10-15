import React from 'react'
import {
  Person,
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

export async function fetchAPI(url, options) {
  const res = await fetch(`https://cnodejs.org/api/v1${url}`, options)
  const json = await res.json()

  if (!json.success) {
    throw new Error(json.error_msg)
  }

  return json
}

export const mapper = {
  '/': ['CNode 社区', Forum],
  '/good': ['精华', ThumbUp],
  '/share': ['分享', Share],
  '/ask': ['问答', LiveHelp],
  '/job': ['招聘', SwitchCamera],
  '/message': ['消息', Notifications],
  '/setting': ['设置', Settings],
  '/about': ['关于', Info],
}

export const tabsData = Object.entries(mapper)

export const withContext = (Consumer, Component) => props => (
  <Consumer>{contexts => <Component {...contexts} {...props} />}</Consumer>
)

export const navigationData = [
  {
    pathname: '/',
    title: '社区',
    Icon: Forum,
  },
  {
    pathname: '/message',
    title: '消息',
    Icon: Notifications,
  },
  {
    pathname: '/settings',
    title: '设置',
    Icon: Settings,
  },
  {
    pathname: '/about',
    title: '关于',
    Icon: Info,
  },
]

export const firstScreenPaths = ['/', '/message', '/settings', '/about']

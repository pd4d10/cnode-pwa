import { Toast } from 'antd-mobile'

export const colors = {
  background: '#444',
  primary: '#80bd01',
  tag: '#80bd01',
  avatarBorder: '#80bd01',
  avatarBackground: '#f5f5f5',
}

export async function fetchAPI(url: string, body?: Record<string, string>) {
  const options: RequestInit = {}
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

export function copy(text: string) {
  const $ = document.createElement('textarea')
  $.value = text
  document.body.appendChild($)
  $.select()
  document.execCommand('copy')
  document.body.removeChild($)
}

export function shareCurrentUrl(text: string) {
  if (navigator.share) {
    return navigator.share({
      title: text,
      text: text,
      url: window.location.href,
    })
  } else {
    copy(window.location.href)
    Toast.show('链接已复制至剪贴板')
  }
}

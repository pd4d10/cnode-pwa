export const colors = {
  background: '#444',
  primary: '#80bd01',
  tag: '#80bd01',
  avatarBorder: '#80bd01',
  avatarBackground: '#f5f5f5',
}

export async function fetchAPI(url: string, body?: Record<string, string>) {
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
  },
  {
    id: 'good',
    title: '精华',
  },
  {
    id: 'share',
    title: '分享',
  },
  {
    id: 'ask',
    title: '问答',
  },
  {
    id: 'job',
    title: '招聘',
  },
]

export function copy(text) {
  const $ = document.createElement('textarea')
  $.value = text
  document.body.appendChild($)
  $.select()
  document.execCommand('copy')
  document.body.removeChild($)
}

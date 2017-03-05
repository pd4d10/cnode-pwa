const tabsMap = {
  all: '全部',
  good: '精华',
  share: '分享',
  ask: '问答',
  job: '招聘',
}

export const tabs = Object.keys(tabsMap).map(key => ({
  key,
  value: tabsMap[key],
}))

export function getTagFromTopic({ top, good, tab }) {
  if (top) {
    return '置顶'
  }

  if (good) {
    return '精华'
  }

  return tabsMap[tab] || '未知'
}

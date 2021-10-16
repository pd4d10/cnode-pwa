import { definePage, Helmet } from '@norm/app'
import { List } from 'antd-mobile'
import { FC } from 'react'
import { ReactComponent as Logo } from '../cnodejs.svg'
import { Header } from '@/components/header'

const Linker: FC<{ title: string; url: string; description?: string }> = ({
  title,
  url,
  description = url,
}) => (
  <List.Item
    clickable
    description={description}
    onClick={() => {
      window.open(url)
    }}
  >
    {title}
  </List.Item>
)

export default definePage(() => {
  return (
    <>
      <Helmet>
        <title>关于</title>
      </Helmet>
      <Header>关于</Header>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px 0',
        }}
      >
        <Logo style={{ width: '70%' }} />
      </div>
      <List>
        <Linker title="源代码" url="https://github.com/pd4d10/cnode-pwa" />
        <Linker title="关于 CNode 社区" url="https://cnodejs.org/about" />
        <Linker
          title="License"
          url="https://github.com/pd4d10/cnode-pwa/blob/master/LICENSE"
          description="MIT"
        />
      </List>
    </>
  )
})

import { definePage, Head, Link } from '@norm/app'
import { List } from 'antd-mobile'
import { FC } from 'react'
import { ReactComponent as Logo } from '../cnodejs.svg'
import { Header } from '../components/header'

const Linker: FC<{ title: string; url: string; description?: string }> = ({
  title,
  url,
  description = url,
}) => (
  <Link href={url}>
    <List.Item clickable description={description}>
      {title}
    </List.Item>
  </Link>
)

export default definePage(() => {
  return (
    <>
      <Head>
        <title>关于</title>
      </Head>
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

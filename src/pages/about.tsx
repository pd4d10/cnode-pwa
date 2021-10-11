import { definePage } from '@norm/app'
import { Divider, List } from 'antd-mobile'
import { useEffect } from 'react'
// import { ReactComponent as Logo } from '../cnodejs.svg'
import { Header } from '../components/header'

// Add rel="noopener noreferrer" for security
// See https://mathiasbynens.github.io/rel-noopener/
const Linker = (props) => (
  <List.Item
    onClick={() => {
      // href={props.url}
    }}
    // target="_blank"
    // rel="noopener noreferrer"
    extra={props.url}
  >
    {props.title}
  </List.Item>
)

export default definePage(() => {
  useEffect(() => {
    document.title = '关于'
  }, [])

  return (
    <>
      <Header>关于</Header>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px 0',
        }}
      >
        {/* <Logo style={{ width: '70%' }} /> */}
      </div>
      <Divider />
      <Linker title="源代码" url="https://github.com/pd4d10/cnode-pwa" />
      <Divider />
      <Linker title="关于 CNode 社区" url="https://cnodejs.org/about" />
      <Divider />
      <List.Item extra="MIT">License</List.Item>
      <Divider />
    </>
  )
})

import { Divider, List } from 'antd-mobile'
import React, { useEffect } from 'react'
// import { ReactComponent as Logo } from '../cnodejs.svg'
import { Header } from '../src/components'

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

const About = () => {
  useEffect(() => {
    document.title = '关于'
  }, [])

  return (
    <>
      <Header title="关于" />
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
}

export default About

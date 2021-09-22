import React, { useEffect } from 'react'
import { ListItem, ListItemText, Divider } from '@material-ui/core'
import { ReactComponent as Logo } from '../cnodejs.svg'
import { Header } from '../components'

// Add rel="noopener noreferrer" for security
// See https://mathiasbynens.github.io/rel-noopener/
const Linker = (props) => (
  <ListItem
    button
    component="a"
    href={props.url}
    target="_blank"
    rel="noopener noreferrer"
  >
    <ListItemText primary={props.title} secondary={props.url} />
  </ListItem>
)

export const About = () => {
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
        <Logo style={{ width: '70%' }} />
      </div>
      <Divider />
      <Linker title="源代码" url="https://github.com/pd4d10/cnode-pwa" />
      <Divider />
      <Linker title="关于 CNode 社区" url="https://cnodejs.org/about" />
      <Divider />
      <ListItem button>
        <ListItemText primary="License" secondary="MIT" />
      </ListItem>
      <Divider />
    </>
  )
}

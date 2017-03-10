import React from 'react'
import { List, ListItem, Divider } from 'material-ui'
import Container from '../../components/container'
import Logo from './logo'
import style from './about.css'

// Add rel="noopener noreferrer" for security
// See https://mathiasbynens.github.io/rel-noopener/
const Linker = props => (
  <a href={props.url} target="_blank" rel="noopener noreferrer">
    <ListItem
      primaryText={props.title}
      secondaryText={props.url}
    />
  </a>
)

const About = () => (
  <Container title="关于">
    <div className={style.logo}><Logo /></div>
    <List>
      <Divider />
      <Linker title="源代码" url="https://github.com/pd4d10/cnode-pwa" />
      <Divider />
      <Linker title="关于 CNode 社区" url="https://cnodejs.org/about" />
      <Divider />
      <ListItem primaryText="License" secondaryText="MIT" />
      <Divider />
    </List>
  </Container>
)

export default About

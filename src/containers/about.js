import React from 'react'
import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Helmet from 'react-helmet'
import { ReactComponent as Logo } from '../cnodejs.svg'

// Add rel="noopener noreferrer" for security
// See https://mathiasbynens.github.io/rel-noopener/
const Linker = props => (
  <a href={props.url} target="_blank" rel="noopener noreferrer">
    <ListItem button>
      <ListItemText primary={props.title} secondary={props.url} />
    </ListItem>
  </a>
)

export const About = () => (
  <>
    <Helmet title="关于" />
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

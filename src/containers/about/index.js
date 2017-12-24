import React from 'react'
import PropTypes from 'prop-types'
import ListItem from 'material-ui/List/ListItem'
import Divider from 'material-ui/Divider'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Logo from './logo'

// Add rel="noopener noreferrer" for security
// See https://mathiasbynens.github.io/rel-noopener/
const Linker = props => (
  <a href={props.url} target="_blank" rel="noopener noreferrer">
    <ListItem primaryText={props.title} secondaryText={props.url} />
  </a>
)

Linker.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;

  & svg {
    width: 70%;
  }
`

const About = () => (
  <div>
    <Helmet title="关于" />
    <LogoWrapper>
      <Logo />
    </LogoWrapper>
    <Divider />
    <Linker title="源代码" url="https://github.com/pd4d10/cnode-pwa" />
    <Divider />
    <Linker title="关于 CNode 社区" url="https://cnodejs.org/about" />
    <Divider />
    <ListItem primaryText="License" secondaryText="MIT" />
    <Divider />
  </div>
)

export default About

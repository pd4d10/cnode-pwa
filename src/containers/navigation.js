import React from 'react'
import { withRouter } from 'react-router-dom'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import {
  Person,
  Forum,
  ThumbUp,
  Share,
  LiveHelp,
  SwitchCamera,
  Notifications,
  Settings,
  Info,
} from '@material-ui/icons'
import { navigationData, firstScreenPaths } from '../utils'

const Navigation = props => {
  const value = firstScreenPaths.indexOf(props.location.pathname)

  if (value === -1) {
    return null
  }

  return (
    <BottomNavigation
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        boxShadow: '0 -1px 4px rgba(0,0,0,.1)',
      }}
      value={value}
      onChange={(_, index) => {
        props.history.push(navigationData[index].pathname)
      }}
    >
      {navigationData.map(({ pathname, title, Icon }) => (
        <BottomNavigationAction
          key={title}
          showLabel
          label={title}
          icon={<Icon />}
        />
      ))}
    </BottomNavigation>
  )
}
export default withRouter(Navigation)

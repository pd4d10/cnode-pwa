import React from 'react'
import {
  AppBar,
  Typography,
  Button,
  Toolbar,
  IconButton,
  Badge,
  Tabs,
  Tab,
  withStyles,
} from '@material-ui/core'
import { useRouter } from 'next/router'
import { ArrowBack } from '@material-ui/icons'
import { tabData, getCurrentTab } from '../utils'
import { useAuth } from '../hooks'
import { Close, Edit, Notifications, AccountCircle } from '@material-ui/icons'
// import { ReactComponent as Logo } from '../cnodejs.svg'

const appBarStyle = {
  background: '#fff',
  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.2)',
}

export const Header = ({ title, rightWidget: Widget }) => {
  const router = useRouter()
  return (
    <AppBar color="default" style={appBarStyle}>
      <Toolbar variant="dense" disableGutters>
        <IconButton
          onClick={() => {
            if (history.length === 1) {
              // If no history, go to homepage
              router.push('/')
            } else {
              router.goBack()
            }
          }}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" color="textSecondary" style={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {Widget && <Widget />}
      </Toolbar>
    </AppBar>
  )
}

export const HomeHeader = () => {
  const router = useRouter()
  const { count, loginname } = useAuth()

  return (
    <AppBar
      color="default"
      position="sticky"
      style={{
        ...appBarStyle,
        top: -48,
      }}
    >
      <Toolbar variant="dense" disableGutters>
        <IconButton>{/* <Logo height={24} /> */}</IconButton>
        <Typography variant="h6" color="textSecondary" style={{ flexGrow: 1 }}>
          {''}
        </Typography>

        <>
          <IconButton
            color="default"
            onClick={() => {
              router.push('/message')
            }}
          >
            {count ? (
              <Badge badgeContent={count} color="secondary">
                <Notifications />
              </Badge>
            ) : (
              <Notifications />
            )}
          </IconButton>
          <IconButton
            color="default"
            onClick={() => {
              router.push(loginname ? `/user/${loginname}` : '/login')
            }}
          >
            <AccountCircle />
          </IconButton>
        </>
      </Toolbar>
      <Tabs
        style={{ background: '#fff' }}
        value={getCurrentTab()}
        onChange={(_, value) => {
          // debugger
          history.push(value === 'all' ? '/' : '/?tab=' + value)
        }}
        indicatorColor="primary"
        textColor="primary"
        fullWidth
      >
        {tabData.map(({ id, title }) => (
          <Tab key={id} label={title} value={id} />
        ))}
      </Tabs>
    </AppBar>
  )
}

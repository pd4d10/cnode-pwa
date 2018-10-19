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
import { Route } from 'react-router-dom'
import { ArrowBack } from '@material-ui/icons'
import { tabData, tabs } from '../utils'
import { TopicConsumer, AuthConsumer } from '../contexts'
import { Close, Edit, Notifications, AccountCircle } from '@material-ui/icons'
import { ReactComponent as Logo } from '../logo.svg'

const StyledAppBar = withStyles({
  colorDefault: {
    backgroundColor: '#fff',
  },
})(AppBar)

export const Header = ({ title, rightWidget: Widget }) => {
  return (
    <StyledAppBar color="default">
      <Toolbar variant="dense" disableGutters>
        <Route>
          {({ history }) => (
            <IconButton
              onClick={() => {
                if (history.length === 1) {
                  // If no history, go to homepage
                  history.push('/')
                } else {
                  history.goBack()
                }
              }}
            >
              <ArrowBack />
            </IconButton>
          )}
        </Route>
        <Typography
          variant="title"
          color="textSecondary"
          style={{ flexGrow: 1 }}
        >
          {title}
        </Typography>
        <Widget />
      </Toolbar>
    </StyledAppBar>
  )
}

export const HomeHeader = () => (
  <Route>
    {({ history }) => (
      <StyledAppBar color="default" position="sticky" style={{ top: -48 }}>
        <Toolbar variant="dense" disableGutters>
          <IconButton>
            <Logo width={24} height={24} />
          </IconButton>
          <div style={{ flexGrow: 1 }} />
          <IconButton
            color="default"
            onClick={() => {
              history.push('/message')
            }}
          >
            <AuthConsumer>
              {({ count }) =>
                count ? (
                  <Badge badgeContent={count} color="secondary">
                    <Notifications />
                  </Badge>
                ) : (
                  <Notifications />
                )
              }
            </AuthConsumer>
          </IconButton>
          <IconButton color="default">
            <AccountCircle />
          </IconButton>
        </Toolbar>
        <TopicConsumer>
          {({ currentIndex }) => (
            <Tabs
              style={{ background: '#fff' }}
              value={currentIndex}
              onChange={(_, index) => {
                history.push(index === 0 ? '/' : '/?tab=' + tabs[index])
              }}
              indicatorColor="primary"
              textColor="primary"
              fullWidth
            >
              {tabData.map(({ id, title }) => (
                <Tab key={id} label={title} />
              ))}
            </Tabs>
          )}
        </TopicConsumer>
      </StyledAppBar>
    )}
  </Route>
)

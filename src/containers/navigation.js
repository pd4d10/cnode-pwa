import React from 'react'
import { withRouter } from 'react-router-dom'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { tabData, tabs } from '../utils'
import { TopicConsumer } from '../contexts'

class Navigation extends React.Component {
  render() {
    return (
      <TopicConsumer>
        {({ setScrollY, currentIndex }) => (
          <BottomNavigation
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              boxShadow: '0 -1px 4px rgba(0,0,0,.1)',
            }}
            value={currentIndex}
            onChange={(_, index) => {
              console.log(window.scrollY)
              setScrollY(window.scrollY)

              if (index === 0) {
                this.props.history.push('/')
              }
              this.props.history.push('/?tab=' + tabs[index])
            }}
          >
            {tabData.map(({ pathname, title, Icon }) => (
              <BottomNavigationAction
                showLabel
                key={title}
                label={title}
                icon={<Icon />}
              />
            ))}
          </BottomNavigation>
        )}
      </TopicConsumer>
    )
  }
}

export default withRouter(Navigation)

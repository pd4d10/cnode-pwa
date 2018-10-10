import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
// import injectTapEventPlugin from 'react-tap-event-plugin'
import { App, List, Detail, About, NotFound, User, Message } from './containers'
import 'github-markdown-css'
import './index.css'
import * as serviceWorker from './serviceWorker'

const __PROD__ = process.env.NODE_ENV === 'production' // eslint-disable-line

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin()

if (!__PROD__) {
  // window.Perf = require('react-addons-perf') // eslint-disable-line
  // require('why-did-you-update').whyDidYouUpdate(React)
}

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Switch>
        <Route exact path="/" component={List} />
        <Route path="/good" component={List} />
        <Route path="/share" component={List} />
        <Route path="/ask" component={List} />
        <Route path="/job" component={List} />
        <Route path="/topic/:id" component={Detail} />
        {/* <Route path="/user/:name" component={User} />*/}
        {/* <Route path="/messages" component={Message} />*/}
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>

      {/* <BottomNavigation
          value="abc"
          onChange={() => {}}
        >
          <BottomNavigationAction
            label="Recents"
            value="recents"
            icon={<RestoreIcon />}
          />
          <BottomNavigationAction
            label="Favorites"
            value="favorites"
            icon={<FavoriteIcon />}
          />
          <BottomNavigationAction
            label="Nearby"
            value="nearby"
            icon={<LocationOnIcon />}
          />
          <BottomNavigationAction
            label="Folder"
            value="folder"
            icon={<Icon>folder</Icon>}
          />
        </BottomNavigation> */}
    </App>
  </BrowserRouter>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()

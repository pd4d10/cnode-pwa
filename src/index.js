import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import Icon from '@material-ui/core/Icon'
import RestoreIcon from '@material-ui/icons/Restore'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LocationOnIcon from '@material-ui/icons/LocationOn'

import thunk from 'redux-thunk'
// import injectTapEventPlugin from 'react-tap-event-plugin'
import App from './containers/app'
import List from './containers/list'
import Detail from './containers/detail'
// import User from './containers/user'
import NotFound from './containers/not-found'
// import Message from './containers/message'
import About from './containers/about'
import reducers from './reducers'
import 'github-markdown-css'
import './index.css'
import * as serviceWorker from './serviceWorker'

const __PROD__ = process.env.NODE_ENV === 'production' // eslint-disable-line

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // eslint-disable-line

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

if (!__PROD__) {
  // window.Perf = require('react-addons-perf') // eslint-disable-line
  // require('why-did-you-update').whyDidYouUpdate(React)
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={List} />
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
    </Router>
  </Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()

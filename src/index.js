import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import injectTapEventPlugin from 'react-tap-event-plugin'
import App from './containers/app'
import List from './containers/list'
import Detail from './containers/detail'
import User from './containers/user'
import NotFound from './containers/not-found'
import Message from './containers/message'
import About from './containers/about'
import reducers from './reducers'
import './index.css'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // eslint-disable-line

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(
    routerMiddleware(hashHistory),
    thunk,
  )),
)

const history = syncHistoryWithStore(hashHistory, store)

if (process.env.NODE_ENV !== 'production') {
  window.Perf = require('react-addons-perf')
  // require('why-did-you-update').whyDidYouUpdate(React)
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={List} />
        <Route path="/topic/:id" component={Detail} />
        <Route path="/user/:name" component={User} />
        <Route path="/messages" component={Message} />
        <Route path="/about" component={About} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
)

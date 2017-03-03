import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import Immutable from 'seamless-immutable'
import thunk from 'redux-thunk'
import List from './containers/list'
import reducers from './reducers'
import './index.css'

const presistedState = Immutable({
  list: {
    isFetching: false,
    topics: [],
  },
})

const middlewares = [thunk]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // eslint-disable-line
const store = createStore(
  reducers,
  presistedState,
  composeEnhancers(applyMiddleware(...middlewares)),
)

ReactDOM.render(
  <Provider store={store}>
    <List />
  </Provider>,
  document.getElementById('root'),
)

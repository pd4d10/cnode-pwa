import React from 'react'
import ReactDOM from 'react-dom'
import 'github-markdown-css'
import './index.css'
import { App } from './containers'
import * as serviceWorker from './service-worker'

const __PROD__ = process.env.NODE_ENV === 'production' // eslint-disable-line

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin()

if (!__PROD__) {
  // window.Perf = require('react-addons-perf') // eslint-disable-line
  // require('why-did-you-update').whyDidYouUpdate(React)
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()

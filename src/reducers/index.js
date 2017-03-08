import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import list from './list'
import detail from './detail'
import drawer from './drawer'
import user from './user'
import login from './login'
import message from './message'

export default combineReducers({
  routing,
  list,
  detail,
  drawer,
  user,
  login,
  message,
})

import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import list from './list'
import detail from './detail'
import drawer from './drawer'
import user from './user'
import auth from './auth'
import message from './message'
import toast from './toast'

export default combineReducers({
  routing,
  list,
  detail,
  drawer,
  user,
  auth,
  message,
  toast,
})

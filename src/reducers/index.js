import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import list from './list'
import detail from './detail'
import drawer from './drawer'

export default combineReducers({
  list,
  detail,
  drawer,
  routing,
})

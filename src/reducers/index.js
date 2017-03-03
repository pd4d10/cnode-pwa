import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import list from './list'
import detail from './detail'

export default combineReducers({
  list,
  detail,
  routing,
})

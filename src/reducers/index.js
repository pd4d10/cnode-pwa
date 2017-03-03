import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import list from './list'

export default combineReducers({
  list,
  routing,
})

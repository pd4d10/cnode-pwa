import * as drawerTypes from '../actions/drawer'
import * as listTypes from '../actions/list'
import * as messageTypes from '../actions/message'

export default function list(state = {}, action) {
  switch (action.type) {
    case drawerTypes.SHOW:
      return state.set('isVisible', true)
    case drawerTypes.HIDE:
    case listTypes.LOAD_START:
    case messageTypes.LOAD_SUCCESS:
      return state.set('isVisible', false)
    default:
      return state
  }
}

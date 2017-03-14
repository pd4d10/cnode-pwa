import * as drawerTypes from '../actions/drawer'
import * as listTypes from '../actions/list'
import * as messageTypes from '../actions/message'
import * as authTypes from '../actions/auth'

export default function list(state = {
  isVisible: false,
}, action) {
  switch (action.type) {
    case drawerTypes.SHOW:
      return {
        ...state,
        isVisible: true,
      }
    case drawerTypes.HIDE:
    case listTypes.LOAD_START:
    case messageTypes.LOAD_START:
    case authTypes.LOAD_START:
      return {
        ...state,
        isVisible: false,
      }
    default:
      return state
  }
}
